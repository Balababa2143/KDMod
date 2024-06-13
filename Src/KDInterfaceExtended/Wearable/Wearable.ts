import { WearableBaseData, WearableOf, DefaultData as BaseDefaultData, CreateFactory } from "./WearableBase"
import { WearableWithTextInitializer, WearableWithTextOf, } from "./WearableWithText"
import * as WearableWithText from './WearableWithText'

export type WearableData =
    Omit<restraint, keyof WearableBaseData> &
    WearableBaseData

export type Type = WearableOf<WearableData>

export type TypeWithText = WearableWithTextOf<WearableData>

export const DefaultData: restraint ={
    ...BaseDefaultData,
    name: undefined!,
    Group: undefined!,
    power: 0,
    preview: undefined,
    weight: 0,
    minLevel: 0,
    Color: [],
    tightType: undefined,
    escapeChance: undefined,
    enemyTags: {},
    enemyTagsMult: undefined,
    playerTags: {},
    shrine: [],
    ignoreFloorTags: undefined,
    ignoreMinLevelTags: undefined,
    ignoreMaxLevelTags: undefined,
    ApplyVariants: undefined,
}

const Factory = CreateFactory<WearableData>(DefaultData as WearableData)

export function Create(props: WearableData){
    return Factory(props)
}

const FactoryWithText = WearableWithText.CreateFactory<WearableData>(Create)

export function CreateWithText(props: WearableWithTextInitializer<WearableData>){
    return FactoryWithText(props)
}