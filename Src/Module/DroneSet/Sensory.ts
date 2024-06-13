// import { KD } from "../../Common"
// import { Mod, RootNamespace } from "../../Common"
// import { NameOf, RecordProxy } from "../../Common/Helpers"
// import { CurseData, Curse, InventoryEventHandlerDefinition, ModularEvent, ModularEventData, InfoText, InventoryActionEntry, Definition, EventHandlerDefinition } from "../../KDInterfaceExtended"
// import { SciFiSet } from "../Template"
// import * as IM from "immutable"
// import { DroneEquipment } from "./DroneEquipment"
// import { DroneSetControlled } from "./Constants"

// const ModuleName = 'DroneSet' as const

// function GetFullNameOf(nameLambda: () => any) {
//     return `${RootNamespace}.${ModuleName}.${NameOf(nameLambda)}`
// }

// export namespace SensoryItemTags {
//     export const Gag: string = GetFullNameOf(() => Gag)
//     export const EarPlug: string = GetFullNameOf(() => EarPlug)
//     export const Mask: string = GetFullNameOf(() => Mask)
// }

// export const SensoryControlCurse: Curse = new Curse({
//     Name: GetFullNameOf(() => SensoryControlCurse),
//     Data: new CurseData({
//         powerMult: 1,
//         lock: true,
//         level: 0,
//         weight: (item) => {
//             return 1
//         },
//         condition: (item) => false,
//         remove: (item, host) => {

//         }
//     })
// })

// export namespace SensoryProtocol {
//     const ActivationTrigger = GetFullNameOf(() => ActivationTrigger)

//     const MorphTrigger = GetFullNameOf(() => MorphTrigger)

//     const ProtocalDataKey = GetFullNameOf(() => ProtocalDataKey)

//     export namespace Event {
//         export const ProtocolActivation: InventoryEventHandlerDefinition = InventoryEventHandlerDefinition({
//             EventName: ActivationTrigger,
//             HandlerId: GetFullNameOf(() => ProtocolActivation),
//             Handler: (e, item, data) => {
//                 KD.SendTextMessage_({
//                     priority: 6,
//                     color: '#e5311a',
//                     noPush: true,
//                     text: 'Sensory control protocal activated',
//                     time: 1,
//                     entity: undefined,
//                     noDupe: undefined
//                 })
//                 if (item.curse == null || item.curse !== SensoryControlCurse.Name) {
//                     KD.MorphToInventoryVariant_({
//                         item,
//                         variant: {
//                             template: item.name,
//                             events: [],
//                         },
//                         prefix: '',
//                         curse: SensoryControlCurse.Name
//                     })
//                 }
//             }
//         })

//         export const ProtocolController: InventoryEventHandlerDefinition = InventoryEventHandlerDefinition({
//             EventName: 'tick',
//             HandlerId: GetFullNameOf(() => ProtocolController),
//             Handler: (e, item, data) => {
//                 KD.SendTextMessage_({
//                     priority: 6,
//                     color: '#e5311a',
//                     noPush: true,
//                     text: 'Sensory control protocal',
//                     time: 1,
//                     entity: undefined,
//                     noDupe: undefined
//                 })
//                 if (Object.values(SensoryItemTags).every(tag => KinkyDungeonPlayerTags.get(tag))) {
//                     KD.SendTextMessage_({
//                         priority: 10,
//                         color: '#e5311a',
//                         noPush: true,
//                         text: 'Sensory control protocal Activated',
//                         time: 1,
//                         entity: undefined,
//                         noDupe: undefined
//                     })
//                     KD.SendEvent(ProtocolActivation.EventName, data)
//                 }
//             }
//         })

