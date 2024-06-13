import { KD } from "../../Common"
import { Mod, RootNamespace } from "../../Common"
import { NameOf, RecordProxy } from "../../Common/Helpers"
import { CurseData, Curse, HandlerDefinition, ModularEvent, ModularEventData, InfoText, InventoryActionEntry, Definition } from "../../KDInterfaceExtended"
import { SciFiSet } from "../Template"
import * as IM from "immutable"
import { DroneEquipment } from "./DroneEquipment"
import { DroneSetControlled } from "./Constants"

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

export namespace SensoryProtocol {
    const ProtocalTrigger = GetFullNameOf(() => ProtocalTrigger)

    const ProtocalDataKey = GetFullNameOf(() => ProtocalDataKey)

    export namespace Event {
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
                if (item.curse == null || item.curse !== SensoryControlCurse.Name) {
                    KD.MorphToInventoryVariant_({
                        item,
                        variant: {
                            template: item.name,
                            events: [],
                        },
                        prefix: '',
                        curse: SensoryControlCurse.Name
                    })
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

        export const DataInitializer: HandlerDefinition = HandlerDefinition.Create_({
            eventMap: KDEventMapInventory,
            trigger: 'postApply',
            type: GetFullNameOf(() => DataInitializer),
            handler: (function () {
                const defaultData = {}
                return (e, item, data) => {
                    const itemData = item.data ?? {}
                    if (!(ProtocalDataKey in itemData)) {
                        itemData[ProtocalDataKey] = defaultData
                    }
                    const definition = KDRestraint(item)
                    console.log('DroneEquipment', definition)
                    if('StateMap' in definition){
                        const de = definition as unknown as DroneEquipment
                        itemData['StateMap'] = de.StateMap
                    }
                    if('addTag' in definition){
                        itemData['addTag'] = definition.addTag
                    }
                    item.data = itemData
                }
            })()
        })

        export const MorphEquipment: HandlerDefinition = HandlerDefinition.Create_({
            eventMap: KDEventMapInventory,
            trigger: 'ProtocalTrigger',
            type: GetFullNameOf(() => MorphEquipment),
            handler: (function () {
                const defaultData = {}
                return (e, item, data) => {
                    const targetEquipment = data?.targetEquipment as string
                    const equipmentType = item?.data?.addTag as string
                    if(null != targetEquipment && null != equipmentType && equipmentType === targetEquipment){
                        const stateMap = item?.data?.stateMap as DroneEquipment['StateMap']
                        if(null != stateMap){
                            KD.MorphToInventoryVariant_({
                                item: item,
                                curse: item.curse!,
                                prefix: '',
                                variant: {
                                    template: stateMap.get(item.name)!,
                                    events: []
                                }
                            })
                        }
                        else{
                            console.error('null in stateMap')
                            console.trace()
                        }
                    }
                }
            })()
        })
    }
}

namespace EventModule {
    export const SensoryControlProtocal: ModularEvent = new ModularEvent({
        Name: GetFullNameOf(() => SensoryControlProtocal),
        Data: new ModularEventData({
            events: (data) => [
                {
                    trigger: SensoryProtocol.Event.ProtocolActivation.Trigger,
                    type: SensoryProtocol.Event.ProtocolActivation.Type,
                    inheritLinked: true
                },
                {
                    trigger: SensoryProtocol.Event.ProtocolController.Trigger,
                    type: SensoryProtocol.Event.ProtocolController.Type,
                    inheritLinked: true
                },
                {
                    trigger: SensoryProtocol.Event.DataInitializer.Trigger,
                    type: SensoryProtocol.Event.DataInitializer.Type,
                },
                {
                    trigger: SensoryProtocol.Event.MorphEquipment.Trigger,
                    type: SensoryProtocol.Event.MorphEquipment.Type,
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
                ...EventModule.SensoryControlProtocal.Data.events({
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
                ...EventModule.SensoryControlProtocal.Data.events({
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

    export const MuzzleStuffedBall = SciFiSet.Muzzle.merge({
        Data: SciFiSet.MuzzleStuffedBall.Data.merge({
            name: GetFullNameOf(() => DroneMuzzle),
            events: [
                ...EventModule.SensoryControlProtocal.Data.events({
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

    function SetMaskProps(template: Definition, name: string){
        return DroneEquipment(template)
            .setIn(['Data', 'name'], name)
            .updateIn(['Data', 'events'], events => [
                ...events ?? [],
                ...EventModule.SensoryControlProtocal.Data.events({
                    variant: {
                        template: SciFiSet.Mask.Data.name,
                        events: SciFiSet.Mask.Data.events ?? []
                    }
                })
            ])
            .updateIn(['Data', 'addTag'], tags => [...tags ?? [], SensoryItemTags.Mask])
            .set('InfoText', new InfoText({
                DisplayName: 'Drone Mask',
                FlavorText: '',
                FunctionText: ''
            }))
    }

    export const DroneMask: DroneEquipment = 
        SetMaskProps(SciFiSet.Mask, GetFullNameOf(() => DroneMask))
        .set('StateMap', IM.Map({
            Next: GetFullNameOf(() => DroneMaskOpaque)
        }))
        .setIn(['InfoText', 'DisplayName'], 'DroneMask')

    export const DroneMaskOpaque: DroneEquipment =
        SetMaskProps(SciFiSet.MaskOpaque, GetFullNameOf(() => DroneMaskOpaque))
        .set('StateMap', IM.Map({
            Next: GetFullNameOf(() => DroneMask)
        }))
        .setIn(['InfoText', 'DisplayName'], 'MaskOpaque')
}

export function Register() {
    if (SensoryControlCurse.Name in KDCurses) {
        throw new Error('Sensory Register: SensoryControlCurse already exists')
    }
    else {
        KDCurses[SensoryControlCurse.Name] = RecordProxy(SensoryControlCurse.Data)
    }
    Object.values(SensoryProtocol.Event).forEach(HandlerDefinition.Register)
    Object.values(EventModule).forEach(ModularEvent.Register)
    const restraints = 
        (Object.values(Sensory).map(d => d.updateIn(['Data', 'addTag'], tags => [...tags ?? [], DroneSetControlled])) as unknown as Definition[])
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