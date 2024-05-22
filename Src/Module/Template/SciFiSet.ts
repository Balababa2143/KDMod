import { Definition, Restraint } from "../../KDInterfaceExtended"
import { Helpers, Mod, RootNamespace } from '../../Common'
import NameOf = Helpers.NameOf
import * as Model from '../Model'

declare let KDMaskLink: string[]

//#region  SciFiSet
export namespace SciFiSet {

    function FullNameOf<T>(nameLambda: () => T) {
        return `${RootNamespace}.${NameOf(() => SciFiSet)}.${NameOf(nameLambda)}`
    }

    //#region Sensory

    //#region Visor
    export const Visor: Definition = new Definition({
        Data: new Restraint({
            renderWhenLinked: ['TransparentMask'],
            name: FullNameOf(() => Visor),
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
            Group: "ItemHead",
            LinkableBy: [...KDVisorLink, ...KDMaskLink],
            power: 40,
            weight: 0,
            escapeChance: { "Struggle": -0.6, "Cut": -1.0, "Remove": 0.5, "Pick": -0.5 },
            maxwill: 0.1,
            minLevel: 0,
            allFloors: true,
            shrine: ["Visors"],
            enemyTags: {},
            playerTags: {},
        })
    })
    //#endregion

    //#region Mask
    export const Mask: Definition = new Definition({
        Data: new Restraint({
            inventory: true,
            sfx: "FutureLock",
            name: FullNameOf(() => Mask),
            inaccessible: true,
            Model: "FullVisorRim",
            DefaultLock: "Blue",
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
            minLevel: 0,
            allFloors: true,
            shrine: ["Masks", "Block_ItemMouth", 'TransparentMask'],
            enemyTags: {},
            playerTags: {},
        })
    })
    //#endregion

    //#region BallGag
    export const BallGag: Definition = new Definition({
        Data: new Restraint({
            inventory: true,
            sfx: "FutureLock",
            name: FullNameOf(() => BallGag),
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
            Model: "AdvancedSciFiBallGag",
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
            minLevel: 0,
            allFloors: true,
            shrine: ["BallGags", "Gags", "Metal"],
            enemyTags: {},
            playerTags: {},
        })
    })
    //#endregion

    //#region Muzzle
    export const Muzzle: Definition = new Definition({
        Data: new Restraint({
            inventory: true,
            sfx: "FutureLock",
            name: FullNameOf(() => Muzzle),
            debris: "Belts",
            LinkableBy: [...KDFlatGagLink],
            renderWhenLinked: [...KDFlatGagLink],
            Model: Model.DroneSet.Muzzle,
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
                Ball: { color: "LightNeutral", override: true },
                Plug: { color: "DarkNeutral", override: true },
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
            minLevel: 9,
            allFloors: true,
            shrine: ["FlatGags", "Gags", "Metal"],
            enemyTags: {},
            playerTags: {},
        })
    })
    //#endregion

    //#region MuzzleStuffedBall
    export const MuzzleStuffedBall: Definition = Muzzle.merge({
        Data: Muzzle.Data.merge({
            name: FullNameOf(() => MuzzleStuffedBall),
            gag: 0.7,
            alwaysDressModel: [
                {
                    Model: 'SegmentedLargeBallGag',
                    factionFilters: {
                        Ball: { color: "LightNeutral", override: true },
                        Strap: { color: "DarkNeutral", override: true },
                    },
                }
            ],
        })
    })
    //#endregion

        //#region MuzzlePluged
        export const MuzzlePluged: Definition = Muzzle.merge({
            Data: Muzzle.Data.merge({
                name: FullNameOf(() => MuzzlePluged),
                Model: Model.DroneSet.MuzzlePlug,
                gag: 1.0
            })
        })
        //#endregion

    //#region EarPlug
    export const EarPlug: Definition = new Definition({
        Data: new Restraint({
            inventory: true,
            name: FullNameOf(() => EarPlug),
            escapeChance: { "Struggle": -0.25, "Cut": -0.8, "Remove": 0.05, "Pick": -0.25 },
            DefaultLock: "Red",
            Group: "ItemEars",
            shrine: ["Metal"],
            Model: Model.DroneSet.EarPlug,
            factionFilters: {
                BaseMetal: { color: "DarkNeutral", override: true },
            },
            alwaysRender: true,
            enemyTags: {},
            playerTags: {},
            Color: [],
            minLevel: 0,
            power: 10,
            weight: 0,
            allFloors: true,
        })
    })
    //#endregion

    //#endregion

    //#region Body

    //#region Collar
    export const Collar: Definition = new Definition({
        Data: new Restraint({
            inventory: true,
            sfx: "FutureLock",
            name: FullNameOf(() => Collar),
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
            minLevel: 0,
            allFloors: true,
            shrine: ["Metal", "Collars", "Cyber"],
            enemyTags: {},
            playerTags: {},
        })
    })
    //#endregion

