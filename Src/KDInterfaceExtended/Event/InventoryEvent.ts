import { KD } from "../../Common"
import { EventHandlerDefinition, EventHandlerDefinitionData, MakeEventHandlerDefinitionFactory, ThrowIfDataNull } from "./Common"

export type InventoryEventHandler =
    (descriptor: KinkyDungeonEvent, source: item, data: unknown) => void

export type InventoryEventHandlerDefinition =
    EventHandlerDefinition<InventoryEventHandler>

const MyEventMap = KD.Variables.EventMapInventory

const _DefaultData: EventHandlerDefinitionData<InventoryEventHandler> = {
    EventMap: MyEventMap,
    EventName: undefined!,
    HandlerId: undefined!,
    Handler: undefined!
}

type IEHDProperties =
    Omit<typeof _DefaultData, 'EventMap'>

const Factory = MakeEventHandlerDefinitionFactory(_DefaultData)

export function InventoryEventHandlerDefinition(props: IEHDProperties): InventoryEventHandlerDefinition{
    ThrowIfDataNull(props)
    return Factory(props)
}