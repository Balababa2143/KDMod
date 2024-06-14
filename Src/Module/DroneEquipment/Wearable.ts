import * as IM from 'immutable'
import { WearableBase, Wearable, WearableWithText } from '../../KDInterfaceExtended'
import WearableInitializer = Wearable.WearableInitializer
import WearableData = Wearable.WearableData
import WearableOf = WearableBase.WearableOf
import WearableWithTextOf = WearableWithText.WearableWithTextOf
import WearableWithTextInitializer = WearableWithText.WearableWithTextInitializer

export interface DroneEquipmentData extends WearableData {
    StateMap: IM.Map<string, string>
}

export type Type = WearableOf<DroneEquipmentData>

export type TypeWithText = WearableWithTextOf<DroneEquipmentData>

export type Initializer =
{
    StateMap?: IM.Map<string, string>
} & WearableInitializer

const DefaultData: DroneEquipmentData = {
    ...Wearable.DefaultData,
    StateMap: IM.Map()
}

const Factory = WearableBase.CreateFactory<Initializer, DroneEquipmentData>(DefaultData)

export function Create(props: WearableInitializer){
    return Factory(props)
}

const FactoryWithText = WearableWithText.CreateFactory<Initializer, DroneEquipmentData>(Create)

export function CreateWithText(props: WearableWithTextInitializer<Initializer>){
    return FactoryWithText(props)
}