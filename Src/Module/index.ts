export * as Template from './Template'

import { Register as RegisterTemplate} from './Template'
import { Register as RegisterModel} from './Model'

export function Register(){
    RegisterTemplate()
    RegisterModel()
}