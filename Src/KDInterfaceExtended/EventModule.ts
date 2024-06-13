import { Record, RecordOf } from "immutable"

export interface EventModuleData {
    level: number,
    weight: (item: string, allHex: string[], data: KDHexEnchantWeightData) => number,
    events: (data: KDHexEnchantEventsData) => KinkyDungeonEvent[]
}

export interface EventModuleEntryData {
    Name: string,
    Module: EventModuleData
}

export type EventModuleEntry = RecordOf<EventModuleEntryData>

export type EventModuleEntryInitializer ={
    Name: string,
    Module: Partial<Omit<EventModuleData , 'events'>> & {events: (data: KDHexEnchantEventsData) => KinkyDungeonEvent[]}
}

export const DefaultData: EventModuleEntryData = {
    Name: undefined!,
    Module: {
        level: 0,
        weight: (_1, _2, _3) => 0,
        events: (_) => []
    }
}

const Factory = Record(DefaultData)

export namespace EventModuleEntry {
    export function Create(props: EventModuleEntryInitializer){
        return Factory(props as EventModuleEntryData)
    }
}