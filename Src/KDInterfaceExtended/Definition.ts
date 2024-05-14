import * as IM from "immutable"
import { InfoText } from "./"
import { Restraint } from "./"

interface DefinitionProp {
    Data: Restraint,
    InfoText: InfoText
}

export class Definition extends IM.Record<DefinitionProp>({
    Data: Restraint.Default,
    InfoText: InfoText.Default
})
{
    constructor(prop?: Omit<DefinitionProp, 'InfoText'> & {InfoText?: InfoText}){
        if(prop != null && !prop.InfoText){
            prop.InfoText = new InfoText({
                DisplayName: prop?.Data.name
            })
        }
        super(prop)
    }
    static #Default = new Definition()
    static get Default() { return this.#Default }
}