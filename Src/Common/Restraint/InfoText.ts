import { Record, RecordOf } from "immutable"
import { DEFAULT } from ".."

type InfoTextProp = {
    DisplayName: string
    FlavorText: string
    FunctionText: string
}

type InfoText = RecordOf<InfoTextProp>

namespace InfoText {
    export const Create = Record<InfoTextProp>({
        DisplayName: 'DisplayName',
        FlavorText: 'FlavorText',
        FunctionText: 'FunctionText'
    })

    export const Default = Create()
}

export default InfoText