import { KD } from "../../Common"
import { EventHandlerDesc, EventHandlerDescData } from "./EventHandlerDesc"

export type InventoryEventHandler =
    (descriptor: KinkyDungeonEvent, source: item, data: unknown) => void

export type InventoryEventHandlerDesc =
    EventHandlerDesc<InventoryEventHandler>

const MyEventMap = KDEventMapInventory

const _DefaultData: EventHandlerDescData<InventoryEventHandler> = {
    EventMap: MyEventMap,
    EventName: undefined!,
    HandlerId: undefined!,
    Handler: undefined!
}

type IEHDProperties =
    Omit<typeof _DefaultData, 'EventMap'>

const Factory = EventHandlerDesc.MakeFactory(_DefaultData)

export function InventoryEventHandlerDesc(props: IEHDProperties): InventoryEventHandlerDesc {
    EventHandlerDesc.ThrowIfDataNull(props)
    return Factory(props)
}