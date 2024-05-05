import { RecordOf, Record } from "immutable"
import { DEFAULT } from ".."

type Property = RecordOf<restraint>

namespace Property {
    export function Create(prop: restraint){
        /*
        Record factory get it's shape at runtime, 
        so the factory function will reject any field
        not presented in the default value object.
        It's too much work to write a default object with all fields,
        so we use a new factory every time as a workaround.
        */
        return Record<restraint>(prop)()
    }
    export const Default = Create({
        name: DEFAULT,
        Color: DEFAULT,
        enemyTags: {},
        escapeChance: undefined,
        Group: DEFAULT,
        minLevel: 0,
        playerTags: {},
        power: 0,
        shrine: [],
        weight: 0
    })
}

export default Property