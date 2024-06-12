import * as Recat from 'react'
import { InteractiveElementClass } from './GUI'

export function KDButton(props: React.JSX.IntrinsicElements['div'] & {})
{
    return (
        <div
            {...props}
            className={InteractiveElementClass}
            style={{
                border: 'solid',
                borderWidth: 'thin',
                borderColor: KDBorderColor,
                display: 'block',
            }}
        >
            {props.children}
        </div>
    )
}