//         export const DataInitializer: InventoryEventHandlerDefinition = InventoryEventHandlerDefinition({
//             EventName: 'postApply',
//             HandlerId: GetFullNameOf(() => DataInitializer),
//             Handler: (function () {
//                 const defaultData = {}
//                 return (e, item, data) => {
//                     const itemData = item.data ?? {}
//                     if (!(ProtocalDataKey in itemData)) {
//                         itemData[ProtocalDataKey] = defaultData
//                     }
//                     const definition = KDRestraint(item)
//                     if(definition.StateMap){
//                         itemData['StateMap'] = definition.StateMap
//                     }
//                     else if(definition.name === Sensory.DroneMaskOpaque.Data.name){
//                         itemData['StateMap'] = Sensory.DroneMaskOpaque.StateMap
//                     }
//                     if('addTag' in definition){
//                         itemData['addTag'] = definition.addTag
//                     }
//                     item.data = itemData
//                 }
//             })()
//         })

//         export const MorphEquipment: InventoryEventHandlerDefinition = InventoryEventHandlerDefinition({
//             EventName: MorphTrigger,
//             HandlerId: GetFullNameOf(() => MorphEquipment),
//             Handler: (function () {
//                 const defaultData = {}
//                 return (e, item, data) => {
//                     console.log('MorphEquipment', e, item ,data)
//                     const targetEquipment = data?.targetEquipment as string
//                     const tags = item?.data?.addTag as string[]

//                     console.log('tatget', targetEquipment)
//                     console.log('equipped', tags)

//                     if(null != targetEquipment && null != tags && tags.some(tag => tag  === targetEquipment)){
//                         const stateMap = item?.data?.StateMap as DroneEquipment['StateMap']
//                         if(null != stateMap){
//                             KD.MorphToInventoryVariant_({
//                                 item: item,
//                                 curse: item.curse!,
//                                 prefix: '',
//                                 variant: {
//                                     template: stateMap.get('Next')!,
//                                     events: []
//                                 }
//                             })
//                             item.data.StateMap = KDRestraint(item).StateMap
//                         }
//                         else{
//                             console.error('null in stateMap')
//                             console.trace()
//                         }
//                     }
//                 }
//             })()
//         })
//     }

//     export type Event = Iterable<EventHandlerDefinition<any>>
// }

// namespace EventModule {
//     export const SensoryControlProtocal: ModularEvent = new ModularEvent({
//         Name: GetFullNameOf(() => SensoryControlProtocal),
//         Data: new ModularEventData({
//             events: (data) => [
//                 {
//                     trigger: SensoryProtocol.Event.ProtocolActivation.EventName,
//                     type: SensoryProtocol.Event.ProtocolActivation.HandlerId,
//                     inheritLinked: true
//                 },
//                 {
//                     trigger: SensoryProtocol.Event.ProtocolController.EventName,
//                     type: SensoryProtocol.Event.ProtocolController.HandlerId,
//                     inheritLinked: true
//                 },
//                 {
//                     trigger: SensoryProtocol.Event.DataInitializer.EventName,
//                     type: SensoryProtocol.Event.DataInitializer.HandlerId,
//                 },
//                 {
//                     trigger: SensoryProtocol.Event.MorphEquipment.EventName,
//                     type: SensoryProtocol.Event.MorphEquipment.HandlerId,
//                 },
//             ]
//         })
//     })
// }

// export namespace Sensory {
//     export const DroneEarPlug = SciFiSet.EarPlug.merge({
//         Data: SciFiSet.EarPlug.Data.merge({
//             name: GetFullNameOf(() => DroneEarPlug),
//             events: [
//                 ...EventModule.SensoryControlProtocal.Data.events({
//                     variant: {
//                         template: SciFiSet.EarPlug.Data.name,
//                         events: SciFiSet.EarPlug.Data.events ?? [],
//                     }
//                 })
//             ],
//             addTag: [...SciFiSet.EarPlug.Data.addTag ?? [], SensoryItemTags.EarPlug]
//         }),
//         InfoText: new InfoText({
//             DisplayName: 'Drone Ear Plug',
//             FlavorText: '',
//             FunctionText: ''
//         })
//     })

