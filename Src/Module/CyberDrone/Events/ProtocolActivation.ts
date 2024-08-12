import { EquipmentCategory } from "../Constants"
import Category = EquipmentCategory.Sensory
import { EventHandlerDesc, InventoryEventHandlerDesc } from "../../../KDInterfaceExtended"
import { Helpers, KD } from "../../../Common"
import { DroneLock } from "../Lock/DroneLock"

const ProtocolActivation = null

export const EventName = Category.SubGetFullName(() => ProtocolActivation)

export interface EventData {
    EquipmentCategory: string
}

export namespace Handlers {
    export const EngageLock: InventoryEventHandlerDesc = InventoryEventHandlerDesc({
        EventName: EventName,
        HandlerId: Category.SubGetFullName(() => EngageLock),
        Handler: (e, item, data) => {
            const eventDesc = data as EventData
            if (item.curse == null || item.curse !== DroneLock.Name) {
                const definition = KDRestraint(item)
                if((definition.addTag ?? []).includes(eventDesc.EquipmentCategory)){
                    KD.MorphToInventoryVariant_({
                        item,
                        variant: {
                            template: item.name,
                            events: [],
                        },
                        prefix: '',
                        curse: DroneLock.Name
                    })
                }
            }
        }
    })
}

//#region Register
Helpers.RegisterModule(
    `${Category.FullName}.${EventName}Registered`,
    () => {
        Object.values(Handlers).forEach(EventHandlerDesc.Register)
    }
)
//#endregion