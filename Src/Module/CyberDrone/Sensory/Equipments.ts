import { Template } from "../.."
import SciFiSet = Template.SciFiSet
import { EquipmentCategory as EquipmentCategory } from "../Constants"
import Category = EquipmentCategory.Sensory
import * as IM from "immutable"
import { Helpers } from "../../../Common"
import { WearableEntry } from "../../../KDInterfaceExtended"
import * as MorphEquipment from "../Events/MorphEquipment"
import * as ProtocolActivation from "../Events/ProtocolActivation"
import { DroneEquipmentEntry, DroneEquipmentInitializer } from "../DroneEquipment"

export namespace Equipments {
    export const DroneEarPlug: DroneEquipmentEntry =
        DroneEquipmentEntry({
            Data: SciFiSet.EarPlug.Data.merge({
                name: Category.SubGetFullName(() => DroneEarPlug)
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
                },
                {
                    trigger: MorphEquipment.EventName,
                    type: MorphEquipment.Handlers.Toggle.HandlerId
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
        SetMuzzlerops(SciFiSet.Muzzle,Category.SubGetFullName(() => DroneMuzzle))
        .setIn(['Data', 'StateMap'], IM.Map({
            Next: Category.SubGetFullName(() => MuzzleStuffedBall)
        }))

    export const MuzzleStuffedBall: DroneEquipmentEntry =
        SetMuzzlerops(SciFiSet.MuzzleStuffedBall, Category.SubGetFullName(() => MuzzleStuffedBall))
        .setIn(['Data', 'StateMap'], IM.Map({
            Next: Category.SubGetFullName(() => DroneMuzzle)
        }))

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
                    type: MorphEquipment.Handlers.Toggle.HandlerId
                }
            ])
            .updateIn(['Data', 'shrine'], tags => [...tags ?? [], Category.EquipmentTag.Mask])
            .updateIn(['Data', 'addTag'], tags => [...tags ?? [], Category.EquipmentTag.Mask])
    }

    export const DroneMask: DroneEquipmentEntry =
        SetMaskProps(SciFiSet.Mask, Category.SubGetFullName(() => DroneMask))
            .setIn(['Data', 'StateMap'], IM.Map({
                Next: Category.SubGetFullName(() => DroneMaskOpaque)
            }))

    export const DroneMaskOpaque: DroneEquipmentEntry =
        SetMaskProps(SciFiSet.MaskOpaque, Category.SubGetFullName(() => DroneMaskOpaque))
            .setIn(['Data', 'StateMap'], IM.Map({
                Next: Category.SubGetFullName(() => DroneMask)
            }))
            .setIn(['Data', 'blindfold'], 2)
}

//#region Register
Helpers.RegisterModule(
    `${Category.FullName}Registered`,
    () => {
        const defs =
            Object.values(Equipments)
                .map(e => e
                    .updateIn(['Data', 'addTag'], tags => [
                        ...tags ?? [],
                        EquipmentCategory.FullName,
                        Category.FullName
                    ])
                )

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