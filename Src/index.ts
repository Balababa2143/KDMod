import { KDInterface as KD } from 'kinkydungeoninterfacewrapper'


import * as Module from './Module'
Module.Register()

declare let KDPerkStart: Record<string, () => void>
KDPerkStart["StartDrone"] = () => {
    Object
    .values(Module.DroneSet.Sensory)
    .forEach(def => KD.InventoryAddLoose(def.Data.name, undefined, 'Curse'))
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