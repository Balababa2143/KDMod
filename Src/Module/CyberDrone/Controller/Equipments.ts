import { Helpers } from "../../../Common"
import { WearableEntry, WearableBase } from "../../../KDInterfaceExtended"
import { SciFiSet } from "../../Template"
import { EquipmentCategory } from "../Constants"
import Category = EquipmentCategory.Controller
import { DroneEquipmentEntry, DroneEquipmentInitializer } from "../DroneEquipment"
import { ScanForEquipments } from "./Events"


export namespace Equipments {
    function SetControllerProps(template: WearableEntry, name: string){
        return DroneEquipmentEntry({
            Data: template.Data.merge({
                name,
            }) as DroneEquipmentInitializer,
            InfoText: {
                DisplayName: 'Drone Visor'
            }
        })
        .updateIn(['Data', 'events'], es => [
            ...es ?? [],
            {
                trigger: ScanForEquipments.EventName,
                type: ScanForEquipments.HandlerId,
                inheritLinked: true
            }
        ])
    }

    export const Visor: DroneEquipmentEntry =
        SetControllerProps(SciFiSet.Visor, Category.SubGetFullName(() => Visor))
}

//#region Register
Helpers.RegisterModule(
    `${Category.FullName}Registered`,
    () => {
        const defs =
            Object.values(Equipments)
                .map(e => e.updateIn(['Data', 'addTag'], tags => [
                    ...tags ?? [],
                    EquipmentCategory.Controller.FullName
                ]));
        if (defs.every(WearableEntry.CheckNoDuplicate)) {
            defs.forEach(WearableEntry.PushToRestraints)
        }
        else {
            Helpers.Throw(`${Category.FullName} register: restraint name duplicated`, {
                cause: {
                    DuplicatedRestraints: [
                        ...defs.filter(x => !WearableEntry.CheckNoDuplicate(x))
                    ]
                }
            })
        }
    }
)
//#endregion