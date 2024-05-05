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
    throw new Error(message, options)
}