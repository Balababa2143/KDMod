import * as IM from "immutable"
import { Wearable, WearableData, WearableEntry, WearableEntryInitializer, WearableInitializer } from "../../KDInterfaceExtended"


export interface DroneEquipmentData extends WearableData {
    StateMap: IM.Map<string, string>
}

export type DroneEquipment = Wearable<DroneEquipmentData>

export type DroneEquipmentEntry = WearableEntry<DroneEquipmentData>

export type DroneEquipmentInitializer =
{
    StateMap?: IM.Map<string, string>
} & WearableInitializer

const DefaultData: DroneEquipmentData = {
    ...Wearable.DefaultData,
    StateMap: IM.Map()
}

const Factory = Wearable.CreateFactory<DroneEquipmentInitializer, DroneEquipmentData>(DefaultData)

export function DroneEquipment(props: WearableInitializer){
    return Factory(props)
}

const FactoryWithText = WearableEntry.CreateFactory<DroneEquipmentInitializer, DroneEquipmentData>(DroneEquipment)

export function DroneEquipmentEntry(props: WearableEntryInitializer<DroneEquipmentInitializer>){
    return FactoryWithText(props)
}