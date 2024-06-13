import { KD } from "../../Common";
import * as IM from "immutable";
import { DEFAULT, Helpers } from "../../Common";

// export type EventMap =
//     |typeof KD.Variables.EventMapSpell
//     |typeof KD.Variables.EventMapWeapon
//     |typeof KD.Variables.EventMapInventorySelected
//     |typeof KD.Variables.EventMapInventoryIcon
//     |typeof KD.Variables.EventMapInventory
//     |typeof KD.Variables.EventMapBullet
//     |typeof KD.Variables.EventMapBuff
//     |typeof KD.Variables.EventMapOutfit
//     |typeof KD.Variables.EventMapEnemy
//     |typeof KD.Variables.EventMapGeneric
//     |typeof KD.Variables.EventMapAlt

export type EventMap<EventHandler extends Function> =
    Record<string, Record<string, EventHandler>>

export interface EventHandlerDefinitionData<EventHandler extends Function> {
    EventMap: EventMap<EventHandler>,
    EventName: string,
    HandlerId: string,
    Handler: EventHandler
}

export type EventHandlerDefinition<EventHandler extends Function> =
    IM.RecordOf<EventHandlerDefinitionData<EventHandler>>

export function MakeEventHandlerDefinitionFactory<EventHandler extends Function>(
    defaultValue: EventHandlerDefinitionData<EventHandler>)
{
    Helpers.ThrowIfNull(defaultValue)
    Helpers.ThrowIfNull(defaultValue.EventMap)
    return IM.Record<EventHandlerDefinitionData<EventHandler>>(defaultValue)
}

export function ThrowIfDataNull<EventHandler extends Function>(props: Omit<EventHandlerDefinitionData<EventHandler>, 'EventMap'>){
    Helpers.ThrowIfNull(props)
    Helpers.ThrowIfNullOrEmpty(props.EventName)
    Helpers.ThrowIfNullOrEmpty(props.HandlerId)
    Helpers.ThrowIfNull(props.Handler)
}

function ThrowIfDefNull<EventHandler extends Function>(props: EventHandlerDefinitionData<EventHandler>){
    ThrowIfDataNull(props)
    Helpers.ThrowIfNull(props.EventMap)
}

export function Set<EventHandler extends Function>(def: EventHandlerDefinition<EventHandler>, overwrite = false){
    ThrowIfDefNull(def)
    const {EventMap, EventName, HandlerId, Handler} = def
    EventMap[EventName] ??= {}
    const Event = EventMap[EventName]
    if(HandlerId in Event && !overwrite){
        Helpers.Throw('Event handler with this ID has already been registered', { cause:{
            EventName,
            HandlerId
        }})
    }
    else{
        Event[HandlerId] = Handler
    }
}

export function Register<EventHandler extends Function>(def: EventHandlerDefinition<EventHandler>){
    Set(def, false)
}

export function Update<EventHandler extends Function>(def: EventHandlerDefinition<EventHandler>){
    Set(def, true)
}