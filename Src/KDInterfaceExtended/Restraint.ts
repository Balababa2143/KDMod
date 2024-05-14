import { Record } from "immutable"
import { Property } from "."

export class Restraint extends Record<restraint>({
    ...(Property.Default.toJS() as KDRestraintProps),
    power: 0,
    preview: undefined,
    weight: 0,
    minLevel: 0,
    Color: [],
    tightType: undefined,
    escapeChance: undefined,
    enemyTags: {},
    enemyTagsMult: undefined,
    playerTags: {},
    shrine: [],
    ignoreFloorTags: undefined,
    ignoreMinLevelTags: undefined,
    ignoreMaxLevelTags: undefined,
    ApplyVariants: undefined,
})
{
    constructor(prop?: restraint){
        super(prop)
    }
    static #Default = new Restraint()
    static get Default() { return this.#Default }
}
