import { List, Stack } from "immutable"
import { DEFAULT, RestraintDefinitionManager, RootNamespace } from '../Common'
import { Property, Template } from "../Common/Restraint"

declare let KDMaskLink: string[]

const RestraintPrototypes: List<Template> = List([
    Template.Create({
        QualifiedName: Stack.of('Visor'),
        Property: Property.Create({
            renderWhenLinked: ['TransparentMask'],
            name: DEFAULT,
            inventory: true,
            sfx: "FutureLock",
            accessible: true,
            Asset: "InteractiveVisor",
            Model: "Goggles",
            DefaultLock: "Blue",
            Color: ['#91023a'],
            factionFilters: {
                Goggles: { color: "LightNeutral", override: true }
            },
            Group: "ItemHead", LinkableBy: [...KDVisorLink, ...KDMaskLink],
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
    }),
    Template.Create({
        QualifiedName: Stack.of('Mask'),
        Property: Property.Create({
            inventory: true,
            sfx: "FutureLock",
            name: "DollmakerMask",
            inaccessible: true,
            Model: "FullVisorRim",
            factionColor: [[2]],
            Color: ["#ff5277"],
            factionFilters: {
                FullVisor: { color: "LightNeutral", override: true },
                Rim: { color: "DarkNeutral", override: true }
            },
            Group: "ItemHead",
            Asset: "DroneMask",
            LinkableBy: [...KDMaskLink, ...KDVisorLink],
            power: 39,
            weight: 0,
            escapeChance: { "Struggle": -0.6, "Cut": -1.0, "Remove": 0.5, "Pick": -0.5 },
            maxwill: 0.1,
            enemyTags: {},
            playerTags: {},
            events: [
            ],
            minLevel: 0,
            allFloors: true,
            shrine: ["Masks", "Block_ItemMouth", 'TransparentMask'],
        })
    }),
    Template.Create({
        QualifiedName: Stack.of('BallGag'),
        Property: Property.Create({
            inventory: true,
            sfx: "FutureLock",
            name: DEFAULT,
            debris: "Belts",
            LinkableBy: [...KDBallGagLink],
            renderWhenLinked: [...KDBallGagLink],
            factionFilters: {
                Display: { color: "Highlight", override: false },
                Harness: { color: "DarkNeutral", override: true },
                Strap: { color: "LightNeutral", override: true },
                SideStrap: { color: "LightNeutral", override: true },
                HarnessMask: { color: "DarkNeutral", override: true },
                Mask: { color: "DarkNeutral", override: true },
                HarnessDisplay: { color: "Highlight", override: false },
                HarnessRim: { color: "LightNeutral", override: true },
                Muzzle: { color: "LightNeutral", override: true },
                Ball: { color: "LightNeutral", override: true },
            },
            Model: "SciFiBallGag",
            Asset: "FuturisticHarnessBallGag",
            strictness: 0.35,
            gag: 0.65,
            Color: ['#499ed6', '#b927a8', '#222222', '#FFFFFF', '#000000'],
            Group: "ItemMouth",
            power: 12,
            weight: 0,
            factionColor: [[2], [1], [0]],
            maxwill: 0.75,
            escapeChance: { "Struggle": -0.4, "Cut": -0.2, "Remove": 0.05, "Pick": -0.1 },
            enemyTags: { "cyberdollrestraints": 10 },
            events: [
                { trigger: "beforeStruggleCalc", type: "struggleDebuff", msg: "KDHarnessGagRemoveBlindfold", inheritLinked: true, StruggleType: "Remove", power: 0.35, requiredTag: "Blindfolds" },
                { trigger: "beforeStruggleCalc", type: "struggleDebuff", msg: "KDHarnessGagStruggleBlindfold", inheritLinked: true, StruggleType: "Struggle", power: 0.25, requiredTag: "Blindfolds" },
            ],
            playerTags: {},
            minLevel: 0,
            allFloors: true,
            shrine: ["BallGags", "Gags", "Metal"]
        }),
    }),
    Template.Create({
        QualifiedName: Stack.of('Muzzle'),
        Property: Property.Create({
            inventory: true,
            sfx: "FutureLock",
            name: "CyberMuzzle",
            debris: "Belts",
            LinkableBy: [...KDFlatGagLink],
            renderWhenLinked: [...KDFlatGagLink],
            Model: "AdvancedSciFiMuzzle",
            factionFilters: {
                Display: { color: "Highlight", override: false },
                Harness: { color: "DarkNeutral", override: true },
                Strap: { color: "LightNeutral", override: true },
                SideStrap: { color: "LightNeutral", override: true },
                HarnessMask: { color: "DarkNeutral", override: true },
                Mask: { color: "DarkNeutral", override: true },
                HarnessDisplay: { color: "Highlight", override: false },
                HarnessRim: { color: "LightNeutral", override: true },
                Muzzle: { color: "LightNeutral", override: true },
            },
            inaccessible: true,
            Asset: "FuturisticMuzzle",
            strictness: 0.35,
            gag: 0.5,
            Color: ['#499ed6', '#222222', '#555555', '#FFFFFF', '#000000'],
            Group: "ItemMouth",
            power: 12,
            weight: 0,
            factionColor: [[], [], [0]],
            maxwill: 0.25,
            escapeChance: { "Struggle": -0.25, "Cut": -0.8, "Remove": 0.05, "Pick": -0.25 },
            enemyTags: {},
            events: [
            ],
            playerTags: {},
            minLevel: 9,
            allFloors: true,
            shrine: ["FlatGags", "Gags", "Metal"]
        })
    }),
    Template.Create({
        QualifiedName: Stack.of('Catsuit'),
        Property: Property.Create({
            renderWhenLinked: ["Corsets", "Harnesses", ...KDBindable, "Latex", "Leather", "Metal", "Rope"],
            inventory: true,
            name: DEFAULT,
            inaccessible: true,
            factionColor: [[0]],
            Asset: "SeamlessCatsuit",
            AssetGroup: "Suit",
            Color: ["#3873C3"],
            alwaysAccessible: true,
            Model: "Catsuit",
            Filters: {
                TorsoLower: { "gamma": 2.7666666666666666, "saturation": 1.6833333333333333, "contrast": 0.8, "brightness": 1.5, "red": 0.6333333333333334, "green": 1.1833333333333333, "blue": 2.033333333333333, "alpha": 1 },
                TorsoUpper: { "gamma": 2.7666666666666666, "saturation": 1.6833333333333333, "contrast": 0.8, "brightness": 1.5, "red": 0.6333333333333334, "green": 1.1833333333333333, "blue": 2.033333333333333, "alpha": 1 },
            },
            factionFilters: {
                TorsoLower: { color: "Catsuit", override: true },
                TorsoUpper: { color: "Catsuit", override: true },
            },
            LinkAll: true,
            noDupe: true,
            linkCategory: "Catsuits", linkSize: 0.75,
            restriction: 3,
            Group: "ItemTorso",
            power: 8.5,
            weight: 0,
            escapeChance: { "Struggle": -1.4, "Cut": -0.1, "Remove": 0.025, "unlock": 0.25 },
            DefaultLock: 'Blue',
            enemyTags: {},
            playerTags: {},
            minLevel: 7,
            allFloors: true,
            shrine: ["Latex", "Suits"],
            alwaysDress: [
                { Item: "SeamlessCatsuit", Group: "Suit", Color: ['#3873C3'], override: true, factionColor: [[0]] },
                { Item: "SeamlessCatsuit", Group: "SuitLower", Color: ['#3873C3'], override: true, factionColor: [[0]] },
                { Item: "Catsuit", Group: "Gloves", Color: ['#3873C3'], override: true, factionColor: [[0]] }],
            events: [
                { trigger: "beforeStruggleCalc", type: "latexDebuff", power: 0.25, inheritLinked: true }
            ]
        })
    }),
    Template.Create({
        QualifiedName: Stack.of('Collar'),
        Property: Property.Create({
            inventory: true,
            sfx: "FutureLock",
            name: DEFAULT,
            debris: "Chains",
            accessible: true,
            Asset: "FuturisticCollar",
            Model: "FutureCollar",
            tightType: "Secure",
            factionFilters: {
                Display: { color: "Highlight", override: false },
                Base: { color: "DarkNeutral", override: true },
                Rim: { color: "LightNeutral", override: true },
                Band: { color: "LightNeutral", override: true },
            },
            Color: ['#499ed6', '#555555', '#b927a8', '#000000'],
            factionColor: [[], [2], [0]],
            DefaultLock: "Disc",
            Group: "ItemNeck",
            LinkableBy: [...KDCollarLink],
            renderWhenLinked: [...KDCollarRender],
            power: 9,
            weight: 0,
            escapeChance: { "Struggle": -0.5, "Cut": -0.25, "Remove": 0.33, "Pick": -0.15 },
            maxwill: 0.5,
            enemyTags: {},
            playerTags: { "ItemNeckEmpty": 10 },
            minLevel: 0, allFloors: true, shrine: ["Metal", "Collars", "Cyber"],
        })
    }),
    Template.Create({
        QualifiedName: Stack.of('Harness'),
        Property: Property.Create({
            alwaysRender: true, sfx: "FutureLock",
            inventory: true,
            name: DEFAULT,
            debris: "Chains",
            accessible: true,
            Asset: "FuturisticHarness",
            LinkableBy: [...KDHarnessLink],
            strictness: 0.1,
            Model: "FutureHarness",
            tightType: "Secure",
            harness: true,
            factionFilters: {
                Display: { color: "Highlight", override: false },
                Straps: { color: "LightNeutral", override: true },
                Metal: { color: "DarkNeutral", override: true },
            },
            Color: ['#499ed6', '#555555', '#555555', '#000000'],
            factionColor: [[], [], [0]],
            restriction: 3,
            Group: "ItemTorso",
            power: 10,
            weight: 0,
            escapeChance: { "Struggle": -0.4, "Cut": -0.2, "Remove": 0.4, "Pick": 0.1 },
            DefaultLock: "Blue",
            maxwill: 0.5,
            enemyTags: {},
            playerTags: {},
            minLevel: 7, allFloors: true, shrine: ["Metal", "Harnesses"],
            events: [
            ]
        })
    }),
    Template.Create({
        QualifiedName: Stack.of('Glove'),
        Property: Property.Create({
            inventory: true,
            unlimited: true,
            name: DEFAULT,
            Model: "LockedGlove",
            tightType: "Secure",
            factionFilters: {
                GloveBody: { color: "LightNeutral", override: true },
                Mitten: { color: "LightNeutral", override: true },
                Band: { color: "Highlight", override: true },
                Lock: { color: "DarkNeutral", override: true },
            },
            factionColor: [[], [], [0]],
            Asset: "LatexElbowGloves",
            Color: "#ff5277",
            LinkableBy: [...KDGlovesLink],
            renderWhenLinked: ["Mittens"],
            Group: "ItemHands",
            bindhands: 0.3,
            power: 10,
            weight: 0,
            escapeChance: { "Struggle": -0.4, "Cut": -0.2, "Remove": 0.05, "Pick": -0.1, "Unlock": 0.2 },
            maxwill: 0.4,
            enemyTags: {},
            playerTags: { "ItemHandsFull": -2 },
            minLevel: 0,
            allFloors: true,
            shrine: ["Metal", "Mittens"]
        })
    }),
    Template.Create({
        QualifiedName: Stack.of('Heel'),
        Property: Property.Create({
            inventory: true,
            sfx: "FutureLock",
            name: DEFAULT,
            inaccessible: true,
            Asset: "FuturisticHeels2",
            remove: ["Shoes"],
            Model: "CyberBalletHeels",
            factionFilters: {
                Glow: { color: "Highlight", override: true },
                Shoe: { color: "LightNeutral", override: true },
            },
            factionColor: [[0], [4], [1]],
            Color: ["#222222", "#499ed6", "#ffffff", "Default", "#b927a8", "#222222", "#000000"],
            Group: "ItemBoots",
            heelpower: 2,
            power: 10,
            weight: 0,
            escapeChance: { "Struggle": -0.4, "Cut": -0.35, "Remove": 0.2, "Pick": -0.25, "Unlock": 0.2 },
            maxwill: 0.25, enemyTags: { "cyberdollrestraints": 10 },
            events: [
            ],
            playerTags: {},
            minLevel: 0,
            allFloors: true,
            shrine: ["Metal", "Boots"]
        })
    }),
    Template.Create({
        QualifiedName: Stack.of('TorsoBelt'),
        Property: Property.Create({
            alwaysRender: true,
            sfx: "FutureLock",
            inventory: true,
            name: DEFAULT,
            debris: "Chains",
            accessible: true,
            Asset: "",
            LinkableBy: [...KDHarnessLink],
            strictness: 0.1,
            Model: "NeoCyberBelt",
            tightType: "Secure",
            harness: true,
            factionFilters: {
                Display: { color: "Highlight", override: false },
                Screen: { color: "LightNeutral", override: true },
                BaseMetal: { color: "DarkNeutral", override: true },
                Lock: { color: "DarkNeutral", override: true },
            },
            Color: ['#499ed6', '#555555', '#555555', '#000000'],
            factionColor: [[], [], [0]],
            restriction: 3,
            Group: "ItemTorso", power: 10, weight: 0,
            escapeChance: { "Struggle": -0.4, "Cut": -0.2, "Remove": 0.4, "Pick": 0.1, "Unlock": 0.3 },
            DefaultLock: "Blue",
            maxwill: 0.5,
            enemyTags: {},
            playerTags: {},
            minLevel: 7, allFloors: true, shrine: ["Metal"],
            events: [
            ]
        })
    }),
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