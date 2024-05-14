import * as IM from "immutable";
import { DEFAULT, Helpers } from "../Common";

export type EventHandler =
    (e: KinkyDungeonEvent, item: item, data: any) => void

export type EventMap =
    Record<string, Record<string, EventHandler>>

interface HandlerDefinitionProp {
    EventMap: EventMap,
    Trigger: string,
    Type: string,
    Handler: EventHandler
}
export class HandlerDefinition extends IM.Record<HandlerDefinitionProp>({
    EventMap: {},
    Trigger: '',
    Type: DEFAULT,
    Handler: (e, item, data) => { }
}) {
    constructor(prop: HandlerDefinitionProp) {
        super(prop)
    }
    
    static Create<EM extends EventMap>(
        eventMap: EM,
        trigger: string,
        type: string,
        handler: EventHandler
    ) {
        Helpers.ThrowIfNull(handler)
        Helpers.ThrowIfNull(eventMap)
        const eventSet = eventMap[trigger]
        Helpers.ThrowIfNull(eventSet)
        if (type in eventSet) {
            Helpers.Throw('Duplicate event handler name')
        }
        return new HandlerDefinition({
            EventMap: eventMap,
            Trigger: trigger,
            Type: type,
            Handler: handler
        })
    }

    static Create_<EM extends EventMap>(args: {
        eventMap: EM,
        trigger: string
        type: string,
        handler: EventHandler
    }){
        return this.Create(
            args.eventMap,
            args.trigger,
            args.type,
            args.handler
        )
    }
    
    static Register(def: HandlerDefinition){
        def.EventMap[def.Trigger][def.Type] = def.Handler
    }
}

