import * as React from 'react'
import { Container, useApp } from '@pixi/react'
import { PixiTunnel } from './Pixi'
import { Helpers, RootNamespace } from '../../Common'
import { NameOf } from '../../Common/Helpers'
import { GUICanvasId } from './GUI'

const PixiContainerClass: string = NameOf(() => PixiContainerClass)

Helpers.RegisterModule(
    `${RootNamespace}.KDInterfaceExtended.PixiContainerElmRegistered`,
    () =>{
        const css = `
            .${PixiContainerClass}{
                height: 100%;
                aspect-ratio: 1 / 1;
            }
        ` as const
        const style = document.createElement('style')
        document.head.appendChild(style)
        style.appendChild(document.createTextNode(css))
    }
)

export function PixiContainerElm(props: React.JSX.IntrinsicElements['div'] & Parameters<typeof Container>[0]) {
    const parentRef = React.useRef<HTMLDivElement>(null)
    const [rect, setRect] = React.useState({x: 0, y: 0, width: 0, height: 0})
    React.useEffect(() =>{
        const root = document.getElementById(GUICanvasId)! as HTMLCanvasElement
        const {x:rootX, y: rootY} = root.getBoundingClientRect()
        const cRect = parentRef.current!.getBoundingClientRect()
        const newRect = {
            x: cRect.x - rootX,
            y: cRect.y - rootY,
            width: cRect.width,
            height: cRect.height
        }
        setRect(newRect)
    })
    return (
        <div
            {...props}
            ref={parentRef}
            className={PixiContainerClass}
        >
            <PixiTunnel.In>
                <Container x={rect.x} y={rect.y} width={rect.width} height={rect.height}
                    // anchor={[0.5, 0.5]}
                >
                    {props.children}
                </Container>
            </PixiTunnel.In>
        </div>
    )
}