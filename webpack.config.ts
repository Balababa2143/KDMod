import * as fs from 'fs'
import * as path from 'path'
import * as archiver from 'archiver'
import webpack from 'webpack'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'


const DefaultEntryDir = 'src'
const DefaultEntryFile = 'index.tsx'
const DefaultBundleDir = 'Build'
const DefaultArchiveDir = 'Deploy'
const DefaultArchiveFile = 'DroneMod.zip'
const AssetFolders = [
    'Asset'
]

interface BundleOptions {
    entryDir: string,
    entryFile: string,
    bundleDir: string,
    archiveDir: string,
    archiveFile: string
    productionMode: boolean
}

function ProcessArgs() {
    const cliArgs = process.argv.slice(2)
    const entryFile = cliArgs.find(a => a.startsWith("-e="))?.slice(3) // entry-file override
    const productionMode = cliArgs.includes('-p'); // production flag
    const bundleDir = cliArgs.find(a => a.startsWith('-b='))?.slice(3) // output-dir override
    const archiveDir = cliArgs.find(a => a.startsWith('-o='))?.slice(3) // output-dir override

    const ret: BundleOptions = {
        productionMode,
        entryDir: DefaultEntryDir,
        entryFile: entryFile ?? DefaultEntryFile,
        bundleDir: bundleDir ?? DefaultBundleDir,
        archiveDir: archiveDir ?? DefaultArchiveDir,
        archiveFile: DefaultArchiveFile
    }
    return ret
}


async function CopyAssets(options: BundleOptions) {
    await Promise.all(
        AssetFolders.map(
            assetFolder =>
                fs.promises.cp(assetFolder, options.bundleDir, { recursive: true })
        )
    )
}

function SetArchiverEventHandlers(writeStream: fs.WriteStream, archiver: archiver.Archiver) {
    writeStream.on('close', function () {
        console.log(archiver.pointer() + ' total bytes');
        console.log('archiver has been finalized and the output file descriptor has closed.');
    })
    writeStream.on('end', function () {
        console.log('Data has been drained');
    })
    archiver.on('warning', function (err) {
        if (err.code === 'ENOENT') {
            // log warning
        } else {
            // throw error
            throw err;
        }
    })
    archiver.on('error', function (err) {
        throw err;
    })
}

/**
 * execute build
 * @param {BundleOptions} options 
 */
async function BuildArchive(options) {
    const archiveDir = options.archiveDir
    if (!fs.existsSync(archiveDir)) {
        fs.mkdirSync(archiveDir)
    }
    const archiveFilePath = `${archiveDir}/${options.archiveFile}`
    if (fs.existsSync(archiveFilePath)) {
        fs.unlinkSync(archiveFilePath)
    }
    const stream = fs.createWriteStream(archiveFilePath)
    const zipArchiver = archiver('zip', {
        zlib: {
            level: 9
        }
    })
    SetArchiverEventHandlers(stream, zipArchiver)
    // pipe archive data to the file
    zipArchiver.pipe(stream)
    await zipArchiver
        .directory(options.bundleDir, false)
        .finalize()
    await new Promise(resolve => stream.on("close", resolve))
}

function PostBuild(opts: BundleOptions): webpack.WebpackPluginInstance {
    return {
        apply: (compiler) => {
            compiler.hooks.afterEmit.tapAsync('PostEmitArchiveBuilding', async () => {
                await CopyAssets(opts)
                await BuildArchive(opts)
            })
        }
    }
}

function Configurate(): webpack.Configuration {
    const opts = ProcessArgs()
    const {
        productionMode,
        entryDir,
        entryFile,
        bundleDir
    } = opts

    return {
        entry: [
            `./${entryDir}/${entryFile}`
        ],
        output: {
            path: path.resolve(bundleDir),
            filename() {
                return productionMode ? 'index.ks' : 'index.js'
            },
            clean: true
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: {
                        "loader": "ts-loader",
                        "options": {
                            "projectReferences": true,
                            ignoreDiagnostics: [2742]
                        }
                    },
                }
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        mode: 'production',
        devtool: productionMode ? false : 'inline-source-map',
        plugins: [
            PostBuild(opts),
            new HtmlWebpackPlugin({
                title: 'Output Management',
            }),
        ]
    }
}

const config = Configurate()

export default config