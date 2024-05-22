import { Definition } from "../KDInterfaceExtended"
import { Helpers, KD } from "."

export function CheckNoDuplicateRestraint(def: Definition){
    return KD.GetRestraintByName(def.Data.name) == null
}

export function RegisterNewRestraint(def: Definition){
    KD.Restraints.push(Helpers.RecordProxy(def.Data))
    KD.AddRestraintText(
        def.Data.name,
        def.InfoText.DisplayName,
        def.InfoText.FlavorText,
        def.InfoText.FunctionText
    )
}