import { Seq, Stack } from "immutable"
import { DEFAULT, RestraintDefinitionManager, RootNamespace } from '../Common'
import { Definition, Property, Template } from "../Common/Restraint"
import { CuffLink, CuffLink as DroneCuff } from "../Model"

declare let KDMaskLink: string[]

export namespace Prototype {
    export const Visor = Template.Create({
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
                Goggles: { color: "Highlight", override: true }
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
    })
    export const Mask = Template.Create({
        QualifiedName: Stack.of('Mask'),
        Property: Property.Create({
            inventory: true,
            sfx: "FutureLock",
            name: "DollmakerMask",
            inaccessible: true,
            Model: "FullVisorRim",
            DefaultLock: "Red",
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
    })
    export const BallGag = Template.Create({
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
            DefaultLock: "Red",
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
        })
    })
    export const Muzzle = Template.Create({
        QualifiedName: Stack.of('Muzzle'),
        Property: Property.Create({
            inventory: true,
            sfx: "FutureLock",
            name: "CyberMuzzle",
            debris: "Belts",
            LinkableBy: [...KDFlatGagLink],
            renderWhenLinked: [...KDFlatGagLink],
            Model: "AdvancedSciFiMuzzle",
            DefaultLock: "Red",
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
    })
    export const Catsuit = Template.Create({
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
            linkCategory: "Catsuits",
            linkSize: 0.75,
            restriction: 3,
            Group: "ItemTorso",
            power: 8.5,
            weight: 0,
            escapeChance: { "Struggle": -1.4, "Cut": -0.1, "Remove": 0.025, "Pick": 0.08 },
            DefaultLock: "Red",
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
    })
    export const Collar = Template.Create({
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
            DefaultLock: "Blue",
            Group: "ItemNeck",
            LinkableBy: [...KDCollarLink],
            renderWhenLinked: [...KDCollarRender],
            power: 9,
            weight: 0,
            escapeChance: { "Struggle": -0.5, "Cut": -0.25, "Remove": 0.33, "Pick": -0.15 },
            maxwill: 0.5,
            enemyTags: {},
            playerTags: { "ItemNeckEmpty": 10 },
            minLevel: 0,
            allFloors: true,
            shrine: ["Metal", "Collars", "Cyber"],
        })
    })
    export const Glove = Template.Create({
        QualifiedName: Stack.of('Glove'),
        Property: Property.Create({
            inventory: true,
            unlimited: true,
            name: DEFAULT,
            Model: "LockedGlove",
            DefaultLock: "Red",
            tightType: "Secure",
            factionFilters: {
                GloveBody: { color: "DarkNeutral", override: true },
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
            escapeChance: { "Struggle": -0.4, "Cut": -0.2, "Remove": 0.05, "Pick": -0.1 },
            maxwill: 0.4,
            enemyTags: {},
            playerTags: { "ItemHandsFull": -2 },
            minLevel: 0,
            allFloors: true,
            shrine: ["Metal", "Mittens"]
        })
    })
    export const Heel = Template.Create({
        QualifiedName: Stack.of('Heel'),
        Property: Property.Create({
            inventory: true,
            sfx: "FutureLock",
            name: DEFAULT,
            inaccessible: true,
            Asset: "FuturisticHeels2",
            remove: ["Shoes"],
            Model: "CyberBalletHeels",
            DefaultLock: "Red",
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
            escapeChance: { "Struggle": -0.4, "Cut": -0.35, "Remove": 0.2, "Pick": -0.25 },
            maxwill: 0.25, enemyTags: {},
            events: [
            ],
            playerTags: {},
            minLevel: 0,
            allFloors: true,
            shrine: ["Metal", "Boots"]
        })
    })
    export const Harness = Template.Create({
        QualifiedName: Stack.of('Harness'),
        Property: Property.Create({
            alwaysRender: true, sfx: "FutureLock",
            inventory: true,
            name: DEFAULT,
            debris: "Chains",
            accessible: true,
            Asset: "FuturisticHarness",
            LinkAll: true,
            strictness: 0.1,
            Model: "FutureHarness",
            DefaultLock: "Blue",
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
            maxwill: 0.5,
            enemyTags: {},
            playerTags: {},
            minLevel: 7,
            allFloors: true,
            shrine: ["Metal", "Harnesses"],
            events: [
            ]
        })
    })
    export const ChastityBra = Template.Create({
        QualifiedName: Stack.of('ChastityBra'),
        Property: Property.Create({
            inventory: true,
            sfx: "FutureLock",
            arousalMode: true,
            trappable: true,
            name: DEFAULT,
            Asset: "FuturisticBra2",
            OverridePriority: 26,
            Color: ['#499ed6', '#555555', '#222222', '#ffffff', '#555555', '#000000', "#000000"],
            Group: "ItemBreast",
            factionColor: [[2, 5], [2], [0]],
            tightType: "Secure",
            chastitybra: true,
            power: 15,
            weight: 0,
            DefaultLock: "Red",
            Model: "BraCyber",
            factionFilters: {
                Display: { color: "Highlight", override: false },
                Lining: { color: "LightNeutral", override: true },
                Metal: { color: "DarkNeutral", override: true },
            },
            Security: {
                level_tech: 2,
            },
            events: [
            ],
            maxwill: 0.6,
            escapeChance: { "Struggle": -1.1, "Cut": -0.8, "Remove": 1.0, "Pick": -0.35 },
            enemyTags: {},
            playerTags: {},
            minLevel: 4,
            allFloors: true,
            shrine: ["ChastityBras", "Chastity", "Metal"]
        })
    })
    export const ChastityBelt = Template.Create({
        QualifiedName: Stack.of('ChastityBelt'),
        Property: Property.Create({
            inventory: true,
            sfx: "FutureLock",
            arousalMode: true,
            name: "CyberBelt",
            Asset: "FuturisticChastityBelt",
            Modules: [3, 1, 1, 1, 1],
            OverridePriority: 26,
            Color: ['#222222', '#499ed6', '#555555', '#000000', '#555555', '#b927a8', '#3868E8', '#555555', '#222222'],
            // Body, Display, Panel, Lock, band, trim, band, underplug, plug, strap
            factionColor: [[0], [5], [1]],
            Group: "ItemPelvis",
            chastity:
                true, power: 20,
            weight: 0,
            DefaultLock: "Red",
            tightType: "Secure",
            Security: {
                level_tech: 2,
            },
            events: [

            ],
            Model: "CyberBelt",
            factionFilters: {
                Lining: { color: "LightNeutral", override: true },
                Metal: { color: "DarkNeutral", override: true },
                Display: { color: "Highlight", override: false },
                Plug: { color: "Highlight", override: true },
            },
            maxwill: 0.4,
            LinkableBy: ["Wrapping"],
            escapeChance: { "Struggle": -1.3, "Cut": -0.8, "Remove": 1.0, "Pick": -0.35 },
            enemyTags: {},
            playerTags: { "ItemVulvaEmpty": -5, "ItemVulvaPiercingsEmpty": -5 },
            minLevel: 7,
            allFloors: true,
            shrine: ["Chastity", "Metal", "ChastityBelts"]
        })
    })
    export const TorsoBelt = Template.Create({
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
            Model: DroneCuff.ModelName.Belt,
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
            escapeChance: { "Struggle": -0.4, "Cut": -0.2, "Remove": 0.4, "Pick": 0.1 },
            DefaultLock: "Blue",
            maxwill: 0.5,
            enemyTags: {},
            playerTags: {},
            minLevel: 7,
            allFloors: true,
            shrine: ["Metal", "Cuffs"],
            events: [
            ]
        })
    })
    export const ArmCuff = Template.Create({
        QualifiedName: Stack.of('ArmCuff'),
        Property: Property.Create({
            renderWhenLinked: ["Ties"],
            sfx: "FutureLock",
            nonbinding: true,
            inventory: true,
            name: DEFAULT,
            debris: "Chains",
            DefaultLock: "Red",
            accessible: true,
            Model: "CyberCuffsArms",
            factionFilters: {
                Display: { color: "Highlight", override: false },
                Screen: { color: "LightNeutral", override: true },
                BaseMetal: { color: "DarkNeutral", override: true },
                Lock: { color: "DarkNeutral", override: true },
            },
            alwaysRender: true,
            struggleBreak: true,
            Asset: "FuturisticCuffs",
            linkCategory: "Cuffs",
            linkSize: 0.55,
            LinkableBy: [...KDDevices, ...KDBindable],
            Link: 'KDMod.DroneSet.ArmLink',
            Color: ["#499ed6", "#b927a8", "#000000"],
            factionColor: [[], [1], [0]],
            unlimited: true,
            Group: "ItemArms",
            bindarms: false,
            power: 12,
            weight: 0,
            escapeChance: { "Struggle": -0.8, "Cut": -0.65, "Remove": 0.25, "Pick": -0.15 },
            enemyTags: {},
            playerTags: { "ItemArmsFull": -2 },
            minLevel: 4,
            allFloors: true,
            shrine: ["Cuffs", "Metal", "ArmCuffsBase"],
            maxwill: 0.8
        })
    })
    export const TightCuff = Template.Create({
        QualifiedName: Stack.of('TightCuff'),
        Property: Property.Create({
            inventory: true,
            sfx: "FutureLock",
            name: DEFAULT,
            debris: "Chains",
            accessible: true,
            Asset: "FuturisticLegCuffs",
            LinkableBy: [...KDBindable, ...KDDevices],
            Model: DroneCuff.ModelName.TighCuff,
            DefaultLock: "Red",
            factionFilters: {
                Display: { color: "Highlight", override: false },
                Screen: { color: "LightNeutral", override: true },
                BaseMetal: { color: "DarkNeutral", override: true },
                Lock: { color: "DarkNeutral", override: true },
            },
            alwaysRender: true,
            Color: ["#499ed6", "#499ed6", "#b927a8", "#000000"],
            struggleBreak: true,
            factionColor: [[], [2], [0, 1]],
            Group: "ItemLegs", power: 12, weight: 0,
            escapeChance: { "Struggle": -0.8, "Cut": -0.65, "Remove": 0.6, "Pick": -0.15 },
            enemyTags: {},
            playerTags: { "ItemFeetFull": -2 },
            minLevel: 4,
            allFloors: true,
            shrine: ["Metal", "Cuffs", "LegCuffsBase"],
        })
    })
    export const AnkleCuff = Template.Create({
        QualifiedName: Stack.of('AnkleCuff'),
        Property: Property.Create({
            inventory: true,
            sfx: "FutureLock",
            name: "CyberAnkleCuffs",
            debris: "Chains",
            accessible: true,
            Asset: "FuturisticAnkleCuffs",
            LinkableBy: [...KDBindable, ...KDDevices],
            Model: "CyberCuffsAnkles",
            DefaultLock: "Red",
            factionFilters: {
                Display: { color: "Highlight", override: false },
                Screen: { color: "LightNeutral", override: true },
                BaseMetal: { color: "DarkNeutral", override: true },
                Lock: { color: "DarkNeutral", override: true },
            },
            alwaysRender: true,
            struggleBreak: true,
            linkCategory: "AnkleCuffs",
            linkSize: 0.4,
            noDupe: true,
            Color: ["#499ed6", "#499ed6", "#b927a8", "#000000"],
            factionColor: [[], [2], [0, 1]],
            Group: "ItemFeet",
            power: 12,
            weight: 0,
            escapeChance: { "Struggle": -0.8, "Cut": -0.65, "Remove": 0.6, "Pick": -0.15 },
            enemyTags: {},
            playerTags: { "ItemFeetFull": -2 },
            minLevel: 4,
            allFloors: true,
            shrine: ["Cuffs", "Metal", "AnkleCuffsBase", "HogtieLower"],
        })
    })
    export const ArmLink = Template.Create({
        QualifiedName: Stack.of('ArmLink'),
        Property: Property.Create({
            name: DEFAULT,
            sfx: "FutureLock",
            debris: "Chains",
            DefaultLock: "Red",
            accessible: true,
            Asset: "FuturisticCuffs",
            Type: "Wrist",
            LinkableBy: [...KDElbowBind, ...KDBoxBind, ...KDBindable],
            // Link: "CyberArmCuffs3",
            // UnLink: "KDMod.DroneSet.ArmCuff",
            Model: DroneCuff.ModelName.ArmLink,
            factionFilters: {
                Link: { color: "Highlight", override: true },
            },
            Color: ["#499ed6", "#b927a8", "#000000"],
            factionColor: [[], [1], [0]],
            linkSize: 0.6,
            linkCategory: "ArmLink",
            Group: "ItemArms",
            bindarms: false,
            power: 3,
            weight: 0,
            escapeChance: { "Struggle": -0.2, "Remove": 0.2, "Pick": 0.1 },
            helpChance: { "Remove": 0.4 },
            enemyTags: {},
            playerTags: {},
            minLevel: 0,
            floors: KDMapInit([]),
            shrine: ["Metal", "Cuffs"],
            events: [
                { trigger: "postUnlock", type: "RequireLocked", inheritLinked: true },
                { trigger: "remove", type: "unlinkItem" },
                // { trigger: "hit", type: "linkItem", sfx: "FutureLock", chance: 0, tags: ["lowwill"] },
                { trigger: "postRemoval", type: "RequireBaseArmCuffs" },
                { trigger: "beforeStruggleCalc", type: "wristCuffsBlock", power: 0.08, inheritLinked: true }
            ],
            inventory: false
        })
    })
    export const ThighLink = Template.Create({
        QualifiedName: Stack.of('ThighLink'),
        Property: Property.Create({
            name: DEFAULT,
            sfx: "FutureLock",
            accessible: true,
            Asset: "FuturisticLegCuffs",
            debris: "Chains",
            DefaultLock: "Red",
            // UnLink: "CyberLegCuffs",
            LinkableBy: [...KDBindable, ...KDDevices],
            Type: "Chained",
            Model: DroneCuff.ModelName.ThighLink,
            factionFilters: {
                Link: { color: "Highlight", override: true },
            },
            Color: ["#499ed6", "#499ed6", "#b927a8", "#000000"],
            linkSize: 0.6,
            linkCategory: "LegLink",
            factionColor: [[], [2], [0, 1]],
            Group: "ItemLegs",
            hobble: 0.4,
            power: 6,
            weight: 0,
            escapeChance: { "Struggle": -0.2, "Remove": -0.15, "Pick": 0 },
            enemyTags: {},
            playerTags: {},
            minLevel: 0,
            allFloors: true,
            shrine: ["Metal", "Cuffs"],
            events: [
                { trigger: "postUnlock", type: "RequireLocked", inheritLinked: true },
                { trigger: "remove", type: "unlinkItem" },
                { trigger: "postRemoval", type: "RequireBaseLegCuffs" }
            ],
            inventory: false
        })
    })
    export const AnkleLink = Template.Create({
        QualifiedName: Stack.of('AnkleLink'),
        Property: Property.Create({
            name: DEFAULT,
            sfx: "FutureLock",
            accessible: true,
            Asset: "FuturisticAnkleCuffs",
            debris: "Chains",
            DefaultLock: "Red",
            // Link: "CyberAnkleCuffs3",
            // UnLink: "CyberAnkleCuffs",
            LinkableBy: [...KDBindable, ...KDDevices],
            Type: "Chained",
            Model: CuffLink.ModelName.AnkleLink,
            factionFilters: {
                BaseMetal: { color: "DarkNeutral", override: true },
            },
            Color: ["#499ed6", "#499ed6", "#b927a8", "#000000"],
            factionColor: [[], [2], [0, 1]],
            linkSize: 0.6,
            linkCategory: "AnkleLink",
            Group: "ItemFeet",
            hobble: 0.6,
            power: 6,
            weight: 0,
            escapeChance: { "Struggle": -0.2, "Remove": -0.15, "Pick": 0 },
            enemyTags: {},
            playerTags: {},
            minLevel: 0,
            allFloors: true,
            shrine: ["Metal", "Cuffs"],
            events: [
                { trigger: "remove", type: "unlinkItem" },
                { trigger: "postRemoval", type: "RequireBaseAnkleCuffs" },
                // { trigger: "hit", type: "linkItem", sfx: "FutureLock", chance: 0.0, subMult: 0.0, tags: ["lowwill"], noLeash: true }
            ],
            inventory: false
        })
    })
}

console.log('Prototype', Object.values<Template>(Prototype))

export const DroneSet =
    Seq(Object.values<Template>(Prototype))
        .map(t => t.set('QualifiedName', t.QualifiedName.push(RootNamespace, 'DroneSet')))
        .map(Template.ToDefinition)
        .groupBy(def => def.Property.name)
        .map(seq => seq.first() as Definition)

export function Register(manager: RestraintDefinitionManager) {
    console.log('RestraintPrototypes', [...Object.entries(Prototype).map(([k, v]) => [k, (v as Definition).toJS()])])
    console.log('DroneSet', DroneSet.toJS())
    manager.Add(DroneSet.valueSeq())
    manager.Commit()
}