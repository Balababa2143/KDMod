import { Record, RecordOf } from "immutable"
import { DEFAULT, RecordEx } from "../Common"

const _DefaultCurseData: KDCursedDef = {
    noShrine: undefined,
    lock: undefined,
    powerMult: undefined,
    powerBoost: undefined,
    activatecurse: undefined,
    customIcon_RemoveFailure: undefined,
    customIcon_RemoveSuccess: undefined,
    customIcon_hud: undefined,
    shrineRemove: undefined,
    level: 0,
    weight: (item, allHex?) => 0,
    customStruggle: undefined,
    customInfo: undefined,
    onApply: undefined,
    condition: (item: item) => false,
    remove: (item: item, host: item) => { },
    events: undefined,
}

const _CurseFactory = Record(_DefaultCurseData)

export function Curse(arg: Parameters<typeof _CurseFactory>[0]) {
    return _CurseFactory(arg)
}

export type Curse = RecordOf<KDCursedDef>

export namespace Curse {
    export const DefaultData = _DefaultCurseData
}

export interface CurseEntryData {
    Name: string,
    Curse: Curse
}

export type CurseEntry = RecordOf<CurseEntryData>

const _DefaultEntryData: CurseEntryData = {
    Name: undefined!,
    Curse: Curse(_DefaultCurseData)
}

const _CurseEntryFactory = Record(_DefaultEntryData)

export function CurseEntry(arg: Parameters<typeof _CurseEntryFactory>[0]) {
    return _CurseEntryFactory(arg)
}

export namespace CurseEntry {
    export const DefaultData = _DefaultEntryData
    export function Register(entry: CurseEntry) {
        if (entry.Name in KDCurses) {
            throw new Error('Sensory Register: SensoryControlCurse already exists')
        }
        else {
            KDCurses[entry.Name] = RecordEx.CreateProxy<KDCursedDef>(entry.Curse)
        }
    }
}