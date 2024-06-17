import *  as React from 'react'
import { InteractiveElementClass, KDButton } from '../../../KDInterfaceExtended/GUI'
import { KD, KDVar, RootNamespace } from '../../../Common'
import { EquipmentCategory as Category } from '../Constants'
import { MorphEquipment } from '../Sensory/Events/MorphEquipment'

export interface IControlPanelState {
    Show: boolean
}

export interface IControlPanelContext {
    State: IControlPanelState
    SetState: React.Dispatch<React.SetStateAction<IControlPanelState>>
}

const Context = React.createContext<IControlPanelContext>(null!)

let DoShow = () => {}
let isShowing = false

// TODO: Fix mask swap logic

export function ControlPanel() {
    const [State, SetState] = React.useState({
        Show: false
    } as IControlPanelState)
    DoShow = () =>{
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
                onClick={e => {e.stopPropagation()}}
            >
                <Context.Provider value={{State, SetState}}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row-reverse'
                        }}>
                            <KDButton
                                onClick={e => {SetState({...State,Show: false})
                                }}            
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
                            flexDirection: 'row'
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
                                <span style={{pointerEvents: 'none', color: 'aqua'}}>Toggle mask</span>
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
                                <span style={{pointerEvents: 'none', color: 'aqua'}}>Toggle muzzle</span>
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
    export function Show(){
        DoShow()
    }
}

// Register
const OldDrawNavBar = globalThis.KDDrawNavBar
globalThis.KDDrawNavBar = function(skip: number, quit = false){
    OldDrawNavBar(skip, quit)
    if(!ControlPanel.IsShowing){
        const by = 440
        const bwidth = 140
        const bx = (2000 - 10 - bwidth)
        const bspacing = 5
        const bheight = 60
        if(KDVar.PlayerTags.get(Category.FullName)){
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
                func: (_) => {ControlPanel.Show(); return true}
            })
        }
    }
}