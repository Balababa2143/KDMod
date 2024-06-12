import *  as React from 'react'
import { KDButton } from '../../../KDInterfaceExtended/GUI'

export interface IControlPanelState {
    Show: boolean
}

export interface IControlPanelContext {
    State: IControlPanelState
    SetState: React.Dispatch<React.SetStateAction<IControlPanelState>>
}

export const ControlPanelContext = React.createContext<IControlPanelContext>(null!)

export function ControlPanel() {
    const [State, SetState] = React.useState({
        Show: true
    } as IControlPanelState)
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
            >
                <ControlPanelContext.Provider value={{State, SetState}}>
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
                                    SetState({
                                        ...State,
                                        Show: false
                                        })
                                }}            
                            >
                                <span
                                    style={{
                                        pointerEvents: 'none',
                                        color: 'greenyellow'
                                    }}
                                    dangerouslySetInnerHTML={{
                                        __html: '&cross;'
                                    }}
                                />
                            </KDButton>
                        </div>
                    </div>
                </ControlPanelContext.Provider>
            </div>
        )
    }
    else {
        return <></>
    }
}