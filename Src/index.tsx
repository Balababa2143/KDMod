import { KD } from './Common'

import * as Module from './Module'
Module.Register()
import SF = Module.Template.SciFiSet
import { Helpers } from './Common'
import PixiReact, { Graphics, Stage } from '@pixi/react'
import React, { Children, useCallback, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import * as Pixi from 'pixi.js'

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

interface IButtonProperty {
    Width: number
    Height: number
    Label: string
    Image?: string
    HoveringText?: string
    Disabled?: boolean
    NoBorder?: boolean
    FillColor?: string
    FontSize?: number
    ShiftText?: boolean
    Stretch?: boolean
    zIndex?: number
    options?: { noTextBG?: boolean; alpha?: number; zIndex?: number; unique?: boolean; scaleImage?: boolean; centered?: boolean; centerText?: boolean; tint?: string; hotkey?: string; hotkeyPress?: string; };
}

function Btn(args: IButtonProperty) {
    const draw = useCallback((g: typeof PIXI.Graphics.prototype) =>
        g
            .lineStyle({
                width: 2,
                color: KDBorderColor,
                alpha: 1
            })
            .beginFill(KDButtonColor)
            .drawRect(0, 0, args.Width - 2, args.Height - 2)
            .endFill(),
        []
    )
    return <Graphics draw={draw} />
}
let by = 440;
let bwidth = 140;
let bx = 2000 - 10 - bwidth;
let bspacing = 5;
let bindex = 0;
let bheight = 60;

function ModUI() {
    return (
        <div
            className='ModUIDomRoot'
            style={{
                position: 'absolute',
                top: '0',
                left: '50%',
                transform: 'translate(-50%, 0)',
                width: 'auto',
                height: '100%',
                aspectRatio: '2/1',
                pointerEvents: 'none'
            }}
        >
            <Stage
                width={PIXIWidth}
                height={PIXIHeight}
                options={{
                    antialias: false,
                    powerPreference: 'high-performance',
                    resolution: KDResolutionList[Number(localStorage.getItem("KDResolution") ?? 0)],
                    width: PIXIWidth,
                    height: PIXIHeight,
                    resizeTo: PIXIapp.view as HTMLCanvasElement,
                    backgroundAlpha: 0
                }}
                onMount={(app) => {
                    const canvas = app.view as HTMLCanvasElement
                    Object.assign(canvas.style, {
                        position: 'absolute',
                        top: '0',
                        left: '50%',
                        transform: 'translate(-50%, 0)',
                        // width: 'auto',
                        // height: '100%',
                        // aspectRatio: '2/1',
                        pointerEvents: 'none'
                    } as CSSStyleDeclaration)
                    app.queueResize()
                }}
            >
                <Btn Label='Test' Width={bwidth} Height={bheight} />
            </Stage>
        </div>
    )
}

(() => {
    const gameRoot = document.body
    const ModUIRootElm = document.createElement('div')
    gameRoot.appendChild(ModUIRootElm)
    const ModUIRoot = createRoot(ModUIRootElm)
    // Object.assign(ModUIRootElm.style, {
    //     position: 'absolute',
    //     top: '0',
    //     left: '50%',
    //     transform: 'translate(-50%, 0)',
    //     width: 'auto',
    //     height: '100%',
    //     aspectRatio: '2/1',
    //     pointerEvents: 'none'
    // } as CSSStyleDeclaration)
    ModUIRoot.render(<ModUI />)
})()

// (() =>{
//     const DrawNavBar = globalThis.KDDrawNavBar
//     globalThis.KDDrawNavBar = function(skip, quit = false){
//         DrawNavBar(skip, quit)

//     }
// })()

// function ModUI(){
//     return (
//         <div property=''>

//         </div>
//     )
// }

// (() =>{
//     let by = 440;
// 	let bwidth = 140;
// 	let bx = 2000 - 10 - bwidth;
// 	let bspacing = 5;
// 	let bindex = 0;
// 	let bheight = 60;
//     const newBtn = new Button({
//         Label: 'Test',
//         Width: bwidth,
//         Height: bheight,
//     })
//     PIXIapp.stage.addChild(newBtn)
//     newBtn.button.view.position = {
//         x: bx,
//         y: by + bheight * 4 + bspacing * 4
//     }
//     newBtn.onHover.connect(()=> console.log('Hover'))
//     newBtn.onPress.connect(()=> console.log('Press'))
// })()