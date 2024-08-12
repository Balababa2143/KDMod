import { KD } from './Common'

import * as Module from './Module'
import SF = Module.Template.SciFiSet
import DC = Module.DroneSet.Controller.Equipments
import DS = Module.DroneSet.Sensory.Equipments
import { CreateModUIRoot, GUI } from './KDInterfaceExtended/GUI'
import React from 'react'
import { ControlPanel } from './Module/CyberDrone/UI/ControlPanel'

declare let KDPerkStart: Record<string, () => void>
KDPerkStart["StartDrone"] = () => {
    [
        DC.Visor,
        DS.DroneMask,
        DS.DroneEarPlug,
        DS.DroneMuzzle
    ]
    .forEach(def => KD.InventoryAddLoose(def.Data.name, undefined, 'Dollsmith'))
}

KDPerkStart["StartScifi"] = () => {
    const params: Partial<KD.IAddRestraintIfWeakerParameters> = {
        Bypass: true,
        Deep: true,
        variant: {
            hexes: [],
            enchants: [],
            level: 0,
            minfloor: 1,
            powerBonus: 0,
        },
        Lock: "Cyber3",
        faction: 'Dollsmith'
        // faction: 'AncientRobot'
        // faction: 'Curse'
        // faction: 'Goddess'
    };

    ["TrapPlug3", "RearVibe1", "TrapVibeProto", "NippleClamps3", "NippleWeights"].forEach(r => {
        KD.AddRestraintIfWeaker_({
            restraint: r,
            Lock: "Cyber2"
        })
    })
    KD.AddRestraintIfWeaker_({restraint: SF.Catsuit.Data.name, ...params, faction: 'AncientRobot'});

    [
        // SF.Visor,
        SF.MuzzlePluged,
        // SF.EarPlug,
        // SF.MaskOpaque,
        SF.Heel,
        SF.Glove,
        // SF.LongMitten,
        SF.Collar,
        SF.ChastityBelt,
        SF.ChastityBra,
        SF.Harness,
        SF.ArmCuffWristTie,
        SF.ThighCuffLinked,
        SF.AnkleCuffLinked,
        SF.TorsoBelt,
        // SF.StraightJacket,
    ]
    .forEach(def => {
        KD.AddRestraintIfWeaker_({restraint: def.Data.name, ...params})
    });
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