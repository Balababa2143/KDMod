import { RecordOf } from "immutable"
import { Throw } from "./Helpers"

export const ProxyTarget = Symbol('ProxyTarget')

export function CreateProxy<T extends object>(record: RecordOf<T>): Readonly<T>{
    return new Proxy(record, {
        get(target, p, receiver) {
            if(p === ProxyTarget){
                return target
            }
            else if(typeof p === 'string' && target.has(p)){
                return target.get(p)
            }
            else{
                return undefined
            }
        },
        set(target, p, newValue, receiver) {
            Throw('Set immutable object')
        },
    })
}