//     export const DroneMuzzle = SciFiSet.Muzzle.merge({
//         Data: SciFiSet.Muzzle.Data.merge({
//             name: GetFullNameOf(() => DroneMuzzle),
//             events: [
//                 ...EventModule.SensoryControlProtocal.Data.events({
//                     variant: {
//                         template: SciFiSet.Muzzle.Data.name,
//                         events: SciFiSet.Muzzle.Data.events ?? []
//                     }
//                 })
//             ],
//             addTag: [...SciFiSet.Muzzle.Data.addTag ?? [], SensoryItemTags.Gag]
//         }),
//         InfoText: new InfoText({
//             DisplayName: 'Drone Muzzle',
//             FlavorText: '',
//             FunctionText: ''
//         })
//     })

//     export const MuzzleStuffedBall = SciFiSet.Muzzle.merge({
//         Data: SciFiSet.MuzzleStuffedBall.Data.merge({
//             name: GetFullNameOf(() => DroneMuzzle),
//             events: [
//                 ...EventModule.SensoryControlProtocal.Data.events({
//                     variant: {
//                         template: SciFiSet.Muzzle.Data.name,
//                         events: SciFiSet.Muzzle.Data.events ?? []
//                     }
//                 })
//             ],
//             addTag: [...SciFiSet.Muzzle.Data.addTag ?? [], SensoryItemTags.Gag]
//         }),
//         InfoText: new InfoText({
//             DisplayName: 'Drone Muzzle',
//             FlavorText: '',
//             FunctionText: ''
//         })
//     })

//     function SetMaskProps(template: Definition, name: string){
//         return DroneEquipment(template)
//             .setIn(['Data', 'name'], name)
//             .updateIn(['Data', 'events'], events => [
//                 ...events ?? [],
//                 ...EventModule.SensoryControlProtocal.Data.events({
//                     variant: {
//                         template: SciFiSet.Mask.Data.name,
//                         events: SciFiSet.Mask.Data.events ?? []
//                     }
//                 })
//             ])
//             .updateIn(['Data', 'addTag'], tags => [...tags ?? [], SensoryItemTags.Mask])
//             .set('InfoText', new InfoText({
//                 DisplayName: 'Drone Mask',
//                 FlavorText: '',
//                 FunctionText: ''
//             }))
//     }

//     export const DroneMask: DroneEquipment = 
//         SetMaskProps(SciFiSet.Mask, GetFullNameOf(() => DroneMask))
//         .set('StateMap', IM.Map({
//             Next: GetFullNameOf(() => DroneMaskOpaque)
//         }))

//     export const DroneMaskOpaque: DroneEquipment =
//         SetMaskProps(SciFiSet.MaskOpaque, GetFullNameOf(() => DroneMaskOpaque))
//         .set('StateMap', IM.Map({
//             Next: GetFullNameOf(() => DroneMask)
//         }))
//         .setIn(['Data', 'blindfold'], 2)
// }

// //#region Register
// Object.values(SensoryProtocol.Event).for
// //#endregion

// export function Register() {
//     if (SensoryControlCurse.Name in KDCurses) {
//         throw new Error('Sensory Register: SensoryControlCurse already exists')
//     }
//     else {
//         KDCurses[SensoryControlCurse.Name] = RecordProxy(SensoryControlCurse.Data)
//     }
//     // Object.values(SensoryProtocol.Event).forEach(InventoryEventHandlerDefinition.Register)
//     Object.values(EventModule).forEach(ModularEvent.Register)
//     const restraints = 
//         (Object.values(Sensory).map(d => d.updateIn(['Data', 'addTag'], tags => [...tags ?? [], DroneSetControlled])) as unknown as Definition[])
//     if (restraints.every(Mod.CheckNoDuplicateRestraint)) {
//         restraints.forEach(Mod.RegisterNewRestraint)
//         KD.Variables.Restraints.find(r => r.name === Sensory.DroneMask.Data.name)['StateMap'] = Sensory.DroneMask.StateMap
//         KD.Variables.Restraints.find(r => r.name === Sensory.DroneMaskOpaque.Data.name)['StateMap'] = Sensory.DroneMaskOpaque.StateMap
//     }
//     else {
//         throw new Error(`${RootNamespace} register: restraint name duplicated`, {
//             cause: {
//                 DuplicatedRestraints: [
//                     ...restraints.filter(x => !Mod.CheckNoDuplicateRestraint(x))
//                 ]
//             }
//         })
//     }
// }