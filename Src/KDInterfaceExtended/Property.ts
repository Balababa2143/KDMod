import { Record } from "immutable"
import { PropertyBase } from "./"
import { DEFAULT } from "../Common"
import { PropertyBaseData } from "./PropertyBase"

export type PropertyData =
    Omit<KDRestraintProps, keyof PropertyBaseData> &
    PropertyBaseData

export class Property extends Record<KDRestraintProps>({
    ...PropertyBase.Default.toJS() as KDRestraintPropsBase,
    name: DEFAULT,
    Group: DEFAULT,
})
{
    constructor(prop?: PropertyData){
        super(prop)
    }
    static #Default = new Property()
    static get Default() { return this.#Default }
}