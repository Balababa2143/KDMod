import { KD } from './Common'

import * as Module from './Module'
Module.Register()
import SF = Module.Template.SciFiSet
import { Helpers } from './Common'
import { CreateModUIRoot, GUI, InteractiveElementClass } from './KDInterfaceExtended/GUI'

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
(() => {
    let by = 440;
    let bwidth = 140;
    let bx = 2000 - 10 - bwidth;
    let bspacing = 5;
    let bindex = 0;
    let bheight = 60;
    const modUIRoot = CreateModUIRoot()
    function GetRelativeLength(relativeTo: number){
        return (length: number) =>{
            const relLen = length / relativeTo * 100
            return `${relLen.toFixed(5)}%`
        }
    }
    const GetRelHorizontal = GetRelativeLength(PIXIWidth)
    const GetRelVertical = GetRelativeLength(PIXIHeight)
    modUIRoot.render(
        <GUI>
            <div
                className={InteractiveElementClass}
                style={{
                    width: GetRelHorizontal(bwidth),
                    height: GetRelVertical(bheight),
                    border: 'solid',
                    color: KDBorderColor,
                    position: 'absolute',
                    right: GetRelHorizontal(10),
                    top: GetRelVertical(by)
                }}
                onMouseOver={e => console.log('mouse over')}
                onClick={e => console.log('click')}
            >
            </div>
        </GUI>
    )
})()