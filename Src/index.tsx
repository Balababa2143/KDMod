import { KD } from './Common'

import * as Module from './Module'
import SF = Module.Template.SciFiSet
import DC = Module.DroneSet.Controller.Equipments
import DS = Module.DroneSet.Sensory.Equipments
import { CreateModUIRoot, GUI } from './KDInterfaceExtended/GUI'
import React from 'react'
import { ControlPanel } from './Module/CyberDrone/UI'

declare let KDPerkStart: Record<string, () => void>
KDPerkStart["StartDrone"] = () => {
    [
        DC.Visor,
        DS.DroneMask,
        DS.DroneEarPlug,
        DS.DroneMuzzle
    ]
    .forEach(def => KD.InventoryAddLoose(def.Data.name, undefined, 'Curse'))
}

KDPerkStart["StartScifi"] = () => {
    [
        // SF.Visor,
        // SF.MuzzleStuffedBall,
        // SF.EarPlug,
        // SF.MaskOpaque,
        SF.Catsuit,
        SF.Heel,
        SF.Glove,
        SF.Collar,
        SF.ChastityBelt,
        SF.ChastityBraBig,
        SF.Harness,
        SF.ArmCuffLinked,
        SF.ThighCuffLinked,
        SF.AnkleCuffLinked,
        SF.TorsoBelt,
        // SF.StraightJacket,
    ]
        .forEach(def => {
            KD.AddRestraintIfWeaker_({
                restraint: def.Data.name,
                Bypass: true,
                Deep: true,
                variant: {
                    hexes: [],
                    enchants: [],
                    level: 0,
                    minfloor: 1,
                    powerBonus: 0,
                },
                // faction: 'Dollsmith'
                // faction: 'AncientRobot'
                faction: 'Curse'
                // faction: 'Goddess'
            })
        });
    ["TrapPlug3", "RearVibe1", "TrapVibeProto", "NippleClamps3"].forEach(r => {
        KD.AddRestraintIfWeaker_({
            restraint: r,
            Bypass: true,
        })
    })
}

KinkyDungeonStatsPresets["StartDrone"] = {
    startPriority: 10,
    category: "Start",
    id: "StartDrone",
    cost: -1,
    tags: ["start"]
}

KinkyDungeonStatsPresets["StartScifi"] = {
    startPriority: 10,
    category: "Start",
    id: "StartScifi",
    cost: -3,
    tags: ["start"]
};

(() => {
    const modUIRoot = CreateModUIRoot()
    modUIRoot.render(
        <GUI>
            <ControlPanel />
        </GUI>
    )
})()