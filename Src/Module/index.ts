export * as Model from './Model'
export * as Template from './Template'
export * as DroneSet from './DroneSet'

import { Register as RegisterModel} from './Model'
import { Register as RegisterTemplate} from './Template'
import { Register as RegisterDroneSet} from './DroneSet'

export function Register(){
    RegisterModel()
    RegisterTemplate()
    RegisterDroneSet()
}