import { KD } from './Common'

import * as Module from './Module'
Module.Register()
import SF = Module.Template.SciFiSet
import { Helpers } from './Common'
import { Button } from './KDInterfaceExtended/UI/Button'
import { Layout } from '@pixi/layout'

declare let KDPerkStart: Record<string, () => void>
KDPerkStart["StartDrone"] = () => {
    Object
    .values(Module.DroneSet.Sensory)
    .forEach(def => KD.InventoryAddLoose(def.Data.name, undefined, 'Curse'))
}

KDPerkStart["StartScifi"] = () => {
    [
        SF.Visor,
        SF.MuzzleStuffedBall,
        SF.EarPlug,
        SF.Mask,
        SF.Catsuit,
        SF.Heel,
        SF.Glove,
        SF.Collar,
        SF.ChastityBelt,
        SF.ChastityBra,
        SF.Harness,
        SF.ArmCuffLinked,
        SF.ThighCuff,
        SF.AnkleCuff,
        SF.TorsoBelt,
        SF.StraightJacket,
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
    let cuff = KD.AllRestraint().find(r => r.name === SF.ThighCuff.Data.name) ?? Helpers.Throw('Cuff not found')
    KDMorphToInventoryVariant(
        cuff,
        {
            template: SF.ThighCuffLinked.Data.name,
            events: []
        },
        '',
        ''
    )
    cuff = KD.AllRestraint().find(r => r.name === SF.AnkleCuff.Data.name) ?? Helpers.Throw('Cuff not found')
    KDMorphToInventoryVariant(
        cuff,
        {
            template: SF.AnkleCuffLinked.Data.name,
            events: []
        },
        '',
        ''
    )
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

// (() =>{
//     const DrawNavBar = globalThis.KDDrawNavBar
//     globalThis.KDDrawNavBar = function(skip, quit = false){
//         DrawNavBar(skip, quit)

//     }
// })()

(() =>{
    let by = 440;
	let bwidth = 140;
	let bx = 2000 - 10 - bwidth;
	let bspacing = 5;
	let bindex = 0;
	let bheight = 60;
    const newBtn = new Button({
        Label: 'Test',
        Width: bwidth,
        Height: bheight,
    })
    kdcanvas.addChild(newBtn)
    newBtn.button.view.position = {
        x: bx,
        y: by + bheight * 4 + bspacing * 4
    }
})()