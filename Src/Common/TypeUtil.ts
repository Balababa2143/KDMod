export type RequireExactlyOne<T, Keys extends keyof T = keyof T> =
    {
        [k in Keys]-?:
        Required<Pick<T, k>> &
        Partial<Record<Exclude<Keys, k>, never>>
    }[Keys]

export type NotBoth<T, Keys extends keyof T = keyof T> =
    {
        [k in Keys]-?:
        Partial<Pick<T, k>> &
        Partial<Record<Exclude<Keys, k>, never>>
    }[Keys]