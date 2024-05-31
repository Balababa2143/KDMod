import { Stage } from '@pixi/react'
import React, { PropsWithChildren } from 'react'
import { createRoot } from 'react-dom/client'
import { Pixi } from './Pixi'
import { Html } from './Html'

export function GUI({children} : PropsWithChildren) {
    return (
        <div
            className='ModUIDomRoot'
            style={{
                position: 'absolute',
                top: '0',
                left: '50%',
                transform: 'translate(-50%, 0)',
                width: 'auto',
                height: '100%',
                aspectRatio: '2/1',
                pointerEvents: 'none'
            }}
        >
            <Stage
                width={PIXIWidth}
                height={PIXIHeight}
                options={{
                    antialias: false,
                    powerPreference: 'high-performance',
                    resolution: KDResolutionList[Number(localStorage.getItem("KDResolution") ?? 0)],
                    width: PIXIWidth,
                    height: PIXIHeight,
                    resizeTo: PIXIapp.view as HTMLCanvasElement,
                    backgroundAlpha: 0
                }}
                onMount={(app) => {
                    const canvas = app.view as HTMLCanvasElement
                    Object.assign(canvas.style, {
                        position: 'absolute',
                        top: '0',
                        left: '50%',
                        transform: 'translate(-50%, 0)',
                        pointerEvents: 'none'
                    } as CSSStyleDeclaration)
                    app.queueResize()
                }}
            >
                <Pixi.Out/>
            </Stage>
            {children}
            <Html.Out/>
        </div>
    )
}

export function CreateModUIRoot() {
    const gameRoot = document.body
    const ModUIRootElm = document.createElement('div')
    gameRoot.appendChild(ModUIRootElm)
    return createRoot(ModUIRootElm)
}