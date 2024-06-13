import * as IM from "immutable"
import * as InfoText from "./InfoText"
import { WearableBaseData, WearableInitializerBase, WearableOf } from "./WearableBase"

export type WearableWithTextDataOf<TData extends WearableBaseData> = {
    Data: WearableOf<TData>,
    InfoText: InfoText.Type
}

export type WearableWithTextOf<TData extends WearableBaseData> =
    IM.RecordOf<WearableWithTextDataOf<TData>>

export type WearableWithTextInitializer<DataInitialzier extends WearableInitializerBase> = {
    Data: Readonly<DataInitialzier>,
    InfoText?: Partial<InfoText.InfoTextData>
}

export function CreateFactory<Initialzier extends WearableInitializerBase, TData extends WearableBaseData>(dataFactory: (props: Readonly<Initialzier>) => IM.RecordOf<TData>) {
    const Factory = IM.Record<WearableWithTextDataOf<TData>>({
        Data: undefined!,
        InfoText: InfoText.Create({
            DisplayName: undefined!,
            FlavorText: undefined!,
            FunctionText: undefined!
        })
    })
    return (prop: WearableWithTextInitializer<Initialzier>) => {
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