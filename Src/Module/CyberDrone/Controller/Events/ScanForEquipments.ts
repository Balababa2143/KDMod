import { Helpers, KD, KDVar } from "../../../../Common"
import { InventoryEventHandlerDesc, EventHandlerDesc } from "../../../../KDInterfaceExtended"
import { EquipmentCategory as Category } from "../../Constants"
import { ProtocolActivation } from "../../Sensory/Events"

const ActiveFlags = {
    Sensory: `${Category.Sensory.SubNamespace}.Activated`
}

export const ScanForEquipments: InventoryEventHandlerDesc = InventoryEventHandlerDesc({
    EventName: 'tick',
    HandlerId: Category.GetFullNameOf(() => ScanForEquipments),
    Handler: (e, item, data) => {
        KD.SendTextMessage_({
            priority: 6,
            color: '#ffffff',
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
            const newData = data as ProtocolActivation.EventData
            newData.EquipmentCategory = Category.Sensory.Tag
            KD.SendEvent_({
                Event: ProtocolActivation.EventName,
                data: newData,
                forceSpell: undefined!
            })
            KDVar.PlayerTags.set(ActiveFlags.Sensory, true)
        }
    }
})

//#region register
Helpers.RegisterModule(
    `${Category.Controller.Tag}.Events.ScanForEquipmentsRegistered`,
    () =>{
        EventHandlerDesc.Register(ScanForEquipments)
    }
)
//#endregion