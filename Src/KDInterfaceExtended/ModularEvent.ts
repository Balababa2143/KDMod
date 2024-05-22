import { Record } from "immutable";
import { DEFAULT, Helpers } from "../Common";
import { RecordProxy } from "../Common/Helpers";

interface ModularEventDataProp {
    level: number,
    weight: (item: string, allHex: string[], data: KDHexEnchantWeightData) => number,
    events: (data: KDHexEnchantEventsData) => KinkyDungeonEvent[]
}

export class ModularEventData extends Record<ModularEventDataProp>({
    level: 0,
    weight: (_1, _2, _3) => 0,
    events: (_) => []
}){
    constructor(prop?: Partial<Omit<ModularEventDataProp, 'events'>> & {events: (data: KDHexEnchantEventsData) => KinkyDungeonEvent[]}){
        super(prop)
    }
    static #Default = new ModularEventData()
    static get Default() { return this.#Default }
    declare toJS: () => ModularEventDataProp
}

interface ModularEventProp {
    Name: string,
    Data: ModularEventData
}

export class ModularEvent extends Record<ModularEventProp>({
    Name: DEFAULT,
    Data: ModularEventData.Default
}){
    constructor(prop: ModularEventProp){
        if(prop.Name in KDEventHexModular){
            Helpers.Throw('ModularEvent already exists')
        }
        else{
            super(prop)
        }
    }
    static Register(e: ModularEvent){
        KDEventHexModular[e.Name] = RecordProxy(e.Data)
    }
}