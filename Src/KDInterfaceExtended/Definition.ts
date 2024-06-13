import * as IM from "immutable"
import { InfoText } from "./"
import { Restraint } from "./"

export type DefinitionData = {
    Data: Restraint,
    InfoText: InfoText
}

export type DefinitionCtorParams =
    Omit<DefinitionData, 'InfoText'> & Partial<Pick<DefinitionData, 'InfoText'>>

const _DefaultData: DefinitionData = {
    Data: Restraint.Default,
    InfoText: InfoText.Default
}

const _Definition = IM.Record(_DefaultData)

export function Definition(prop?: DefinitionCtorParams){
    if(prop != null && !prop.InfoText){
        prop.InfoText = new InfoText({
            DisplayName: prop?.Data.name
        })
    }
    return _Definition(prop)
}

export namespace Definition {
    export const Default = Definition()
    export const DefaultData = _DefaultData
}

export type Definition = ReturnType<typeof Definition>