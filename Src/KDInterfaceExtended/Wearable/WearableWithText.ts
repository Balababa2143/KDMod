import * as IM from "immutable"
import * as InfoText from "./InfoText"
import { WearableBaseData, WearableOf } from "./WearableBase"

export type WearableWithTextDataOf<TData extends WearableBaseData> = {
    Data: WearableOf<TData>,
    InfoText: InfoText.Type
}

export type WearableWithTextOf<TData extends WearableBaseData> =
    IM.RecordOf<WearableWithTextDataOf<TData>>

export type WearableWithTextInitializer<TData extends WearableBaseData> = {
    Data: Readonly<TData>,
    InfoText?: Partial<InfoText.InfoTextData>
}

export function CreateFactory<TData extends WearableBaseData>(dataFactory: (props: Readonly<TData>) => IM.RecordOf<TData>) {
    const Factory = IM.Record<WearableWithTextDataOf<TData>>({
        Data: undefined!,
        InfoText: InfoText.Create({
            DisplayName: undefined!,
            FlavorText: undefined!,
            FunctionText: undefined!
        })
    })
    return (prop: WearableWithTextInitializer<TData>) => {
        const infoText = InfoText.Create(
            prop.InfoText ?? {
                DisplayName: prop.Data.name
            }
        )
        const convertedProp = {
            Data: dataFactory(prop.Data),
            InfoText: infoText
        }
        return Factory(convertedProp)
    }
}