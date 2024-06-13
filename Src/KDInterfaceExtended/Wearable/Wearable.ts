import { WearableInitializerBase, WearableOf, DefaultData as BaseDefaultData, CreateFactory } from "./WearableBase"
import { WearableWithTextInitializer, WearableWithTextOf, } from "./WearableWithText"
import * as WearableWithText from './WearableWithText'

export type WearableData =
    restraint

export type WearableInitializer =
    Omit<restraint, keyof WearableInitializerBase> &
    WearableInitializerBase

export type Type = WearableOf<WearableData>

export type WearableWithTextData =
    WearableWithTextOf<WearableData>

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

const Factory = CreateFactory<WearableInitializer, WearableData>(DefaultData as WearableInitializer)

export function Create(props: WearableInitializer){
    return Factory(props)
}

const FactoryWithText = WearableWithText.CreateFactory<WearableInitializer, WearableData>(Create)

export function CreateWithText(props: WearableWithTextInitializer<WearableInitializer>){
    return FactoryWithText(props)
}