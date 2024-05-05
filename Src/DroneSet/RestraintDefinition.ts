import { List, Stack } from "immutable"
import { DEFAULT, RestraintDefinitionManager, RootNamespace } from '../Common'
import { Property, Template } from "../Common/Restraint"

const RestraintPrototypes: List<Template> = List([
    Template.Create({
        QualifiedName: Stack.of('Visor'),
        Property: Property.Create({
            name: DEFAULT,
            inventory: true,
            sfx: "FutureLock",
            accessible: true,
            Asset: "InteractiveVisor",
            Model: "Goggles",
            DefaultLock: "Blue",
            Color: ['#91023a'],
            Group: "ItemHead", LinkableBy: [...KDVisorLink],
            power: 40,
            weight: 0,
            escapeChance: { "Struggle": -0.6, "Cut": -1.0, "Remove": 0.5, "Pick": -0.5 },
            maxwill: 0.1,
            enemyTags: {},
            playerTags: {},
            events: [
            ],
            minLevel: 0,
            allFloors: true,
            shrine: ["Visors"]
        })
    })
])

export const DroneSet =
    RestraintPrototypes
    .map(t => t.set('QualifiedName', t.QualifiedName.push(RootNamespace, 'DroneSet')))
    .map(Template.ToDefinition)

export function Register(manager: RestraintDefinitionManager) {
    console.log('RestraintPrototypes', RestraintPrototypes.toJS())
    console.log('DroneSet', DroneSet.toJS())
    manager.Add(DroneSet)
    manager.Commit()
}