    //#region Catsuit
    export const Catsuit: Definition = new Definition({
        Data: new Restraint({
            renderWhenLinked: ["Corsets", "Harnesses", ...KDBindable, "Latex", "Leather", "Metal", "Rope"],
            inventory: true,
            name: FullNameOf(() => Catsuit),
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
            minLevel: 7,
            allFloors: true,
            shrine: ["Latex", "Suits"],
            alwaysDress: [
                { Item: "SeamlessCatsuit", Group: "Suit", Color: ['#3873C3'], override: true, factionColor: [[0]] },
                { Item: "SeamlessCatsuit", Group: "SuitLower", Color: ['#3873C3'], override: true, factionColor: [[0]] },
                { Item: "Catsuit", Group: "Gloves", Color: ['#3873C3'], override: true, factionColor: [[0]] }
            ],
            enemyTags: {},
            playerTags: {},
        })
    })
    //#endregion

    //#region Glove
    export const Glove: Definition = new Definition({
        Data: new Restraint({
            inventory: true,
            unlimited: true,
            name: FullNameOf(() => Glove),
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
            minLevel: 0,
            allFloors: true,
            shrine: ["Metal", "Mittens"],
            enemyTags: {},
            playerTags: {},
        })
    })
    //#endregion

    //#region Heel
    export const Heel: Definition = new Definition({
        Data: new Restraint({
            inventory: true,
            sfx: "FutureLock",
            name: FullNameOf(() => Heel),
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
            maxwill: 0.25,
            minLevel: 0,
            allFloors: true,
            shrine: ["Metal", "Boots"],
            enemyTags: {},
            playerTags: {},
        })
    })
    //#endregion

    //#endregion

    //#region Chastity

    //#region Harness
    export const Harness: Definition = new Definition({
        Data: new Restraint({
            alwaysRender: true, sfx: "FutureLock",
            inventory: true,
            name: FullNameOf(() => Harness),
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
            minLevel: 7,
            allFloors: true,
            shrine: ["Metal", "Harnesses"],
            enemyTags: {},
            playerTags: {},
        })
    })
    //#endregion

    //#region ChastityBra
    export const ChastityBra: Definition = new Definition({
        Data: new Restraint({
            inventory: true,
            sfx: "FutureLock",
            arousalMode: true,
            trappable: true,
            name: FullNameOf(() => ChastityBra),
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
            maxwill: 0.6,
            escapeChance: { "Struggle": -1.1, "Cut": -0.8, "Remove": 1.0, "Pick": -0.35 },
            minLevel: 4,
            allFloors: true,
            shrine: ["ChastityBras", "Chastity", "Metal"],
            enemyTags: {},
            playerTags: {},
        })
    })
    //#endregion

    //#region ChastityBraBig
    export const ChastityBraBig: Definition = ChastityBra.merge({
        Data: ChastityBra.Data.merge({
            name: FullNameOf(() => ChastityBraBig),
            Model: "BraProto",
            Asset: "FuturisticBra"
        })
    })
    //#endregion

    //#region ChastityBelt
    export const ChastityBelt: Definition = new Definition({
        Data: new Restraint({
            inventory: true,
            sfx: "FutureLock",
            arousalMode: true,
            name: FullNameOf(() => ChastityBelt),
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
            minLevel: 7,
            allFloors: true,
            shrine: ["Chastity", "Metal", "ChastityBelts"],
            enemyTags: {},
            playerTags: {},
        })
    })
    //#endregion

    //#region ChastityBeltBig
    export const ChastityBeltBig: Definition = ChastityBelt.merge({
        Data: ChastityBelt.Data.merge({
            name: FullNameOf(() => ChastityBeltBig),
            Model: "ProtoBelt",
            Asset: "FuturisticChastityBelt",
            Modules: [1, 1, 1, 1, 1]
        })
    })
    //#endregion

    //#endregion

    //#region Cuffs

    //#region TorsoBelt
    export const TorsoBelt: Definition = new Definition({
        Data: new Restraint({
            alwaysRender: true,
            sfx: "FutureLock",
            inventory: true,
            name: FullNameOf(() => TorsoBelt),
            debris: "Chains",
            accessible: true,
            Asset: "",
            LinkableBy: [...KDHarnessLink],
            strictness: 0.1,
            Model: Model.DroneSet.Belt,
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
            Group: "ItemTorso",
            power: 10,
            weight: 0,
            escapeChance: { "Struggle": -0.4, "Cut": -0.2, "Remove": 0.4, "Pick": 0.1 },
            DefaultLock: "Blue",
            maxwill: 0.5,
            minLevel: 7,
            allFloors: true,
            shrine: ["Metal", "Cuffs"],
            enemyTags: {},
            playerTags: {},
        })
    })
    //#endregion

