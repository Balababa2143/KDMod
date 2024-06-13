import { Definition } from "../KDInterfaceExtended"
import { Helpers, KD, KDVar } from "."

export function CheckNoDuplicateRestraint(def: Definition){
    return KD.GetRestraintByName(def.Data.name) == null
}

export function RegisterNewRestraint(def: Definition){
    KDVar.Restraints.push(def.Data.toJS() as restraint)
    KD.AddRestraintText(
        def.Data.name,
        def.InfoText.DisplayName,
        def.InfoText.FlavorText,
        def.InfoText.FunctionText
    )
}