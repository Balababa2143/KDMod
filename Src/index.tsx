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
        DS.DroneMask,
        DS.DroneEarPlug,
        DS.DroneMuzzle
    ]
    .forEach(def => KD.InventoryAddLoose_({
        Name:def.Data.name,
        faction: 'Dollsmith',
        // faction: 'Nevermere',
        UnlockCurse: undefined
    }))
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
        // faction: 'Nevermere'
    };

    ["TrapPlug3", "RearVibe1", "TrapVibeProto"].forEach(r => {
        KD.AddRestraintIfWeaker_({
            restraint: r,
            Lock: "Cyber2"
        })
    });
    // KD.AddRestraintIfWeaker_({restraint: SF.Catsuit.Data.name, ...params, faction: 'AncientRobot'});

    [
        // SF.Visor,
        // SF.MuzzlePluged,
        // SF.EarPlug,
        // SF.MaskOpaque,
        SF.Heel,
        SF.Glove,
        // SF.LongMitten,
        SF.Collar,
        SF.ChastityBelt,
        SF.ChastityBra,
        SF.Harness,
        SF.ArmCuffLinked,
        SF.ThighCuffLinked,
        SF.AnkleCuff,
        // SF.TorsoBelt,
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