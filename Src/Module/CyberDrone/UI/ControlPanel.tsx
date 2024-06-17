import *  as React from 'react'
import { HideOverflowTextClass, InteractiveElementClass, KDButton, KDTexEx } from '../../../KDInterfaceExtended/GUI'
import { KD, KDVar, RootNamespace } from '../../../Common'
import { EquipmentCategory as Category } from '../Constants'
import { MorphEquipment } from '../Sensory/Events/MorphEquipment'
import { Container, Sprite } from '@pixi/react'
import { PixiContainerElm } from '../../../KDInterfaceExtended/GUI/PixiContainerElm'

export interface IControlPanelState {
    Show: boolean
}

export interface IControlPanelContext {
    State: IControlPanelState
    SetState: React.Dispatch<React.SetStateAction<IControlPanelState>>
}

const Context = React.createContext<IControlPanelContext>(null!)

let DoShow = () => { }
let isShowing = false

const StopMouseEventPropagation: React.MouseEventHandler<HTMLElement> =
    (e) => e.stopPropagation()

export function ControlPanel() {
    const [State, SetState] = React.useState({
        Show: false
    } as IControlPanelState)
    DoShow = () => {
        SetState({
            ...State,
            Show: true
        })
    }
    isShowing = State.Show
    if (State.Show) {
        return (
            <div
                style={{
                    width: '13%',
                    height: '33%',
                    position: 'absolute',
                    right: '0.2%',
                    top: '40%',
                    border: 'solid',
                    borderWidth: 'thin',
                    borderColor: 'darkblue',
                    display: 'block',
                    // backgroundColor: 'black'
                }}
                className={InteractiveElementClass}
                onClick={StopMouseEventPropagation}
                onDoubleClick={StopMouseEventPropagation}
            >
                <Context.Provider value={{ State, SetState }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row-reverse'
                        }}>
                            <KDButton
                                onClick={e => {
                                    SetState({ ...State, Show: false })
                                }}
                                style={{flex: 0, overflow: 'inherit'}}
                            >
                                <span
                                    style={{
                                        pointerEvents: 'none',
                                        color: 'aqua'
                                    }}
                                    dangerouslySetInnerHTML={{
                                        __html: '&cross;'
                                    }}
                                />
                            </KDButton>
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center space-between'
                        }}>
                            <KDButton
                                onClick={e => {
                                    KD.SendInventoryEvent(
                                        MorphEquipment.EventName,
                                        {
                                            TargetEquipment: Category.Sensory.EquipmentTag.Mask
                                        } as MorphEquipment.EventData
                                    )
                                    KinkyDungeonAdvanceTime(1, true)
                                    KinkyDungeonMultiplayerUpdate(KinkyDungeonNextDataSendTimeDelay)
                                }}
                            >
                                <span style={{ pointerEvents: 'none', color: 'aqua' }}>Toggle mask</span>
                            </KDButton>
                            <KDButton
                                onClick={e => {
                                    KD.SendInventoryEvent(
                                        MorphEquipment.EventName,
                                        {
                                            TargetEquipment: Category.Sensory.EquipmentTag.Gag
                                        } as MorphEquipment.EventData
                                    )
                                    KinkyDungeonAdvanceTime(1, true)
                                    KinkyDungeonMultiplayerUpdate(KinkyDungeonNextDataSendTimeDelay)
                                }}
                            >
                                <PixiContainerElm style={{flex: '0 0 25%'}}>
                                    <Sprite texture={KDTexEx(KD.Variables.RootDirectory + 'UI/Console.png')!} />
                                </PixiContainerElm>
                                <div className={HideOverflowTextClass} style={{flex: '0 0 75%', color: 'aqua'}}>
                                    Muzzle
                                </div>
                                
                            </KDButton>
                        </div>
                    </div>
                </Context.Provider>
            </div>
        )
    }
    else {
        return <></>
    }
}

Object.defineProperty(ControlPanel, 'Context', {
    get() {
        return Context
    },
})

Object.defineProperty(ControlPanel, 'IsShowing', {
    get() {
        return isShowing
    },
})

export declare class ControlPanel {
    static get Context(): IControlPanelContext
    static get IsShowing(): boolean
}

export namespace ControlPanel {
    export function Show() {
        DoShow()
    }
}

// Register
const OldDrawNavBar = globalThis.KDDrawNavBar
globalThis.KDDrawNavBar = function (skip: number, quit = false) {
    if (!ControlPanel.IsShowing) {
        OldDrawNavBar(skip, quit)
        const by = 440
        const bwidth = 140
        const bx = (2000 - 10 - bwidth)
        const bspacing = 5
        const bheight = 60
        if (KDVar.PlayerTags.get(Category.FullName)) {
            KD.DrawButtonKDEx_({
                name: `${RootNamespace}.UI.ControlPanelButton`,
                Left: bx,
                Top: by + (bheight + bspacing) * 4,
                Width: bwidth,
                Height: bheight - 10,
                Label: 'Control',
                FontSize: 24,
                ShiftText: true,
                Image: KD.Variables.RootDirectory + 'UI/Console.png',
                Color: '#ffffff',
                enabled: true,
                func: (_) => { ControlPanel.Show(); return true }
            })
        }
    }
}