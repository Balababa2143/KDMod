import esbuild from 'esbuild'
import { clean } from 'esbuild-plugin-clean'
import * as fs from 'fs'
import archiver from 'archiver'

const DefaultEntryDir = 'src'
const DefaultEntryFile = 'index.ts'
const DefaultBundleDir = 'Build'
const DefaultArchiveDir = 'Deploy'
const DefaultArchiveFile = 'DroneMod.zip'
const AssetFolders = [
    'Asset'
]

/**
 * 
 * @param {string | URL} src 
 * @param {string | URL} dest 
 * @param {fs.CopyOptions} opts
 */
async function CopyAsync(src, dest, opts) {
    return new Promise((resolve, reject) => {
        fs.cp(src, dest, opts, err =>{
            if(null == err){
                resolve()
            }
            else{
                reject(err)
            }
        })
    })
}

function setArchiverEventHandlers(writeStream, archiver) {
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
 * @param {esbuild.BuildOptions} options 
 */
async function runBuild(options) {
    return await esbuild.build(options)
}

/**
 * execute build
 * @param {BundleOptions} options 
 */
async function CopyAssets(options) {
    await Promise.all(
        AssetFolders.map(
            assetFolder =>
                CopyAsync(assetFolder, options.bundleDir, { recursive: true })
        )
    )
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
    setArchiverEventHandlers(stream, zipArchiver)
    // pipe archive data to the file
    zipArchiver.pipe(stream)
    await zipArchiver
        .directory(options.bundleDir, false)
        .finalize()
    await new Promise(resolve => stream.on("close", resolve))
}

/**
 * @typedef {{
*  entryDir: string | URL,
*  entryFile: string | URL,
*  bundleDir: string | URL,
*  archiveDir: string | URL,
*  archiveFile: string | URL
*  productionMode: boolean
* }}
*/
var BundleOptions

/**
 * 
 * @param {BundleOptions} opts 
 */
async function bundle(opts) {
    const {
        productionMode,
        entryDir,
        entryFile,
        bundleDir,
        archiveDir
    } = opts
    /**
     * @type {esbuild.BuildOptions}
     */
    const buildOptions = {
        entryPoints: [
            `${entryDir}/${entryFile}`,
        ],
        bundle: true,
        tsconfig: 'tsconfig.json',
        logLevel: 'info',
        // Only minify in production, leads to faster build time on dev
        minify: productionMode,
        // Only generate sourcemaps in dev
        sourcemap: productionMode ? false : 'inline',
        // Folder to put all generated files
        outdir: bundleDir,
        outExtension: {
            ".js": '.ks'
        },
        plugins: [
            clean({
                patterns: [
                    `${bundleDir}/*`,
                    `${archiveDir}/*`
                ]
            }),
        ],
    }

    await runBuild(buildOptions)
    await CopyAssets(opts)
    await BuildArchive(opts)
}

function processArgs() {
    const cliArgs = process.argv.slice(2)
    const entryFile = cliArgs.find(a => a.startsWith("-e="))?.slice(3) // entry-file override
    const productionMode = cliArgs.includes('-p'); // production flag
    const bundleDir = cliArgs.find(a => a.startsWith('-b='))?.slice(3) // output-dir override
    const archiveDir = cliArgs.find(a => a.startsWith('-o='))?.slice(3) // output-dir override

    /**
     * @type {BundleOptions}
     */
    const ret = {
        productionMode,
        entryDir: DefaultEntryDir,
        entryFile: entryFile ?? DefaultEntryFile,
        bundleDir: bundleDir ?? DefaultBundleDir,
        archiveDir: archiveDir ?? DefaultArchiveDir,
        archiveFile: DefaultArchiveFile
    }
    return ret
}

await bundle(processArgs())