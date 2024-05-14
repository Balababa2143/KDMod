import { Record } from "immutable"

type InfoTextProp = {
    DisplayName: string
    FlavorText: string
    FunctionText: string
}

export class InfoText extends Record<InfoTextProp>({
    DisplayName: 'DisplayName',
    FlavorText: 'FlavorText',
    FunctionText: 'FunctionText'
})
{
    static #Default = new InfoText()
    static get Default() { return this.#Default }
}