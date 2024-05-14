import { Record } from "immutable"
import { DEFAULT } from "../Common"

export class CurseData extends Record<KDCursedDef>({
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
}){
    constructor(prop?: KDCursedDef){
        super(prop)
    }
    static #Default = new CurseData()
    static get Default() { return this.#Default }
    declare toJS: () => KDCursedDef
}

interface CurseProp {
    Name: string,
    Data: CurseData
}

export class Curse extends Record<CurseProp>({
    Name: DEFAULT,
    Data: CurseData.Default
}) {
    constructor(prop?: CurseProp){
        super(prop)
    }
    static #Default = new Curse()
    static get Default() { return this.#Default }
}