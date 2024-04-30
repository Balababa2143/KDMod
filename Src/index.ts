import { KDInterface as KD } from 'kinkydungeoninterfacewrapper'

KD.Restraints.push({
    inventory: true,
    sfx: "FutureLock",
    name: "DroneVisor",
    accessible: true,
    Asset: "InteractiveVisor",
    Model: "Goggles",
    DefaultLock: "Blue",
    Color: ['#91023a'],
    Group: "ItemHead", LinkableBy: [...KDVisorLink],
    power: 40,
    weight: 0,
    escapeChance: { "Struggle": -0.6, "Cut": -1.0, "Remove": 0.5, "Pick": -0.5 },
    maxwill: 0.1,
    enemyTags: {},
    playerTags: {},
    events: [
    ],
    minLevel: 0,
    allFloors: true,
    shrine: ["Visors"],
})

declare let KDPrereqs: Record<string, (enemy: string, e:KinkyDungeonEvent, data: any) => boolean>

KDPrereqs["DroneSetComplete"] = (enemy, e, data) => {
    return true
}

KDEventHexModular["DroneSetComplete"] = {
    level: 1,
    weight: (item, allHex, data) => {
        return 0;
    },
    events: (data) => [
        { trigger: "drawSGTooltip", type: "curseInfo", prereq: "DroneSetComplete", msg: "Punish", color: "#ff5555", inheritLinked: true, original: "CompletedDroneSet" },
        { trigger: "drawBuffIcons", type: "curseInfo", prereq: "DroneSetComplete", msg: "Punish", color: "#ff5555", inheritLinked: true, original: "CompletedDroneSet" },
    ]
}

KDCurses["CompletedDroneSet"] = {
    powerMult: 4,
    lock: true,
    level: 15,
    activatecurse: true,
    weight: (item) => {
        return 1;
    },
    condition: (item) => {
        return false;
    },
    events: [
        { type: "DroneRemove", trigger: "postUnlock", kind: "CompletedDroneSet" }
    ],
    remove: (item, host) => {
    }
}

KinkyDungeonRestraints.push(...[
    {
        inventory: true,
        sfx: "FutureLock",
        name: "DroneVisor",
        accessible: true,
        Asset: "InteractiveVisor",
        Model: "Goggles",
        DefaultLock: "Blue",
        Color: ['#91023a'],
        Group: "ItemHead", LinkableBy: [...KDVisorLink],
        power: 40,
        weight: 0,
        escapeChance: { "Struggle": -0.6, "Cut": -1.0, "Remove": 0.5, "Pick": -0.5 },
        maxwill: 0.1,
        enemyTags: {},
        playerTags: {},
        events: [
        ],
        minLevel: 0,
        allFloors: true,
        shrine: ["Visors"],
    }
])

KDEventMapInventory["postUnlock"]["DroneRemove"] = (e, item, data) => {
    if (item && e.kind && KDCurses[e.kind].condition(item)) {
        const r = KDRestraint(item)
        let inventoryAs = item.inventoryVariant || item.name || (r.inventoryAs);
        item.curse = undefined;
        if (inventoryAs && KinkyDungeonRestraintVariants[inventoryAs]) {
            KinkyDungeonRestraintVariants[inventoryAs].curse = undefined;
            KinkyDungeonSendTextMessage(1, 'KinkyDungeonRestraintVariants[inventoryAs].curse = undefined', "#88ff88", 1, false, true);
        }
        KinkyDungeonLock(item, r.DefaultLock ?? 'Red');
        KinkyDungeonSendTextMessage(1, 'KDEventMapInventory["postUnlock"]["DroneRemove"]', "#88ff88", 1, false, true);
    }
}

declare let KDPerkStart: Record<string, () => void>

KDPerkStart["StartDrone"] = () => {
    [
        "DroneVisor"
    ].forEach(restraintName => {
        KD.AddRestraintIfWeaker_({
            restraint: restraintName,
            Tightness: 2,
            Bypass: true,
            Curse: "CompletedDroneSet",
            variant:{
                hexes:[
                    "DroneSetComplete"
                ],
                enchants: [],
                level: 0,
                minfloor: 1,
                powerBonus: 0
            }
        })
    });
}

KinkyDungeonStatsPresets["StartDrone"] = {
    startPriority: 10,
    category: "Start",
    id: "StartDrone",
    cost: -2,
    tags: ["start"]
}

KinkyDungeonLoad()
KinkyDungeonLoadStats()