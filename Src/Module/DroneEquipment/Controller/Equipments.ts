import { Wearable, WearableBase } from "../../../KDInterfaceExtended"
import * as DroneEquipment from "../Wearable"
import { EquipmentCategory } from "../Constants"
import Category = EquipmentCategory.Controller
import GetFullNameOf = EquipmentCategory.Controller.GetFullNameOf
import { SciFiSet } from "../../Template"
import { Helpers } from "../../../Common"
import { ScanForEquipments } from "./Events"

export namespace Equipments {
    function SetControllerProps(template: Wearable.TypeWithText, name: string){
        return DroneEquipment.CreateWithText({
            Data: template.Data.merge({
                name,
            }) as DroneEquipment.Initializer,
            InfoText: {
                DisplayName: 'Drone Visor'
            }
        })
        .updateIn(['Data', 'shrine'], tags => [...tags ?? [], Category.Tag])
        .updateIn(['Data', 'events'], es => [
            ...es ?? [],
            {
                trigger: ScanForEquipments.EventName,
                type: ScanForEquipments.HandlerId,
                inheritLinked: true
            }
        ])
    }

    export const Visor: DroneEquipment.TypeWithText =
        SetControllerProps(SciFiSet.Visor, GetFullNameOf(() => Visor))
}

//#region Register
Helpers.RegisterModule(
    `${Category.SubNamespace}Registered`,
    () => {
        const defs =
            Object.values(Equipments)
                .map(e => e.updateIn(['Data', 'shrine'], tags => [
                    ...tags ?? [],
                    EquipmentCategory.Controller.Tag
                ]));
        if (defs.every(WearableBase.CheckNoDuplicate)) {
            defs.forEach(WearableBase.PushToRestraints)
        }
        else {
            Helpers.Throw(`${Category.SubNamespace} register: restraint name duplicated`, {
                cause: {
                    DuplicatedRestraints: [
                        ...defs.filter(x => !WearableBase.CheckNoDuplicate(x))
                    ]
                }
            })
        }
    }
)
//#endregion