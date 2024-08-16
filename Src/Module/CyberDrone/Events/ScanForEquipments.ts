import { Helpers, KD } from "../../../Common"
import { InventoryEventHandlerDesc, EventHandlerDesc } from "../../../KDInterfaceExtended"
import { EquipmentCategory as Category } from "../Constants"
import * as ProtocolActivation from "./ProtocolActivation"

const ActiveFlags = {
    Sensory: `${Category.Sensory.FullName}.Activated`
}

export const ScanForEquipments: InventoryEventHandlerDesc = InventoryEventHandlerDesc({
    EventName: 'tick',
    HandlerId: Category.SubGetFullName(() => ScanForEquipments),
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
        if ((!KD.Var.PlayerTags.get(ActiveFlags.Sensory)) &&
            Object.values(Category.Sensory.EquipmentTag).every(tag => KD.Var.PlayerTags.get(tag))) {
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
            newData.EquipmentCategory = Category.Sensory.FullName
            KD.SendEvent_({
                Event: ProtocolActivation.EventName,
                data: newData,
                forceSpell: undefined!
            })
            KD.Var.PlayerTags.set(ActiveFlags.Sensory, true)
        }
    }
})

//#region register
Helpers.RegisterModule(
    `${Category.Controller.FullName}.Events.ScanForEquipmentsRegistered`,
    () =>{
        EventHandlerDesc.Register(ScanForEquipments)
    }
)
//#endregion