export type RequireExactlyOne<T, Keys extends keyof T = keyof T> =
    Omit<T, Keys> &
    {
        [k in Keys]-?:
        Required<Pick<T, k>> &
        Partial<Record<Exclude<Keys, k>, never>>
    }[Keys]

export type NotBoth<T, Keys extends keyof T = keyof T> =
    Omit<T, Keys> &
    {
        [k in Keys]-?:
        Required<Pick<T, k>> &
        Partial<Record<Exclude<Keys, k>, never>>
    }[Keys]