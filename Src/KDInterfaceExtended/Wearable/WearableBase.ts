import * as IM from "immutable"
import { KD, KDVar, RecordEx, TypeUtil } from "../../Common"
import { WearableWithTextOf } from "./WearableWithText"

export type WearableBaseData =
    KDRestraintProps &
    TypeUtil.RequireExactlyOne<KDRestraintProps, 'floors' | 'allFloors'> &
    TypeUtil.RequireExactlyOne<KDRestraintProps, 'shrine' | 'noShrine'>

export type WearableOf<Property extends WearableBaseData = WearableBaseData> =
    IM.RecordOf<Property>

export const DefaultData: KDRestraintProps = {
    name: undefined!,
    Group: undefined!,
    Filters: undefined,
    factionFilters: undefined,
    noShrine: undefined,
    good: undefined,
    inventory: undefined,
    power: undefined,
    weight: undefined,
    minLevel: undefined,
    allFloors: undefined,
    cloneTag: undefined,
    escapeChance: undefined,
    events: undefined,
    enemyTags: undefined,
    enemyTagsMult: undefined,
    playerTags: undefined,
    playerTagsMult: undefined,
    playerTagsMissing: undefined,
    playerTagsMissingMult: undefined,
    shrine: undefined,
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
    Color: undefined,
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

export function CreateFactory<TProps extends WearableBaseData = WearableBaseData>(defaultValue: Partial<TProps> = DefaultData as TProps){
    const Factory = IM.Record<TProps>({
        ...DefaultData,
        ...(defaultValue ?? {})
    } as TProps)
    return (props: Readonly<TProps>) =>
        Factory(props)
}

export type Type = WearableOf<WearableBaseData>

export const Create = CreateFactory()

export function CheckNoDuplicate<TData extends WearableBaseData>(def: WearableWithTextOf<TData>){
    return KD.GetRestraintByName(def.Data.get('name')) == null
}

export function PushToRestraints<TData extends WearableBaseData>(def: WearableWithTextOf<TData>){
    KDVar.Restraints.push(RecordEx.CreateProxy(def.Data) as Readonly<restraint>)
    KD.AddRestraintText(
        def.Data.name,
        def.InfoText.DisplayName,
        def.InfoText.FlavorText,
        def.InfoText.FunctionText
    )
}