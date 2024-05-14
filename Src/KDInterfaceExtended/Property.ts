import { Record } from "immutable"
import { PropertyBase } from "./"
import { DEFAULT } from "../Common"

export class Property extends Record<KDRestraintProps>({
    ...PropertyBase.Default.toJS() as KDRestraintPropsBase,
    name: DEFAULT,
    Group: DEFAULT,
})
{
    constructor(prop?: KDRestraintProps){
        super(prop)
    }
    static #Default = new Property()
    static get Default() { return this.#Default }
}