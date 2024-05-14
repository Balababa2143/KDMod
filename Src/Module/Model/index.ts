export { DroneSet } from './DroneSet'
export * as LockedGlove from './LockedGlove'

import { Register as RegisterLockedGlove } from './LockedGlove'
import { Register as RegisterCuffLink } from './DroneSet'

export function Register() {
    RegisterLockedGlove()
    RegisterCuffLink()
}
