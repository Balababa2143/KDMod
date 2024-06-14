import { EquipmentCategory } from "../../Constants"
import Category = EquipmentCategory.Sensory
import GetFullNameOf = Category.GetFullNameOf
import { EventHandlerDesc, InventoryEventHandlerDesc } from "../../../../KDInterfaceExtended"
import { DroneEquipmentData } from "../../Wearable"
import { Helpers, KD } from "../../../../Common"
import { DroneLock } from "../../Lock/DroneLock"

export namespace ProtocolActivation {
    export const EventName = GetFullNameOf(() => ProtocolActivation)

    export interface EventData {
        EquipmentCategory: string
    }

    export namespace Handlers {
        export const EngageLock: InventoryEventHandlerDesc = InventoryEventHandlerDesc({
            EventName: ProtocolActivation.EventName,
            HandlerId: GetFullNameOf(() => EngageLock),
            Handler: (e, item, data) => {
                const eventDesc = data as ProtocolActivation.EventData
                if (item.curse == null || item.curse !== DroneLock.Name) {
                    const definition = KDRestraint(item)
                    if((definition.shrine ?? []).includes(eventDesc.EquipmentCategory)){
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
}



//#region Register
Helpers.RegisterModule(
    `${Category.SubNamespace}.${ProtocolActivation.EventName}Registered`,
    () => {
        Object.values(ProtocolActivation.Handlers).forEach(EventHandlerDesc.Register)
    }
)
//#endregion