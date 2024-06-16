import { Curse, CurseEntry } from "../../../KDInterfaceExtended"

import { EquipmentCategory } from "../Constants"
import Category = EquipmentCategory
import SubGetFullName = Category.SubGetFullName
import { Helpers } from "../../../Common"

// Using curse as lock for now
// TODO: create custom lock
export const DroneLock: CurseEntry = CurseEntry({
    Name: SubGetFullName(() => DroneLock),
    Curse: Curse({
        powerMult: 1,
        lock: true,
        level: 0,
        weight: (item) => {
            return 1
        },
        condition: (item) => false,
        remove: (item, host) => {

        }
    })
})

//#region Register
Helpers.RegisterModule(
    `${Category.FullName}.${DroneLock.Name}Registered`,
    () => {
        CurseEntry.Register(DroneLock)
    }
)
//#endregion