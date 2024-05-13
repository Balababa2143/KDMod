import { KDInterface as KD } from 'kinkydungeoninterfacewrapper'

// KDPrereqs["DroneSetComplete"] = (enemy, e, data) => {
//     return true
// }

// KDEventHexModular["DroneSetComplete"] = {
//     level: 1,
//     weight: (item, allHex, data) => {
//         return 0;
//     },
//     events: (data) => [
//         { trigger: "drawSGTooltip", type: "curseInfo", prereq: "DroneSetComplete", msg: "DroneSetComplete", color: "#ff5555", inheritLinked: true, original: "CompletedDroneSet" },
//         { trigger: "drawBuffIcons", type: "curseInfo", prereq: "DroneSetComplete", buffSprite: "curse/Blocked", inheritLinked: true, original: "CompletedDroneSet" },
//     ]
// }

// KDCurses["CompletedDroneSet"] = {
//     powerMult: 4,
//     lock: true,
//     level: 15,
//     activatecurse: true,
//     customIcon_hud: "Locks/Blocked",
//     weight: (item) => {
//         return 0
//     },
//     condition: (item) => 
//         KD
//         .AllRestraint()
//         .filter(r => KDGetCurse(r) === 'CompletedDroneSet')
//         .length === 2
//     ,
//     events: [
//         { type: "DroneRemove", trigger: "postUnlock", kind: "CompletedDroneSet" }
//     ],
//     remove: (item, host) => {
//     }
// }

// declare let KDMaskLink: string[]

// KDEventMapInventory["postUnlock"]["DroneRemove"] = (e, item, data) => {
//     if (item && e.kind && KDCurses[e.kind].condition(item)) {
//         const r = KDRestraint(item)
//         let inventoryAs = item.inventoryVariant || item.name || (r.inventoryAs);
//         item.curse = undefined;
//         if (inventoryAs && KinkyDungeonRestraintVariants[inventoryAs]) {
//             KinkyDungeonRestraintVariants[inventoryAs].curse = undefined;
//             KinkyDungeonSendTextMessage(1, 'KinkyDungeonRestraintVariants[inventoryAs].curse = undefined', "#88ff88", 1, false, true);
//         }
//         KinkyDungeonLock(item, r.DefaultLock ?? 'Red');
//         KinkyDungeonSendTextMessage(1, 'KDEventMapInventory["postUnlock"]["DroneRemove"]', "#88ff88", 1, false, true);
//     }
// }

import { Register as RegisterLockedGlove } from './Model/LockedGlove'
import { Register as RegisterCuffLink } from './Model/DroneCuffs'
RegisterLockedGlove()
RegisterCuffLink()

import * as Template from './Template'
Template.SciFiSet.Register()

declare let KDPerkStart: Record<string, () => void>
KDPerkStart["StartDrone"] = () => {
    Object.values(Template.SciFiSet.SciFiSet)
        .forEach(def => {
            KD.AddRestraintIfWeaker_({
                restraint: def.Data.name,
                Bypass: true,
                // Curse: "CompletedDroneSet",
                variant: {
                    hexes: [
                        // "DroneSetComplete"
                    ],
                    enchants: [],
                    level: 0,
                    minfloor: 1,
                    powerBonus: 0,
                },
                // faction: 'Dollsmith'
                // faction: 'AncientRobot'
                faction: 'Curse'
            })
        });
    ["TrapPlug3", "RearVibe1", "TrapVibeProto", "NippleClamps3"].forEach(r => {
        KD.AddRestraintIfWeaker_({
            restraint: r,
            Bypass: true,
            // Curse: "CompletedDroneSet",
            // variant: {
            //     hexes: [
            //         // "DroneSetComplete"
            //     ],
            //     enchants: [],
            //     level: 0,
            //     minfloor: 1,
            //     powerBonus: 0,
            // },
            // faction: 'Dollsmith'
            // faction: 'AncientRobot'
            faction: 'Curse'
        })
    })
}

KinkyDungeonStatsPresets["StartDrone"] = {
    startPriority: 10,
    category: "Start",
    id: "StartDrone",
    cost: -3,
    tags: ["start"]
}

KinkyDungeonLoad()
KinkyDungeonLoadStats()