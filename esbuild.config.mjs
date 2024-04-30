import * as esbuild from 'esbuild'
import { clean } from 'esbuild-plugin-clean'
import * as fs from 'fs'
import archiver from 'archiver'

(async () => {
    //#region Hlper functions
    function deepFreeze(object) {
        // Retrieve the property names defined on object
        const propNames = Reflect.ownKeys(object);
        // Freeze properties before freezing self
        for (const name of propNames) {
            const value = object[name];

            if ((value && typeof value === "object") || typeof value === "function") {
                deepFreeze(value);
            }
        }
        return Object.freeze(object);
    }
    //#endregion

    //#region Constants
    const DEBUG_PATH = 'Debug'

    const DEFAULT_BUILD_CONFIG = deepFreeze({
        entryPoints: ['src/index.ts'],
        bundle: true,
        tsconfig: 'tsconfig.json',
        outdir: 'Build',
        logLevel: 'info',
        plugins: [
            clean({
                patterns: ['./Build/*']
            }),
        ]
    })
    //#endregion

    //#region Command line parameters
    const BuildTarget = process.argv[2]

    const BuildMode = process.argv[3]
    //#endregion

    //#region Build logic
    const OutputDir = (() => {
        switch (BuildTarget) {
            case '--Debug':
                return DEBUG_PATH
                break
            default:
                throw new Error('Build target unknown')
        }
    })()
    const BuildConfig = deepFreeze({
        ...DEFAULT_BUILD_CONFIG,
        outdir: `Build/${OutputDir}`
    })

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

    switch (BuildMode) {
        case '--Watch':
            const context = await esbuild.context(BuildConfig)
            await context.watch()
            break
        case '--Build':
            await esbuild.build(BuildConfig)
            break
        case '--Deploy':
            await esbuild.build(BuildConfig)
            const archiveOutputDir = `Deploy/${OutputDir}`
            if (!fs.existsSync(archiveOutputDir)){
                fs.mkdirSync(archiveOutputDir, { recursive: true });
            }
            const archiveFilePath = `${archiveOutputDir}/KDMod.zip`
            if (fs.existsSync(archiveFilePath)){
                fs.unlinkSync(archiveFilePath)
            }
            const stream = fs.createWriteStream(`${archiveOutputDir}/KDMod.zip`)
            const zipArchiver = archiver('zip', {
                zlib: {
                    level: 9
                }
            })
            setArchiverEventHandlers(stream, zipArchiver)
            // pipe archive data to the file
            zipArchiver.pipe(stream)
            await zipArchiver
                .directory(BuildConfig.outdir, false)
                .finalize()
            await new Promise(resolve => stream.on("close", resolve))
            break
        default:
            throw new Error('Build mode unknown')
    }
})()