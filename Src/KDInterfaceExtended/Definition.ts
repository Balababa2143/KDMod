import * as IM from "immutable"
import { InfoText } from "./"
import { Restraint } from "./"

export type DefinitionData = {
    Data: Restraint,
    InfoText: InfoText
}

export type DefinitionCtorParams =
    Omit<DefinitionData, 'InfoText'> & Partial<Pick<DefinitionData, 'InfoText'>>

export class Definition extends IM.Record<DefinitionData>({
    Data: Restraint.Default,
    InfoText: InfoText.Default
})
{
    constructor(prop?: DefinitionCtorParams){
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