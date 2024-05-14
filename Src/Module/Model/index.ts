export * as DroneCuff from './DroneCuffs'
export * as LockedGlove from './LockedGlove'
export * as EarPlug from './EarPlug'

import { Register as RegisterLockedGlove } from './LockedGlove'
import { Register as RegisterCuffLink } from './DroneCuffs'
import { Register as RegiserEarPlug } from './EarPlug'

export function Register() {
    RegisterLockedGlove()
    RegisterCuffLink()
    RegiserEarPlug()
}
