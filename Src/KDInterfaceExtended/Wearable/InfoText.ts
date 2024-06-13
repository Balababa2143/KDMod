import { Record, RecordOf } from "immutable"

export interface InfoTextData {
    DisplayName: string
    FlavorText: string
    FunctionText: string
}

export type Type = RecordOf<InfoTextData>

export const DefaultValue: InfoTextData = {
    DisplayName: 'DisplayName',
    FlavorText: 'FlavorText',
    FunctionText: 'FunctionText'
}

export const Create = Record(DefaultValue)