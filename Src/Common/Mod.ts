import { Definition } from "../KDInterfaceExtended"
import { KDInterface as KD } from 'kinkydungeoninterfacewrapper'

export function CheckNoDuplicateRestraint(def: Definition){
    return KD.GetRestraintByName(def.Data.name) == null
}

export function RegisterNewRestraint(def: Definition){
    KD.Restraints.push(def.Data.toJS() as restraint)
    KD.AddRestraintText(
        def.Data.name,
        def.InfoText.DisplayName,
        def.InfoText.FlavorText,
        def.InfoText.FunctionText
    )
}