import * as IM from "immutable"
import { KD, RecordEx, TypeUtil } from "../../Common"
import { WearableEntry } from "./WearableEntry"

export type Wearable<Property extends WearableBaseData = WearableData> =
    IM.RecordOf<Property>

//#region WearableBase
export type WearableBaseData = {
    name: string,
    Group: string,
    Asset?: string
}

export type WearableBase = Wearable<WearableBaseData>

const _WearableBaseDefaultData: WearableBaseData = {
    name: undefined!,
    Group: undefined!,
    Asset: undefined!
}

const _WearableBaseFactory = IM.Record(_WearableBaseDefaultData)

export function WearableBase(props: Parameters<typeof _WearableBaseFactory>[0]) {
    return _WearableBaseFactory(props)
}

export namespace WearableBase {
    export const DefaultData = _WearableBaseDefaultData
}
//#endregion

export type WearableInitializerBase =
    WearableBaseData

type CustomFactory<Initialzier extends WearableInitializerBase, TData extends WearableBaseData> =
    (props: Readonly<Initialzier>) => Wearable<TData>

function _CreateFactory<
    Initialzier extends WearableInitializerBase,
    TData extends WearableBaseData
>(defaultValue: TData): CustomFactory<Initialzier, TData> {
    const Factory = IM.Record<TData>(defaultValue)
    return (props: Readonly<Initialzier>) =>
        Factory(props as Partial<TData>)
}

export type WearableData = restraint

export type WearableInitializer =
    Omit<
        WearableData,
        'floors' | 'allFloors' |
        'shrine' | 'noShrine' |
        'playerTags' | 'playerTagsMissing' |
        'playerTagsMult' | 'playerTagsMissingMult'
    > &
    TypeUtil.RequireExactlyOne<WearableData, 'floors' | 'allFloors'> &
    TypeUtil.RequireExactlyOne<WearableData, 'shrine' | 'noShrine'> &
    TypeUtil.NotBoth<WearableData, 'playerTags' | 'playerTagsMissing'> &
    TypeUtil.NotBoth<WearableData, 'playerTagsMult' | 'playerTagsMissingMult'>

const _DefaultData: WearableData = {
    name: undefined!,
    Group: undefined!,
    Filters: undefined,
    factionFilters: undefined,
    noShrine: undefined,
    good: undefined,
    inventory: undefined,
    power: undefined!,
    weight: undefined!,
    minLevel: undefined!,
    allFloors: undefined,
    cloneTag: undefined,
    escapeChance: undefined,
    events: undefined,
    enemyTags: {},
    enemyTagsMult: undefined,
    playerTags: {},
    playerTagsMult: {},
    playerTagsMissing: {},
    playerTagsMissingMult: {},
    shrine: [],
    debris: undefined,
    debrisChance: undefined,
    noRecover: undefined,
    limited: undefined,
    unlimited: undefined,
    struggleBreak: undefined,
    Security: undefined,
    affinity: undefined,
    alwaysEscapable: undefined,
    protection: undefined,
    protectionCursed: undefined,
    arousalMode: undefined,
    accessible: undefined,
    inaccessible: undefined,
    deepAccessible: undefined,
    alwaysAccessible: undefined,
    alwaysInaccessible: undefined,
    renderWhenLinked: undefined,
    requireSingleTagToEquip: undefined,
    requireAllTagsToEquip: undefined,
    alwaysRender: undefined,
    changeRenderType: undefined,
    linkCategory: undefined,
    linkSize: undefined,
    noDupe: undefined,
    ignoreNear: undefined,
    ignoreSpells: undefined,
    alwaysStruggleable: undefined,
    Model: undefined,
    Asset: undefined,
    value: undefined,
    AssetGroup: undefined,
    hideTags: undefined,
    Color: undefined!,
    maxLevel: undefined,
    floors: undefined,
    helpChance: undefined,
    limitChance: undefined,
    struggleMinSpeed: undefined,
    struggleMaxSpeed: undefined,
    struggleMult: undefined,
    sfxEscape: undefined,
    sfxFinishEscape: undefined,
    sfxRemove: undefined,
    sfx: undefined,
    sfxGroup: undefined,
    linkedVibeTags: undefined,
    vibeLocation: undefined,
    showInQuickInv: undefined,
    chastity: undefined,
    chastitybra: undefined,
    piercing: undefined,
    crotchrope: undefined,
    plugSize: undefined,
    bindarms: undefined,
    restricthands: undefined,
    bindhands: undefined,
    harness: undefined,
    hobble: undefined,
    heelpower: undefined,
    blockfeet: undefined,
    restriction: undefined,
    gag: undefined,
    blindfold: undefined,
    maxwill: undefined,
    Type: undefined,
    removePrison: undefined,
    forceRemovePrison: undefined,
    failSuffix: undefined,
    specStruggleTypes: undefined,
    remove: undefined,
    removeShrine: undefined,
    slimeLevel: undefined,
    addTag: undefined,
    addPose: undefined,
    addPoseIfTopLevel: undefined,
    forbidPose: undefined,
    removePose: undefined,
    OverridePriority: undefined,
    Modules: undefined,
    inventoryAs: undefined,
    inventoryAsSelf: undefined,
    alwaysKeep: undefined,
    noJailRemove: undefined,
    strictness: undefined,
    strictnessZones: undefined,
    LinkableBy: undefined,
    DefaultLock: undefined,
    HideDefaultLock: undefined,
    Link: undefined,
    UnLink: undefined,
    removeOnLeash: undefined,
    enclose: undefined,
    ignoreIfNotLeash: undefined,
    tether: undefined,
    leash: undefined,
    allowRemote: undefined,
    escapeMult: undefined,
    forceOutfit: undefined,
    forceOutfitPriority: undefined,
    alwaysDress: undefined,
    alwaysDressModel: undefined,
    bypass: undefined,
    magic: undefined,
    nonbinding: undefined,
    freeze: undefined,
    immobile: undefined,
    trappable: undefined,
    curse: undefined,
    difficultyBonus: undefined,
    divine: undefined,
    potionCollar: undefined,
    allowPotions: undefined,
    slimeWalk: undefined,
    enchantedDrain: undefined,
    enchanted: undefined,
    special: undefined,
    factionColor: undefined,
    armor: undefined,
    LinkAll: undefined,
    AlwaysLinkable: undefined,
    UnderlinkedAlwaysRender: undefined,
    NoLinkOver: undefined,
    displayPower: undefined,
}

const _WearableFactory = _CreateFactory<WearableInitializer, WearableData>(_DefaultData)

export function Wearable(props: Parameters<typeof _WearableFactory>[0]) {
    return _WearableFactory(props)
}

export namespace Wearable {
    export const DefaultData = _DefaultData

    export function CreateFactory<
        Initialzier extends WearableInitializerBase,
        TData extends WearableBaseData
    >(defaultValue: TData) {
        return _CreateFactory<Initialzier, TData>(defaultValue)
    }

}

