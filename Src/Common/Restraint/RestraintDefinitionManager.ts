import { KDInterface as KD } from 'kinkydungeoninterfacewrapper'
import { Seq, Map } from 'immutable'
import { Helpers } from "..";
import { Definition } from "../Restraint";

export default class RestraintDefinitionManager {
    #Restraints: Map<string, Definition> = Map()
    public Add(restraints: Iterable<Definition>) {
        const newRestraints =
            Seq(restraints)
                .groupBy(r => r.Property.name)
                .map(r => r.first() ?? Helpers.Throw('Empty sequence'))
        if (newRestraints.some((_, name) => this.#Restraints.has(name))) {
            Helpers.Throw("Name conflict")
        }
        else {
            this.#Restraints = this.#Restraints.merge(newRestraints)
        }
        return this
    }

    public Commit() {
        for (const restraint of this.#Restraints.values()) {
            KD.Restraints.push(restraint.Property.toObject())
            KD.AddRestraintText(
                restraint.Property.name,
                restraint.InfoText.DisplayName,
                restraint.InfoText.FlavorText,
                restraint.InfoText.FunctionText
            )
        }
        return this
    }
}