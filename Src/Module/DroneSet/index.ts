export * from './Sensory'

import { Register as RegisterSensory } from "./Sensory"

export * from './Constants'

export function Register(){
    RegisterSensory()
}