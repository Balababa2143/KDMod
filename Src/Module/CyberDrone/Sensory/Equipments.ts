import { Template } from "../.."
import SciFiSet = Template.SciFiSet
import { EquipmentCategory as EquipmentCategory } from "../Constants"
import GetFullNameOf = EquipmentCategory.Sensory.GetFullNameOf
import Category = EquipmentCategory.Sensory
import * as IM from "immutable"
import { Helpers } from "../../../Common"
import { Wearable, WearableBase, WearableEntry } from "../../../KDInterfaceExtended"
import { MorphEquipment } from "./Events/MorphEquipment"
import { ProtocolActivation } from "./Events"
import { DroneEquipmentEntry, DroneEquipmentInitializer } from "../DroneEquipment"

export namespace Equipments {
    export const DroneEarPlug: DroneEquipmentEntry =
        DroneEquipmentEntry({
            Data: SciFiSet.EarPlug.Data.merge({
                name: GetFullNameOf(() => DroneEarPlug)
            }) as DroneEquipmentInitializer,
            InfoText: {
                DisplayName: 'Drone Ear Plug'
            },
        })
            .updateIn(['Data', 'events'], es => [
                ...es ?? [],
                {
                    trigger: ProtocolActivation.EventName,
                    type: ProtocolActivation.Handlers.EngageLock.HandlerId
                }
            ])
            .updateIn(['Data', 'addTag'], tags => [
                ...tags ?? [],
                Category.EquipmentTag.EarPlug
            ])

    function SetMuzzlerops(template: typeof SciFiSet.BallGag, name: string){
        return DroneEquipmentEntry({
            Data: template.Data.merge({
                name: name
            }) as DroneEquipmentInitializer,
            InfoText: {
                DisplayName: 'Drone Muzzle'
            },
        })
            .updateIn(['Data', 'events'], es => [
                ...es ?? [],
                {
                    trigger: ProtocolActivation.EventName,
                    type: ProtocolActivation.Handlers.EngageLock.HandlerId
                }
            ])
            .updateIn(['Data', 'shrine'], tags => [
                ...tags ?? [],
                Category.EquipmentTag.Gag
            ])
            .updateIn(['Data', 'addTag'], tags => [
                ...tags ?? [],
                Category.EquipmentTag.Gag
            ])
    }

    export const DroneMuzzle: DroneEquipmentEntry =
        SetMuzzlerops(SciFiSet.Muzzle,GetFullNameOf(() => DroneMuzzle))

    export const MuzzleStuffedBall: DroneEquipmentEntry =
        SetMuzzlerops(SciFiSet.MuzzleStuffedBall, GetFullNameOf(() => MuzzleStuffedBall))

    function SetMaskProps(template: typeof SciFiSet.Mask, name: string) {
        return DroneEquipmentEntry({
            Data: template.Data.merge({
                name,

            }) as DroneEquipmentInitializer,
            InfoText: {
                DisplayName: 'Drone Mask'
            }
        })
            .updateIn(['Data', 'events'], events => [
                ...events ?? [],
                {
                    trigger: ProtocolActivation.EventName,
                    type: ProtocolActivation.Handlers.EngageLock.HandlerId
                },
                {
                    trigger: MorphEquipment.EventName,
                    type: MorphEquipment.Handlers.ToggleVisor.HandlerId
                }
            ])
            .updateIn(['Data', 'shrine'], tags => [...tags ?? [], Category.EquipmentTag.Mask])
            .updateIn(['Data', 'addTag'], tags => [...tags ?? [], Category.EquipmentTag.Mask])
    }

    export const DroneMask: DroneEquipmentEntry =
        SetMaskProps(SciFiSet.Mask, GetFullNameOf(() => DroneMask))
            .setIn(['Data', 'StateMap'], IM.Map({
                Next: GetFullNameOf(() => DroneMaskOpaque)
            }))

    export const DroneMaskOpaque: DroneEquipmentEntry =
        SetMaskProps(SciFiSet.MaskOpaque, GetFullNameOf(() => DroneMaskOpaque))
            .setIn(['Data', 'StateMap'], IM.Map({
                Next: GetFullNameOf(() => DroneMask)
            }))
            .setIn(['Data', 'blindfold'], 2)
}

//#region Register
Helpers.RegisterModule(
    `${Category.SubNamespace}Registered`,
    () => {
        const defs =
            Object.values(Equipments)
                .map(e => e
                    .updateIn(['Data', 'shrine'], tags => [
                        ...tags ?? [],
                        EquipmentCategory.Sensory.Tag
                    ])
                    .updateIn(['Data', 'addTag'], tags => [
                        ...tags ?? [],
                        EquipmentCategory.Namespace,
                        EquipmentCategory.Sensory.Tag
                    ])
                )

        if (defs.every(WearableEntry.CheckNoDuplicate)) {
            defs.forEach(WearableEntry.PushToRestraints)
        }
        else {
            Helpers.Throw(`${Category.SubNamespace} register: restraint name duplicated`, {
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