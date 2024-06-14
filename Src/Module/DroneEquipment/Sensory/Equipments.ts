import { Template } from "../.."
import SciFiSet = Template.SciFiSet
import { EquipmentCategory as EquipmentCategory } from "../Constants"
import GetFullNameOf = EquipmentCategory.Sensory.GetFullNameOf
import Category = EquipmentCategory.Sensory
import * as IM from "immutable"
import { Helpers } from "../../../Common"
import { WearableBase } from "../../../KDInterfaceExtended"
import { CreateWithText, TypeWithText as DroneEquipmentRecordWithText, Initializer } from "../Wearable"
import { MorphEquipment } from "./Events/MorphEquipment"
import { ProtocolActivation } from "./Events"

export namespace Equipments {
    export const DroneEarPlug: DroneEquipmentRecordWithText =
        CreateWithText({
            Data: SciFiSet.EarPlug.Data.merge({
                name: GetFullNameOf(() => DroneEarPlug)
            }) as Initializer,
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
        return CreateWithText({
            Data: template.Data.merge({
                name: name
            }) as Initializer,
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

    export const DroneMuzzle: DroneEquipmentRecordWithText =
        SetMuzzlerops(SciFiSet.Muzzle,GetFullNameOf(() => DroneMuzzle))

    export const MuzzleStuffedBall: DroneEquipmentRecordWithText =
        SetMuzzlerops(SciFiSet.MuzzleStuffedBall, GetFullNameOf(() => MuzzleStuffedBall))

    function SetMaskProps(template: typeof SciFiSet.Mask, name: string) {
        return CreateWithText({
            Data: template.Data.merge({
                name,

            }) as Initializer,
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