    //#region ArmCuff
    export const ArmCuff: Definition = new Definition({
        Data: new Restraint({
            renderWhenLinked: ["Ties"],
            sfx: "FutureLock",
            nonbinding: true,
            inventory: true,
            name: FullNameOf(() => ArmCuff),
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
            Color: ["#499ed6", "#b927a8", "#000000"],
            factionColor: [[], [1], [0]],
            unlimited: true,
            Group: "ItemArms",
            bindarms: false,
            power: 12,
            weight: 0,
            escapeChance: { "Struggle": -0.8, "Cut": -0.65, "Remove": 0.25, "Pick": -0.15 },
            minLevel: 4,
            allFloors: true,
            shrine: ["Cuffs", "Metal", "ArmCuffsBase"],
            maxwill: 0.8,
            enemyTags: {},
            playerTags: {},
        })
    })
    //#endregion

    //#region ArmCuffLinked
    export const ArmCuffLinked: Definition = ArmCuff.merge({
        Data: ArmCuff.Data.merge({
            name: FullNameOf(() => ArmCuffLinked),
            alwaysDressModel: [
                {
                    Model: Model.DroneSet.ArmLink,
                    factionFilters: {
                        Link: { color: "Highlight", override: true },
                    }
                }
            ]
        })
    })
    //#endregion

    //#region ArmCuffHandsUp
    export const ArmCuffHandsUp: Definition = ArmCuff.merge({
        Data: ArmCuff.Data.merge({
            name: FullNameOf(() => ArmCuffHandsUp),
            alwaysDressModel: [
                {
                    Model: Model.DroneSet.ArmLink,
                    factionFilters: {
                        Link: { color: "Highlight", override: true },
                    }
                }
            ],
            bindarms: true,
            shrine: [...ArmCuff.Data.shrine, "HandsUp"],
        })
    })
    //#endregion

    //#region ArmCuffHandFront
    export const ArmCuffHandsFront: Definition = ArmCuff.merge({
        Data: ArmCuff.Data.merge({
            name: FullNameOf(() => ArmCuffHandsFront),
            alwaysDressModel: [
                {
                    Model: Model.DroneSet.ArmLink,
                    factionFilters: {
                        Link: { color: "Highlight", override: true },
                    }
                }
            ],
            bindarms: true,
            shrine: [...ArmCuff.Data.shrine, "HandsFront"],
        })
    })
    //#endregion

    //#region ArmCuffYoked
    export const ArmCuffYoked: Definition = ArmCuff.merge({
        Data: ArmCuff.Data.merge({
            name: FullNameOf(() => ArmCuffYoked),
            alwaysDressModel: [
                {
                    Model: Model.DroneSet.ArmLink,
                    factionFilters: {
                        Link: { color: "Highlight", override: true },
                    }
                }
            ],
            bindarms: true,
            shrine: ["ArmCuffsBase", "Metal", "Yokes", "Yoked"],
            LinkableBy: undefined
        })
    })
    //#endregion

    //#region TighCuff
    export const ThighCuff: Definition = new Definition({
        Data: new Restraint({
            inventory: true,
            sfx: "FutureLock",
            name: FullNameOf(() => ThighCuff),
            debris: "Chains",
            accessible: true,
            Asset: "FuturisticLegCuffs",
            LinkableBy: [...KDBindable, ...KDDevices],
            Model: Model.DroneSet.TighCuff,
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
            minLevel: 4,
            allFloors: true,
            shrine: ["Metal", "Cuffs", "LegCuffsBase"],
            enemyTags: {},
            playerTags: {},
        })
    })
    //#endregion

    //#region ThighCuffLinked
    export const ThighCuffLinked: Definition = ThighCuff.merge({
        Data: ThighCuff.Data.merge({
            name: FullNameOf(() => ThighCuffLinked),
            alwaysDressModel: [
                {
                    Model: Model.DroneSet.ThighLink,
                    factionFilters: {
                        Link: { color: "Highlight", override: true },
                    }
                }
            ]
        })
    })
    //#endregion

    //#region AnkleCuff
    export const AnkleCuff: Definition = new Definition({
        Data: new Restraint({
            inventory: true,
            sfx: "FutureLock",
            name: FullNameOf(() => AnkleCuff),
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
            minLevel: 4,
            allFloors: true,
            shrine: ["Cuffs", "Metal", "AnkleCuffsBase", "HogtieLower"],
            enemyTags: {},
            playerTags: {},
        })
    })
    //#endregion

    //#region AnkleCuffLinked
    export const AnkleCuffLinked: Definition = AnkleCuff.merge({
        Data: AnkleCuff.Data.merge({
            name: FullNameOf(() => AnkleCuffLinked),
            alwaysDressModel: [
                {
                    Model: Model.DroneSet.AnkleLink,
                    factionFilters: {
                        Link: { color: "Highlight", override: true },
                    }
                }
            ]
        })
    })
    //#endregion

    //#endregion
}
//#endregion

export function Register() {
    const defs = Object.values(SciFiSet)
    if (defs.every(Mod.CheckNoDuplicateRestraint)) {
        defs.forEach(Mod.RegisterNewRestraint)
    }
    else {
        throw new Error(`${RootNamespace} register: restraint name duplicated`, {
            cause: {
                DuplicatedRestraints: [
                    ...defs.filter(x => !Mod.CheckNoDuplicateRestraint(x))
                ]
            }
        })
    }
}