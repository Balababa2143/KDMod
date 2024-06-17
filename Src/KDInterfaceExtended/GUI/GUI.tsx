
import React, { PropsWithChildren } from 'react'
import { createRoot } from 'react-dom/client'
import { NameOf } from '../../Common/Helpers'

export const GUIRootClass: string = NameOf(() => GUIRootClass)
export const InteractiveElementClass = 'KDInterfaceInteractiveElement' as const
export const StaticElementClass = 'KDInterfaceStaticElement' as const
export const PreventSelectClass = 'KDInterfacePreventSelect' as const
export const GUICanvasId: string = NameOf(() => GUICanvasId)
export const HideOverflowTextClass: string = NameOf(() => HideOverflowTextClass)

export function GUI({ children }: PropsWithChildren) {
    return (
        <div
            className={GUIRootClass}
        >
            {children}
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
        .${InteractiveElementClass}{
            pointer-events: auto;
            z-index: 50;
        }
        .${StaticElementClass}{
            pointer-events: none;
        }
        .${PreventSelectClass}{
            user-select: none;
        }
        .${HideOverflowTextClass}{
            white-space: nowrap;
            overflow: hidden;
            text-overflow: "";
        }
    ` as const
    const style = document.createElement('style')
    document.head.appendChild(style)
    style.appendChild(document.createTextNode(css))
    return createRoot(ModUIRootElm)
}