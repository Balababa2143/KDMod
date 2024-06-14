import { Helpers, KD } from "../../../../../Common"
import { ProtocolActivation } from "."
import { InventoryEventHandlerDefinition } from "../../../../../KDInterfaceExtended"
import { EquipmentCategory } from "../../../Constants"
import Category = EquipmentCategory.Sensory
import GetFullNameOf = Category.GetFullNameOf
import { DroneLock } from "../../../Lock/DroneLock"
import { Event } from "../../../../../KDInterfaceExtended"

export const EngageLock: InventoryEventHandlerDefinition = InventoryEventHandlerDefinition({
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

//#region Register
Helpers.RegisterModule(
    `${Category.SubNamespace}.${EngageLock.EventName}.${EngageLock.HandlerId}Registered`,
    () => {
        Event.Register(EngageLock)
    }
)
//#endregion