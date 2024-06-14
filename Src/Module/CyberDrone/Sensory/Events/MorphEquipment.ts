import { EquipmentCategory } from "../../Constants"
import Category = EquipmentCategory.Sensory
import GetFullNameOf = Category.GetFullNameOf
import { EventHandlerDesc, InventoryEventHandlerDesc } from "../../../../KDInterfaceExtended"
import { DroneEquipmentData } from "../../DroneEquipment"
import { Helpers, KD } from "../../../../Common"

export namespace MorphEquipment {
    export const EventName = GetFullNameOf(() => MorphEquipment)

    export interface EventData {
        TargetEquipment: string
    }

    export namespace Handlers {

        export const Toggle: InventoryEventHandlerDesc = InventoryEventHandlerDesc({
            EventName: EventName,
            HandlerId: GetFullNameOf(() => Toggle),
            Handler: (e, item, data) => {
                const evData = data as Partial<EventData>
                const targetEquipment = evData?.TargetEquipment
                const definition = KDRestraint(item) as DroneEquipmentData
                const tags = definition.shrine ?? []
                if (targetEquipment != null && tags.some(tag => tag === targetEquipment)) {
                    const stateMap = definition.StateMap
                    if (null != stateMap) {
                        KD.MorphToInventoryVariant_({
                            item: item,
                            curse: item.curse!,
                            prefix: '',
                            variant: {
                                template: stateMap.get('Next')!,
                                events: []
                            }
                        })
                    }
                    else {
                        console.error('null in stateMap')
                        console.trace()
                    }
                }
            }
        })
        
    }
}

//#region Register
Helpers.RegisterModule(
    `${Category.SubNamespace}.${MorphEquipment.EventName}Registered`,
    () => {
        Object.values(MorphEquipment.Handlers).forEach(EventHandlerDesc.Register)
    }
)
//#endregion