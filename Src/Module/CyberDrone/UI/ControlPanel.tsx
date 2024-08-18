import *  as React from 'react'
import { InteractiveElementClass, KDButton } from '../../../KDInterfaceExtended/GUI'
import { KD, RootNamespace } from '../../../Common'
import { EquipmentCategory as Category, ItemTags } from '../Constants'
import { MorphEquipment } from '../Events'

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
                    backgroundColor: 'black'
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
                            justifyContent: 'center space-between',
                            color: 'white'
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
                                Mask
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
                                Muzzle
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

function CanShowControlButton(equipmentTag: string, controllerTag: string){
    if(KD.Var.PlayerTags.get(equipmentTag)){
        if(KD.IsHandsBound() || KD.IsArmsBound()){
            return KD.Var.PlayerTags.get(controllerTag) != null
        }
        else{
            return true
        }
    }
    else{
        return false
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
        if (CanShowControlButton(ItemTags.CyberDrone.Equipment, ItemTags.CyberDrone.Controller)) {
            KD.DrawButtonKDEx_({
                name: `${RootNamespace}.UI.ControlPanelButton`,
                Left: bx,
                Top: by + (bheight + bspacing) * 4,
                Width: bwidth,
                Height: bheight - 10,
                Label: 'Control',
                FontSize: 24,
                ShiftText: true,
                Image: KD.Var.RootDirectory + 'UI/Console.png',
                Color: '#ffffff',
                enabled: true,
                func: (_) => { ControlPanel.Show(); return true }
            })
        }
    }
}