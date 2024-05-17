import { KD } from "../../Common"
import { Mod, RootNamespace } from "../../Common"
import { NameOf } from "../../Common/Helpers"
import { CurseData, Curse, HandlerDefinition, ModularEvent, ModularEventData, InfoText } from "../../KDInterfaceExtended"
import { SciFiSet } from "../Template"

const ModuleName = 'DroneSet' as const

function GetFullNameOf(nameLambda: () => any) {
    return `${RootNamespace}.${ModuleName}.${NameOf(nameLambda)}`
}

export namespace SensoryItemTags {
    export const Gag: string = GetFullNameOf(() => Gag)
    export const EarPlug: string = GetFullNameOf(() => EarPlug)
    export const Mask: string = GetFullNameOf(() => Mask)
}

export const SensoryControlCurse: Curse = new Curse({
    Name: GetFullNameOf(() => SensoryControlCurse),
    Data: new CurseData({
        powerMult: 1,
        lock: true,
        level: 0,
        weight: (item) => {
            return 1
        },
        condition: (item) => false,
        remove: (item, host) => {

        }
    })
})

namespace EventHandler {
    const ProtocalTrigger = GetFullNameOf(() => ProtocalTrigger)
    export const ProtocolActivation: HandlerDefinition = HandlerDefinition.Create_({
        eventMap: KDEventMapInventory,
        trigger: ProtocalTrigger,
        type: GetFullNameOf(() => ProtocolActivation),
        handler: (e, item, data) => {
            KD.SendTextMessage_({
                priority: 6,
                color: '#e5311a',
                noPush: true,
                text: 'Sensory control protocal activated',
                time: 1,
                entity: undefined,
                noDupe: undefined
            })
            if(item.curse == null || item.curse !== SensoryControlCurse.Name){
                KDMorphToInventoryVariant(item, {
                    template: item.name,
                    events: [],
                },
                    undefined,
                    SensoryControlCurse.Name
                )
            }
        }
    })
    export const ProtocolController: HandlerDefinition = HandlerDefinition.Create_({
        eventMap: KDEventMapInventory,
        trigger: 'tick',
        type: GetFullNameOf(() => ProtocolController),
        handler: (e, item, data) => {
            KD.SendTextMessage_({
                priority: 6,
                color: '#e5311a',
                noPush: true,
                text: 'Sensory control protocal',
                time: 1,
                entity: undefined,
                noDupe: undefined
            })
            if (Object.values(SensoryItemTags).every(tag => KinkyDungeonPlayerTags.get(tag))) {
                KD.SendTextMessage_({
                    priority: 10,
                    color: '#e5311a',
                    noPush: true,
                    text: 'Sensory control protocal Activated',
                    time: 1,
                    entity: undefined,
                    noDupe: undefined
                })
                KD.SendEvent(ProtocolActivation.Trigger, data)
            }
        }
    })
}

namespace Event {
    export const SensoryControlProtocal: ModularEvent = new ModularEvent({
        Name: GetFullNameOf(() => SensoryControlProtocal),
        Data: new ModularEventData({
            events: (data) => [
                {
                    trigger: EventHandler.ProtocolActivation.Trigger,
                    type: EventHandler.ProtocolActivation.Type,
                    inheritLinked: true
                },
                {
                    trigger: EventHandler.ProtocolController.Trigger,
                    type: EventHandler.ProtocolController.Type,
                    inheritLinked: true
                },
            ]
        })
    })
}

export namespace Sensory {
    export const DroneEarPlug = SciFiSet.EarPlug.merge({
        Data: SciFiSet.EarPlug.Data.merge({
            name: GetFullNameOf(() => DroneEarPlug),
            events: [
                ...Event.SensoryControlProtocal.Data.events({
                    variant: {
                        template: SciFiSet.EarPlug.Data.name,
                        events: SciFiSet.EarPlug.Data.events ?? [],
                    }
                })
            ],
            addTag: [...SciFiSet.EarPlug.Data.addTag ?? [], SensoryItemTags.EarPlug]
        }),
        InfoText: new InfoText({
            DisplayName: 'Drone Ear Plug',
            FlavorText: '',
            FunctionText: ''
        })
    })

    export const DroneMuzzle = SciFiSet.Muzzle.merge({
        Data: SciFiSet.Muzzle.Data.merge({
            name: GetFullNameOf(() => DroneMuzzle),
            events: [
                ...Event.SensoryControlProtocal.Data.events({
                    variant: {
                        template: SciFiSet.Muzzle.Data.name,
                        events: SciFiSet.Muzzle.Data.events ?? []
                    }
                })
            ],
            addTag: [...SciFiSet.Muzzle.Data.addTag ?? [], SensoryItemTags.Gag]
        }),
        InfoText: new InfoText({
            DisplayName: 'Drone Muzzle',
            FlavorText: '',
            FunctionText: ''
        })
    })

    export const DroneMask = SciFiSet.Mask.merge({
        Data: SciFiSet.Mask.Data.merge({
            name: GetFullNameOf(() => DroneMask),
            events: [
                ...Event.SensoryControlProtocal.Data.events({
                    variant: {
                        template: SciFiSet.Mask.Data.name,
                        events: SciFiSet.Mask.Data.events ?? []
                    }
                })
            ],
            addTag: [...SciFiSet.Mask.Data.addTag ?? [], SensoryItemTags.Mask]
        }),
        InfoText: new InfoText({
            DisplayName: 'Drone Mask',
            FlavorText: '',
            FunctionText: ''
        })
    })
}

export function Register() {
    if (SensoryControlCurse.Name in KDCurses) {
        throw new Error('Sensory Register: SensoryControlCurse already exists')
    }
    else {
        KDCurses[SensoryControlCurse.Name] = SensoryControlCurse.Data.toJS()
    }
    Object.values(EventHandler).forEach(HandlerDefinition.Register)
    Object.values(Event).forEach(ModularEvent.Register)
    const restraints = Object.values(Sensory)
    if (restraints.every(Mod.CheckNoDuplicateRestraint)) {
        restraints.forEach(Mod.RegisterNewRestraint)
    }
    else {
        throw new Error(`${RootNamespace} register: restraint name duplicated`, {
            cause: {
                DuplicatedRestraints: [
                    ...restraints.filter(x => !Mod.CheckNoDuplicateRestraint(x))
                ]
            }
        })
    }
}