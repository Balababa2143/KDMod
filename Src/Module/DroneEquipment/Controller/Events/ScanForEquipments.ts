import { Helpers, KD, KDVar } from "../../../../Common"
import { InventoryEventHandlerDefinition, Event } from "../../../../KDInterfaceExtended"
import { EquipmentCategory as Category } from "../../Constants"

const ActiveFlags = {
    Sensory: `${Category.Sensory.SubNamespace}.Activated`
}

export const ScanForEquipments: InventoryEventHandlerDefinition = InventoryEventHandlerDefinition({
    EventName: 'tick',
    HandlerId: Category.GetFullNameOf(() => ScanForEquipments),
    Handler: (e, item, data) => {
        KD.SendTextMessage_({
            priority: 6,
            color: '#fffff',
            noPush: true,
            text: 'Control device installed',
            time: 1,
            entity: undefined,
            noDupe: undefined
        })
        if ((!KDVar.PlayerTags.get(ActiveFlags.Sensory)) &&
            Object.values(Category.Sensory.EquipmentTag).every(tag => KDVar.PlayerTags.get(tag))) {
            KD.SendTextMessage_({
                priority: 10,
                color: '#e5311a',
                noPush: true,
                text: 'Sensory control protocal Activated',
                time: 1,
                entity: undefined,
                noDupe: undefined
            })
            // KD.SendInventoryEvent(
            //     ""//TODO: add activation event,

            // )
            KDVar.PlayerTags.set(ActiveFlags.Sensory, true)
        }
    }
})

//#region register
Helpers.RegisterModule(
    `${Category.Controller.Tag}.Events.ScanForEquipmentsRegistered`,
    () =>{
        Event.Register(ScanForEquipments)
    }
)
//#endregion