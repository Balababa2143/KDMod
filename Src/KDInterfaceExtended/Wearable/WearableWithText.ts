import * as IM from "immutable"
import { InfoText } from "./InfoText"
import { WearableBaseData } from "./WearableBase"

export type WearableWithTextDataOf<TData extends WearableBaseData> = {
    Data: IM.RecordOf<TData>,
    InfoText: InfoText
}

export type WearableWithTextOf<TData extends WearableBaseData> =
    IM.RecordOf<WearableWithTextDataOf<TData>>

export type WearableWithTextInitializer<TData extends WearableBaseData> = {
    Data: Readonly<TData>,
    InfoText?: Partial<InfoText>
}

export function CreateFactory<TData extends WearableBaseData>(dataFactory: (props: Readonly<TData>) => IM.RecordOf<TData>) {
    const Factory = IM.Record<WearableWithTextDataOf<TData>>({
        Data: undefined!,
        InfoText: new InfoText({
            DisplayName: undefined!,
            FlavorText: undefined!,
            FunctionText: undefined!
        })
    })
    return (prop: WearableWithTextInitializer<TData>) => {
        const infoText = new InfoText(
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