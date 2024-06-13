import { RecordOf } from "immutable"

export function DeepFreezeInplace<T>(obj: T): Readonly<T> {
    if (Object.isFrozen(obj)) {
        return obj
    }
    else {
        for (const key of Reflect.ownKeys(obj!)) {
            const value = obj![key as keyof typeof obj]
            if (value && !Object.isFrozen(value)) {
                DeepFreezeInplace(value)
            }
        }
        return Object.freeze(obj)
    }
}

export function DeepFreezeClone<T>(obj: T): Readonly<T> {
    if (Object.isFrozen(obj)) {
        return obj!
    }
    // else: obj is not null, undefined, or primitive
    else {
        const newObj = Object.getPrototypeOf(obj!).constructor() as T
        for (const key of Reflect.ownKeys(obj!) as (keyof T)[]) {
            const value = obj[key]
            const newValue =
                (value && !Object.isFrozen(value)) ?
                    DeepFreezeClone(value) as typeof value :
                    value
            newObj[key] = newValue
        }
        return Object.freeze(newObj)
    }
}

export function Throw(message?: string, options?: ErrorOptions): never {
    const err = new Error(message, options)
    console.error(err)
    throw err
}

export function ThrowIfNull<T>(
    obj: T | undefined | null,
    message: string = 'NullReference',
    options: ErrorOptions = { cause: { errorType: 'NullReferenceError' } }
): asserts obj is T {
    if (null == obj) {
        Throw(message, options)
    }
}

export function ThrowIfNullOrEmpty<T extends string>(
    str: T | undefined | null,
    message: string = 'EmptyString',
    options: ErrorOptions = { cause: { errorType: 'EmptyStringError' } }
): asserts str is T {
    ThrowIfNull(str)
    if('' === str){
        Throw(message, options)
    }
}

export function ThrowIfNullOrEmptyOrWhiteSpace<T extends string>(
    str: T | undefined | null,
    message: string = 'EmptyString',
    options: ErrorOptions = { cause: { errorType: 'EmptyStringError' } }
): asserts str is T {
    ThrowIfNullOrEmpty(str)
    if('' === str.trim()){
        Throw(message, options)
    }
}

export function NameOf<T>(nameLambda: () => T) {
    return nameLambda.toString().replace(/[ |\(\)=>]/g, '')
}