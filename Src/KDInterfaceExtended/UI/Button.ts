import * as Pixi from 'pixi.js'

export interface IButtonProperty {
    Width: number
    Height: number
    Label: string
    Image?: string
    HoveringText?: string
    Disabled?: boolean
    NoBorder?: boolean
    FillColor?: string
    FontSize?: number
    ShiftText?: boolean
    Stretch?: boolean
    zIndex?: number
    options?: { noTextBG?: boolean; alpha?: number; zIndex?: number; unique?: boolean; scaleImage?: boolean; centered?: boolean; centerText?: boolean; tint?: string; hotkey?: string; hotkeyPress?: string; };
}

export class Button extends UI.FancyButton {
    constructor(args: IButtonProperty) {
        super({
            defaultView:
                args.NoBorder ?
                    undefined :
                    new Pixi.Graphics()
                        .lineStyle({
                            width: 2,
                            color: KDBorderColor,
                            alpha: 1
                        })
                        .beginFill(KDButtonColor)
                        .drawRect(0, 0, args.Width - 2, args.Height - 2)
                        .endFill(),
            text: new Pixi.Text(args.Label, { fill: 'white', fontSize: 30 })
        })
    }
}