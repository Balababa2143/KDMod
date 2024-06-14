import { Record, RecordOf } from "immutable"

export interface InfoTextData {
    DisplayName: string
    FlavorText: string
    FunctionText: string
}

export type InfoText = RecordOf<InfoTextData>

const _DefaultData: InfoTextData = {
    DisplayName: 'DisplayName',
    FlavorText: 'FlavorText',
    FunctionText: 'FunctionText'
}

const _Factory = Record(_DefaultData)

export function InfoText(props: Parameters<typeof _Factory>[0]){
    return _Factory(props)
}

export namespace InfoText {
    export const DefaultData = _DefaultData
}