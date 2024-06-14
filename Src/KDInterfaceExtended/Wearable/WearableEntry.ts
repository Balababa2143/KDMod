import * as IM from "immutable"
import { InfoText, InfoTextData } from "./InfoText"
import { WearableBaseData, WearableInitializerBase, Wearable, WearableInitializer } from "./Wearable"
import { KD, KDVar, RecordEx } from "../../Common"

export type WearableEntryData<TData extends WearableBaseData = restraint> = {
    Data: Wearable<TData>,
    InfoText: InfoText
}

export type WearableEntry<TData extends WearableBaseData = restraint> =
    IM.RecordOf<WearableEntryData<TData>>

export type WearableEntryInitializer<DataInitialzier extends WearableInitializerBase> = {
    Data: Readonly<DataInitialzier>,
    InfoText?: Partial<InfoTextData>
}

function _CreateFactory<Initialzier extends WearableInitializerBase, TData extends WearableBaseData>(dataFactory: (props: Readonly<Initialzier>) => IM.RecordOf<TData>) {
    const Factory = IM.Record<WearableEntryData<TData>>({
        Data: undefined!,
        InfoText: InfoText({
            DisplayName: undefined!,
            FlavorText: undefined!,
            FunctionText: undefined!
        })
    })
    return (prop: WearableEntryInitializer<Initialzier>): WearableEntry<TData> => {
        const infoText = InfoText(
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

const _Factory = _CreateFactory<WearableInitializer, restraint>(Wearable.CreateFactory(Wearable.DefaultData))

export function WearableEntry(props: Parameters<typeof _Factory>[0]): WearableEntry
{
    return _Factory(props)
}

export namespace WearableEntry {
    export function CreateFactory<Initialzier extends WearableInitializerBase, TData extends WearableBaseData>(dataFactory: (props: Readonly<Initialzier>) => IM.RecordOf<TData>) {
        return _CreateFactory(dataFactory)
    }

    export function CheckNoDuplicate<TData extends WearableBaseData>(def: WearableEntry<TData>) {
        return KD.GetRestraintByName(def.Data.get('name')) == null
    }
    
    export function PushToRestraints<TData extends WearableBaseData>(def: WearableEntry<TData>) {
        KDVar.Restraints.push(RecordEx.CreateProxy<restraint>(def.Data as any))
        KD.AddRestraintText(
            def.Data.name,
            def.InfoText.DisplayName,
            def.InfoText.FlavorText,
            def.InfoText.FunctionText
        )
    }
}