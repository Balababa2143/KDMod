import { Template } from "../.."
import SciFiSet = Template.SciFiSet
import { EquipmentCategory as EquipmentCategory } from "../Constants"
import GetFullNameOf = EquipmentCategory.Sensory.GetFullNameOf
import Category = EquipmentCategory.Sensory
import * as IM from "immutable"
import { Helpers } from "../../../Common"
import { WearableBase } from "../../../KDInterfaceExtended"
import { CreateWithText, TypeWithText as DroneEquipmentRecordWithText, DroneEquipmentInitializer } from "../Wearable"

export namespace Equipments {
    export const DroneEarPlug: DroneEquipmentRecordWithText =
        CreateWithText({
            Data: SciFiSet.EarPlug.Data.merge({
                name: GetFullNameOf(() => DroneEarPlug)
            }) as DroneEquipmentInitializer,
            InfoText: {
                DisplayName: 'Drone Ear Plug'
            },
        })
            .updateIn(['Data', 'events'], es => [
                ...es ?? [],
                // ...EventModule.SensoryControlProtocal.Data.events({
                //     variant: {
                //         template: SciFiSet.EarPlug.Data.name,
                //         events: SciFiSet.EarPlug.Data.events ?? [],
                //     }
                // })
            ])
            .updateIn(['Data', 'shrine'], tags => [
                ...tags ?? [],
                Category.EarPlug
            ])

    export const DroneMuzzle: DroneEquipmentRecordWithText =
        CreateWithText({
            Data: SciFiSet.Muzzle.Data.merge({
                name: GetFullNameOf(() => DroneMuzzle)
            }) as DroneEquipmentInitializer,
            InfoText: {
                DisplayName: 'Drone Muzzle'
            },
        })
            .updateIn(['Data', 'events'], es => [
                ...es ?? [],
                // ...EventModule.SensoryControlProtocal.Data.events({
                //     variant: {
                //         template: SciFiSet.EarPlug.Data.name,
                //         events: SciFiSet.EarPlug.Data.events ?? [],
                //     }
                // })
            ])
            .updateIn(['Data', 'shrine'], tags => [
                ...tags ?? [],
                Category.Gag
            ])

    export const MuzzleStuffedBall: DroneEquipmentRecordWithText =
        CreateWithText({
            Data: SciFiSet.MuzzleStuffedBall.Data.merge({
                name: GetFullNameOf(() => MuzzleStuffedBall)
            }) as DroneEquipmentInitializer,
            InfoText: {
                DisplayName: 'Drone Muzzle'
            },
        })
            .updateIn(['Data', 'events'], es => [
                ...es ?? [],
                // ...EventModule.SensoryControlProtocal.Data.events({
                //     variant: {
                //         template: SciFiSet.EarPlug.Data.name,
                //         events: SciFiSet.EarPlug.Data.events ?? [],
                //     }
                // })
            ])
            .updateIn(['Data', 'shrine'], tags => [
                ...tags ?? [],
                Category.Gag
            ])

    function SetMaskProps(template: typeof SciFiSet.Mask, name: string) {
        return CreateWithText({
            Data: template.Data.merge({
                name,

            }) as DroneEquipmentInitializer,
            InfoText: {
                DisplayName: 'Drone Mask'
            }
        })
            .updateIn(['Data', 'events'], events => [
                ...events ?? [],
                // ...EventModule.SensoryControlProtocal.Data.events({
                //     variant: {
                //         template: SciFiSet.Mask.Data.name,
                //         events: SciFiSet.Mask.Data.events ?? []
                //     }
                // })
            ])
            .updateIn(['Data', 'shrine'], tags => [...tags ?? [], Category.Mask])
    }

    export const DroneMask: DroneEquipmentRecordWithText =
        SetMaskProps(SciFiSet.Mask, GetFullNameOf(() => DroneMask))
            .setIn(['Data', 'StateMap'], IM.Map({
                Next: GetFullNameOf(() => DroneMaskOpaque)
            }))

    export const DroneMaskOpaque: DroneEquipmentRecordWithText =
        SetMaskProps(SciFiSet.MaskOpaque, GetFullNameOf(() => DroneMaskOpaque))
            .setIn(['Data', 'StateMap'], IM.Map({
                Next: GetFullNameOf(() => DroneMask)
            }))
            .setIn(['Data', 'blindfold'], 2)
}

//#region Register
Helpers.RegisterModule(
    `${Category.Namespace}Registered`,
    () => {
        const defs =
            Object.values(Equipments)
                .map(e => e.updateIn(['Data', 'shrine'], tags => [
                    ...tags ?? [],
                    EquipmentCategory.DroneEquipment
                ]));
        if (defs.every(WearableBase.CheckNoDuplicate)) {
            defs.forEach(WearableBase.PushToRestraints)
        }
        else {
            Helpers.Throw(`${Category.Namespace} register: restraint name duplicated`, {
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