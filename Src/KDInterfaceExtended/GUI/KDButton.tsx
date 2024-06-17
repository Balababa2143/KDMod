import * as React from 'react'
import { HideOverflowTextClass, KDTextBoxStyleClass, PreventSelectClass, StaticElementClass } from './GUI'
import { Helpers, RootNamespace } from '../../Common'
import { NameOf } from '../../Common/Helpers'

const ButtonBorderClass: string = NameOf(() => ButtonBorderClass)
const ButtonHoverBoxClass: string = NameOf(() => ButtonHoverBoxClass)

Helpers.RegisterModule(
    `${RootNamespace}.KDInterfaceExtended.KDButtonRegistered`,
    () => {
        const css = `
            .${ButtonBorderClass}{
                border: solid;
                border-width: thin;
                border-color: ${KDBorderColor};
                display: flex;
                flex-basis: content;
                flex: 1;
            }

        ` as const
        const style = document.createElement('style')
        document.head.appendChild(style)
        style.appendChild(document.createTextNode(css))
    }
)



function KDButtonVisual(props: React.JSX.IntrinsicElements['div'] & {}) {
    const [hovering, setHover] = React.useState(false)
    if (hovering) {
        return (
            <div>

            </div>
        )
    }
    else {

    }
}

export function KDButton(props: React.JSX.IntrinsicElements['div']) {
    const childrenWithClass = React.Children.map(props.children, child => {
        if (React.isValidElement(child)) {
            let className = StaticElementClass
            if(child?.props?.className != null){
                className = child.props.className + ' ' + className
            }
            if(props?.className != null){
                className = props.className + ' ' + className
            }
            return React.cloneElement(child, { className } as JSX.IntrinsicAttributes)
        }
        else {
            return child
        }
    })
    return (
        <div
            {...props}
            className={`${ButtonBorderClass} ${PreventSelectClass} ${HideOverflowTextClass} ${KDTextBoxStyleClass}`}
        >
            {childrenWithClass}
        </div>

    )
}