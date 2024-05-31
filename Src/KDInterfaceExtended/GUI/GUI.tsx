import { Stage } from '@pixi/react'
import React, { PropsWithChildren } from 'react'
import { createRoot } from 'react-dom/client'
import { Pixi } from './Pixi'
import { Html } from './Html'

const GUIRootClass = 'KDInterfaceExtendedGUIRoot' as const

export function GUI({ children }: PropsWithChildren) {
    return (
        <div
            className={GUIRootClass}
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
                <Pixi.Out />
            </Stage>
            {children}
            <Html.Out />
        </div>
    )
}

export function CreateModUIRoot() {
    const gameRoot = document.body
    const ModUIRootElm = document.createElement('div')
    gameRoot.appendChild(ModUIRootElm)
    const css = `
        div.${GUIRootClass} {
            position: absolute;
            pointer-events: none;
            padding: 0;
            margin: auto;
            outline: none;
            display: block;
            top: 50%;
            left: 0;
            transform: translate(0, -50%);
            width: 100%;
            height: auto;
            aspect-ratio: 2/1;
        }
        @media (min-aspect-ratio: 2/1) {
                div.${GUIRootClass} {
                    top: 0;
                    left: 50%;
                    transform: translate(-50%, 0);
                    width: auto;
                    height: 100%;
                    aspect-ratio: 2/1;
            }
        }
    ` as const
    const style = document.createElement('style')
    document.head.appendChild(style)
    style.appendChild(document.createTextNode(css))
    return createRoot(ModUIRootElm)
}