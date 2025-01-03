import { Helpers, KD } from '../../Common'
import { RootNamespace } from '../../Common'
import { NameOf } from '../../Common/Helpers'

namespace Folder {
    export const CuffLink = `${RootNamespace}/CuffLink` as const
    export const EarPlug = `${RootNamespace}/EarPlug` as const
    export const Visor = `${RootNamespace}/Visor` as const
}

const Namespace: string = `${RootNamespace}.Model.${NameOf(() => SciFiSet)}`

export namespace SciFiSet {
    export const VisorTransparent: string = `${Namespace}.${NameOf(() => VisorTransparent)}`
    export const Muzzle: string = `${Namespace}.${NameOf(() => Muzzle)}`
    export const MuzzlePlug: string = `${Namespace}.${NameOf(() => MuzzlePlug)}`
    export const Belt: string = `${Namespace}.${NameOf(() => Belt)}`
    export const TighCuff: string = `${Namespace}.${NameOf(() => TighCuff)}`
    export const ArmLink: string = `${Namespace}.${NameOf(() => ArmLink)}`
    export const ArmLinkYoke: string = `${Namespace}.${NameOf(() => ArmLinkYoke)}`
    export const ThighLink: string = `${Namespace}.${NameOf(() => ThighLink)}`
    export const AnkleLink: string = `${Namespace}.${NameOf(() => AnkleLink)}`
    export const Visor: string = `${Namespace}.${NameOf(() => Visor)}`
    export const VisorOpaque: string = `${Namespace}.${NameOf(() => VisorOpaque)}`
    export const Mask: string = `${Namespace}.${NameOf(() => Mask)}`
    export const EarPlug: string = `${Namespace}.${NameOf(() => EarPlug)}`
    export const MaskOpaque: string = `${Namespace}.${NameOf(() => MaskOpaque)}`
    export const OpenMitten: string = `${Namespace}.${NameOf(() => OpenMitten)}`
}

//#region register
Helpers.RegisterModule(
    `${Namespace}Registered`,
    () => {
        globalThis.AddModel(KD.GetModelWithExtraLayers_({
            BaseModel: 'NeoCyberBelt',
            NewModel: SciFiSet.Belt,
            Layers: [
                {
                    Name: "BeltPort",
                    Layer: "BeltBondage",
                    Invariant: true,
                    Pri: 0,
                    InheritColor: "BaseMetal",
                    Folder: Folder.CuffLink
                }
            ]
        }))
        
        globalThis.AddModel(KD.GetModelWithExtraLayers_({
            BaseModel: 'CyberCuffsThigh',
            NewModel: SciFiSet.TighCuff,
            Layers: [
                {
                    Name: "TighPort",
                    Layer: "ThighRight",
                    Poses: globalThis.ToMap(["Spread"]),
                    Pri: 0,
                    InheritColor: "BaseMetal",
                    Folder: Folder.CuffLink
                }
            ]
        }))
        
        globalThis.AddModel({
            Name: SciFiSet.ArmLink,
            Folder: Folder.CuffLink,
            TopLevel: true,
            Categories: ["Restraints", "Cuffs"],
            Restraint: true,
            Layers: globalThis.ToLayerMap([
                {
                    Name: "WristLink", Layer: "BindChainLinksUnder", Pri: 0,
                    Poses: globalThis.ToMap(["Free", "Yoked", "Front"]),
                    GlobalDefaultOverride: globalThis.ToMap(["Front", "Yoked"]),
                    SwapLayerPose: { Yoked: "BindForeWristLeft", Front: "BindForeWristLeft" },
                    InheritColor: "Link",
                },
                {
                    Name: "ElbowLink", Layer: "BindChainLinksUnder", Pri: 0,
                    Poses: globalThis.ToMap(["Free", "Boxtie", "Yoked"]),
                    GlobalDefaultOverride: globalThis.ToMap(["Yoked"]),
                    SwapLayerPose: { Yoked: "BindForeWristLeft" },
                    InheritColor: "Link",
                },
            ])
        })
        
        globalThis.AddModel({
            Name: SciFiSet.ArmLinkYoke,
            Folder: Folder.CuffLink,
            TopLevel: true,
            Categories: ["Restraints", "Cuffs"],
            Restraint: true,
            Layers: globalThis.ToLayerMap([
                {
                    Name: "WristLink", Layer: "BindChainLinksUnder", Pri: 0,
                    Poses: globalThis.ToMap(["Yoked"]),
                    GlobalDefaultOverride: globalThis.ToMap(["Front", "Crossed"]),
                    // SwapLayerPose: { Crossed: "CrossMittenLeft", Front: "ForeMittenLeft" },
                    InheritColor: "Link",
                },
                {
                    Name: "ElbowLink", Layer: "BindChainLinksUnder", Pri: 0,
                    Poses: globalThis.ToMap(["Yoked"]),
                    GlobalDefaultOverride: globalThis.ToMap(["Front", "Crossed"]),
                    // SwapLayerPose: { Crossed: "CrossMittenLeft", Front: "ForeMittenLeft" },
                    InheritColor: "Link",
                },
            ])
        })
        
        globalThis.AddModel({
            Name: SciFiSet.ThighLink,
            Folder: Folder.CuffLink,
            TopLevel: true,
            Restraint: true,
            Categories: ["Restraints", "Cuffs", "Links"],
            Layers: globalThis.ToLayerMap([
                {
                    Name: "ThighLink", Layer: "BindChainLinksUnder", Pri: 0,
                    Poses: globalThis.ToMap(["Spread"]),
                    InheritColor: "Link",
                },
            ])
        })
        
        globalThis.AddModel({
            Name: SciFiSet.AnkleLink,
            Folder: Folder.CuffLink,
            TopLevel: true,
            Restraint: true,
            Categories: ["Restraints", "Cuffs", "Links"],
            Layers: globalThis.ToLayerMap([
                {
                    Name: "AnkleLink", Layer: "BindChainLinksUnder", Pri: 0,
                    Poses: globalThis.ToMap(["Spread"]),
                    InheritColor: "Link",
                },
            ])
        })
        

        ModelDefs["ElfEars"].AddPose!.push("Elf", "ElfEarsStandard")
        ModelDefs["ElfEarsLong"].AddPose!.push("Elf", "ElfEarLong")
        ModelDefs["ElfEarsFloppy"].AddPose!.push("Elf", "ElfFloppy")

        globalThis.AddModel({
            Name: SciFiSet.EarPlug,
            TopLevel: true,
            Protected: true,
            Categories: ["Body", "Face", "Cosplay"],
            Folder: Folder.EarPlug,
            RemovePoses: ["HideEars"],
            Layers: globalThis.ToLayerMap([
                {
                    Name: "EarPlugHuman", Layer: "HairOver", Pri: 0.3,
                    Invariant: true,
                    InheritColor: 'BaseMetal',
                    HidePoses: globalThis.ToMap(["AnimalEars", "Elf"]),
                    HideWhenOverridden: true
                },
                {
                    Name: "EarPlugElfLongFront", Layer: "HairOver", Pri: 0.3,
                    Invariant: true,
                    InheritColor: 'BaseMetal',
                    RequirePoses: globalThis.ToMap(["Cosplay", "Elf"]),
                    HidePoses: globalThis.ToMap(["AnimalEars", "ElfFloppy"]),
                    HideWhenOverridden: true
                },
                {
                    Name: "EarPlugElfLongBack", Layer: "Head", Pri: -0.09,
                    Invariant: true,
                    InheritColor: 'BaseMetal',
                    RequirePoses: globalThis.ToMap(["Cosplay", "Elf"]),
                    HidePoses: globalThis.ToMap(["AnimalEars", "ElfFloppy"]),
                    HideWhenOverridden: true
                }
            ])
        })
        

        globalThis.AddModel({
            Name: SciFiSet.VisorTransparent,
            Folder: Folder.Visor,
            TopLevel: true,
            Categories: ["Accessories", "Face"],
            Layers: globalThis.ToLayerMap([
                {
                    Name: "VisorGlass", Layer: "Goggles", Pri: 14,
                    Folder: Folder.Visor,
                    InheritColor: 'BaseMetal',
                    Invariant: true,
                    HideWhenOverridden: true,
                }
            ])
        })

        globalThis.AddModel({
            Name: SciFiSet.VisorOpaque,
            Folder: Folder.Visor,
            TopLevel: true,
            Categories: ["Accessories", "Face"],
            Layers: globalThis.ToLayerMap([
                {
                    Name: "VisorOpaque", Layer: "Goggles", Pri: 14,
                    Folder: Folder.Visor,
                    InheritColor: 'BaseMetal',
                    Invariant: true,
                    // HideWhenOverridden: true,
                },
            ])
        })

        // globalThis.AddModel(KD.GetModelWithExtraLayers_({
        //     BaseModel: SciFiSet.EarPlug,
        //     NewModel: SciFiSet.VisorOpaque,
        //     Layers:[
        //         {
        //             Name: "VisorOpaque", Layer: "Blindfold", Pri: 14,
        //             Folder: Folder.Visor,
        //             InheritColor: 'BaseMetal',
        //             Invariant: true,
        //             HideWhenOverridden: true,
        //         },
        //     ]
        // }))

        const unwantedLayers =
            globalThis.GetModelLayers('AdvancedSciFiMuzzle')
                .map(layer => layer.Name)
                .concat('Ball')
        globalThis.AddModel(KD.GetModelWithExtraLayers_({
            BaseModel: 'AdvancedSciFiMuzzle',
            NewModel: SciFiSet.Muzzle,
            Layers:
                globalThis.GetModelLayers('UltimateSciFiBallGag')
                    .filter(ballGagLayer => !unwantedLayers.some(unwantedLayer => ballGagLayer.Name === unwantedLayer))
        }))
        

        globalThis.AddModel(KD.GetModelWithExtraLayers_({
            BaseModel: SciFiSet.Muzzle,
            NewModel: SciFiSet.MuzzlePlug,
            Layers: [
                {
                    Name: "Plug", Layer: "GagFlatStraps", Pri: 40,
                    Sprite: "SciFiPlug",
                    OffsetX: 942,
                    OffsetY: 200,
                    InheritColor: 'Plug',
                    SwapLayerPose: { XrayFace: "GagStraps" },
                },
                {
                    Name: "Panel", Layer: "GagFlatStraps", Pri: 17,
                    Sprite: "SciFiPanel",
                    OffsetX: 942,
                    OffsetY: 200,
                    InheritColor: 'Muzzle',
                    SwapLayerPose: { XrayFace: "GagStraps" },
                },
                {
                    Name: "MaskUnder", Layer: "GagFlatStraps", Pri: 19,
                    Sprite: "HarnessMask",
                    OffsetX: 942,
                    OffsetY: 200,
                    InheritColor: 'HarnessMask',
                    SwapLayerPose: { XrayFace: "GagStraps" },
                },
                {
                    Name: "PlugUpper", Layer: "GagMuzzle", Pri: 120,
                    Sprite: "SciFiPlug",
                    OffsetX: 942,
                    OffsetY: 200,
                    InheritColor: 'Plug',
                }
            ]
        }))
        

        // globalThis.AddModel({
        //     Name: SciFiSet.Visor,
        //     Folder: Folder.Visor,
        //     TopLevel: true,
        //     Categories: ["Accessories", "Face"],
        //     Layers: globalThis.ToLayerMap([
        //         {
        //             Name: "VisorGlass", Layer: "Goggles", Pri: 14,
        //             InheritColor: "Goggles",
        //             Invariant: true,
        //             HideWhenOverridden: true,
        //         },
        //     ])
        // })
        

        // globalThis.AddModel({
        //     Name: SciFiSet.EarPlug,
        //     Folder: Folder.Visor,
        //     TopLevel: true,
        //     Categories: ["Accessories", "Face"],
        //     Layers: globalThis.ToLayerMap([
        //         {
        //             Name: "VisorOpaque", Layer: "Blindfold", Pri: 14,
        //             InheritColor: "Goggles",
        //             Invariant: true,
        //             HideWhenOverridden: true,
        //         },
        //     ])
        // })
        

        globalThis.AddModel({
            Name: SciFiSet.Mask,
            Folder: Folder.Visor,
            TopLevel: true,
            Categories: ["Accessories", "Face"],
            AddPoseConditional: {
                Xray: ["HoodMask",],
            },
            Layers: globalThis.ToLayerMap([
                {
                    Name: "DollmakerFull", Layer: "Goggles", Pri: -10,
                    Invariant: true,
                    HideWhenOverridden: true,
                    Folder: 'Visors',
                    SwapLayerPose: {
                        Xray: "MaskOver"
                    }
                },
                {
                    Name: "DollmakerFullRim", Layer: "MaskOver", Pri: -10 + 0.1,
                    InheritColor: "Rim",
                    Invariant: true,
                    NoOverride: true,
                    TieToLayer: "DollmakerFull",
                    Folder: 'Visors',
                    SwapLayerPose: {
                        Xray: "GagStraps"
                    },
                },
            ])
        })
        

        const DarkGlassFilter: LayerFilter = { "gamma": 0.43333333333333335, "saturation": 0, "contrast": 2.3166666666666664, "brightness": 0.9666666666666667, "red": 0.6, "green": 0.6833333333333333, "blue": 1.5333333333333332, "alpha": 1 }
        globalThis.AddModel({
            Name: SciFiSet.MaskOpaque,
            Folder: Folder.Visor,
            TopLevel: true,
            Categories: ["Accessories", "Face"],
            HideLayers: [
                "Brows", // Brows should get hidden with mask
            ],
            AddPoseConditional: {
                Xray: ["HoodMask",],
            },
            Filters: {
                "FullMaskOpaque": DarkGlassFilter
            },
            Layers: globalThis.ToLayerMap([
                {
                    Name: "FullMaskOpaque", Layer: "Hood", Pri: -10,
                    // InheritColor: "FullVisor",
                    // ApplyFilter: "DarkGlass",
                    Invariant: true,
                    HideWhenOverridden: true,
                    SwapLayerPose: {
                        Xray: "MaskOver"
                    }
                },
                {
                    Name: "DollmakerFullRim", Layer: "Hood", Pri: -10 + 0.1,
                    InheritColor: "Rim",
                    Invariant: true,
                    NoOverride: true,
                    TieToLayer: "FullMaskOpaque",
                    Folder: 'Visors',
                    SwapLayerPose: {
                        Xray: "GagStraps"
                    },
                },
            ])
        })
        

        const OpenMittenLeft: string = `${Namespace}.${NameOf(() => OpenMittenLeft)}`
        const OpenMittenRight: string = `${Namespace}.${NameOf(() => OpenMittenRight)}`

        globalThis.AddModel({
            Name: OpenMittenLeft,
            Folder: "CyberArms",
            Parent: "CyberArms",
            Categories: ["Gloves", "Sleeves"],
            Layers: globalThis.ToLayerMap([
                { Name: "LongMittenLeft", Layer: "MittenLeft", Pri: 120,
                    Poses: globalThis.ToMap([...ARMPOSES]),
                    GlobalDefaultOverride: globalThis.ToMap(["Front", "Crossed"]),
                    InheritColor: "Mitten",
                    // EraseSprite: "Mitts",
                    // EraseLayers: globalThis.ToMap(["Mitts"]),
                },
                { Name: "ForeLongMittenLeft", Layer: "ForeMittenLeft", Pri: 20,
                    Poses: globalThis.ToMap([...FOREARMPOSES]),
                    InheritColor: "Mitten",
                    GlobalDefaultOverride: globalThis.ToMap(["Front", "Crossed"]),
                    SwapLayerPose: {Crossed: "CrossMittenLeft"},
                },
                { Name: "CuffForeLongMittenLeft", Layer: "ForeMittenLeft", Pri: 20.1,
                    Poses: globalThis.ToMap([...FOREARMPOSES]),
                    GlobalDefaultOverride: globalThis.ToMap(["Front", "Crossed"]),
                    SwapLayerPose: {Crossed: "CrossMittenLeft"},
                    TieToLayer: "ForeLongMittenLeft",
                    NoOverride: true,
                    InheritColor: "Cuff",
                },
                { Name: "CuffLongMittenLeft", Layer: "MittenLeft", Pri: 120.1,
                    Poses: globalThis.ToMapSubtract([...ARMPOSES], ["Wristtie", "Boxtie", "Up"]),
                    GlobalDefaultOverride: globalThis.ToMap(["Front", "Crossed"]),
                    SwapLayerPose: {Crossed: "CrossMittenLeft", Front: "ForeMittenLeft"},
                    TieToLayer: "LongMittenLeft",
                    NoOverride: true,
                    InheritColor: "Cuff",
                },
                { Name: "DisplayForeLongMittenLeft", Layer: "ForeMittenLeft", Pri: 20.2,
                    Poses: globalThis.ToMap([...FOREARMPOSES]),
                    GlobalDefaultOverride: globalThis.ToMap(["Front", "Crossed"]),
                    SwapLayerPose: {Crossed: "CrossMittenLeft"},
                    TieToLayer: "ForeLongMittenLeft",
                    NoOverride: true,
                    InheritColor: "Display",
                },
                { Name: "DisplayLongMittenLeft", Layer: "MittenLeft", Pri: 120.2,
                    Poses: globalThis.ToMapSubtract([...ARMPOSES], ["Wristtie", "Boxtie", "Up"]),
                    GlobalDefaultOverride: globalThis.ToMap(["Front", "Crossed"]),
                    SwapLayerPose: {Crossed: "CrossMittenLeft", Front: "ForeMittenLeft"},
                    TieToLayer: "LongMittenLeft",
                    NoOverride: true,
                    InheritColor: "Display",
                },
                { Name: "LockForeLongMittenLeft", Layer: "ForeMittenLeft", Pri: 20.3,
                    Poses: globalThis.ToMap([...FOREARMPOSES]),
                    GlobalDefaultOverride: globalThis.ToMap(["Front", "Crossed"]),
                    SwapLayerPose: {Crossed: "CrossMittenLeft"},
                    TieToLayer: "ForeLongMittenLeft",
                    NoOverride: true,
                    InheritColor: "Lock",
                },
                { Name: "LockLongMittenLeft", Layer: "MittenLeft", Pri: 120.3,
                    Poses: globalThis.ToMapSubtract([...ARMPOSES], ["Wristtie", "Boxtie", "Up"]),
                    GlobalDefaultOverride: globalThis.ToMap(["Front", "Crossed"]),
                    SwapLayerPose: {Crossed: "CrossMittenLeft", Front: "ForeMittenLeft"},
                    TieToLayer: "LongMittenLeft",
                    NoOverride: true,
                    InheritColor: "Lock",
                },
                { Name: "GlowForeLongMittenLeft", Layer: "ForeMittenLeft", Pri: 20.4,
                    Poses: globalThis.ToMap([...FOREARMPOSES]),
                    GlobalDefaultOverride: globalThis.ToMap(["Front", "Crossed"]),
                    SwapLayerPose: {Crossed: "CrossMittenLeft"},
                    TieToLayer: "ForeLongMittenLeft",
                    NoOverride: true,
                    InheritColor: "Glow",
                },
                { Name: "GlowLongMittenLeft", Layer: "MittenLeft", Pri: 120.4,
                    Poses: globalThis.ToMapSubtract([...ARMPOSES], ["Wristtie", "Boxtie", "Up"]),
                    GlobalDefaultOverride: globalThis.ToMap(["Front", "Crossed"]),
                    SwapLayerPose: {Crossed: "CrossMittenLeft", Front: "ForeMittenLeft"},
                    TieToLayer: "LongMittenLeft",
                    NoOverride: true,
                    InheritColor: "Glow",
                },
        
        
                { Name: "StrapsForeLongMittenLeft", Layer: "ForeMittenLeft", Pri: 20.1,
                    Poses: globalThis.ToMap([...FOREARMPOSES]),
                    GlobalDefaultOverride: globalThis.ToMap(["Front", "Crossed"]),
                    SwapLayerPose: {Crossed: "CrossMittenLeft"},
                    TieToLayer: "ForeLongMittenLeft",
                    NoOverride: true,
                    InheritColor: "Straps",
                },
                { Name: "StrapsLongMittenLeft", Layer: "MittenLeft", Pri: 120.1,
                    Poses: globalThis.ToMap([...ARMPOSES]),
                    GlobalDefaultOverride: globalThis.ToMap(["Front", "Crossed"]),
                    SwapLayerPose: {Crossed: "CrossMittenLeft", Front: "ForeMittenLeft"},
                    TieToLayer: "LongMittenLeft",
                    NoOverride: true,
                    InheritColor: "Straps",
                },
                { Name: "UpperCuffLongMittenLeft", Layer: "MittenLeft", Pri: 120.1,
                    Poses: globalThis.ToMap([...ARMPOSES]),
                    GlobalDefaultOverride: globalThis.ToMap(["Front", "Crossed"]),
                    SwapLayerPose: {Crossed: "CrossMittenLeft", Front: "ForeMittenLeft"},
                    TieToLayer: "LongMittenLeft",
                    NoOverride: true,
                    InheritColor: "UpperCuff",
                    Folder: 'CyberMitts'
                },
                { Name: "UpperDisplayLongMittenLeft", Layer: "MittenLeft", Pri: 120.2,
                    Poses: globalThis.ToMap([...ARMPOSES]),
                    GlobalDefaultOverride: globalThis.ToMap(["Front", "Crossed"]),
                    SwapLayerPose: {Crossed: "CrossMittenLeft", Front: "ForeMittenLeft"},
                    TieToLayer: "LongMittenLeft",
                    NoOverride: true,
                    InheritColor: "UpperDisplay",
                    Folder: 'CyberMitts'
                },
                { Name: "UpperLockLongMittenLeft", Layer: "MittenLeft", Pri: 120.3,
                    Poses: globalThis.ToMap([...ARMPOSES]),
                    GlobalDefaultOverride: globalThis.ToMap(["Front", "Crossed"]),
                    SwapLayerPose: {Crossed: "CrossMittenLeft", Front: "ForeMittenLeft"},
                    TieToLayer: "LongMittenLeft",
                    NoOverride: true,
                    InheritColor: "UpperLock",
                    Folder: 'CyberMitts'
                },
                { Name: "UpperGlowLongMittenLeft", Layer: "MittenLeft", Pri: 120.4,
                    Poses: globalThis.ToMap([...ARMPOSES]),
                    GlobalDefaultOverride: globalThis.ToMap(["Front", "Crossed"]),
                    SwapLayerPose: {Crossed: "CrossMittenLeft", Front: "ForeMittenLeft"},
                    TieToLayer: "LongMittenLeft",
                    NoOverride: true,
                    InheritColor: "UpperGlow",
                    Folder: 'CyberMitts'
                },
            ])
        })

        globalThis.AddModel({
            Name: OpenMittenRight,
            Folder: "CyberArms",
            Parent: "CyberArms",
            Categories: ["Gloves", "Sleeves"],
            Layers: globalThis.ToLayerMap([
                { Name: "LongMittenRight", Layer: "MittenRight", Pri: 120,
                    Poses: globalThis.ToMap([...ARMPOSES]),
                    GlobalDefaultOverride: globalThis.ToMap(["Front", "Crossed"]),
                    InheritColor: "Mitten",
                },
                { Name: "ForeLongMittenRight", Layer: "ForeMittenRight", Pri: 20,
                    Poses: globalThis.ToMap([...FOREARMPOSES]),
                    InheritColor: "Mitten",
                    GlobalDefaultOverride: globalThis.ToMap(["Front", "Crossed"]),
                    SwapLayerPose: {Crossed: "CrossGloveRight"},
                },
                { Name: "CuffForeLongMittenRight", Layer: "ForeMittenRight", Pri: 20.1,
                    Poses: globalThis.ToMap([...FOREARMPOSES]),
                    GlobalDefaultOverride: globalThis.ToMap(["Front", "Crossed"]),
                    SwapLayerPose: {Crossed: "CrossGloveRight"},
                    TieToLayer: "ForeLongMittenRight",
                    NoOverride: true,
                    InheritColor: "Cuff",
                },
                { Name: "CuffLongMittenRight", Layer: "MittenRight", Pri: 120.1,
                    Poses: globalThis.ToMapSubtract([...ARMPOSES], ["Wristtie", "Boxtie", "Up"]),
                    GlobalDefaultOverride: globalThis.ToMap(["Front", "Crossed"]),
                    SwapLayerPose: {Crossed: "CrossMittenRight", Front: "ForeMittenRight"},
                    TieToLayer: "LongMittenRight",
                    NoOverride: true,
                    InheritColor: "Cuff",
                },
                { Name: "DisplayForeLongMittenRight", Layer: "ForeMittenRight", Pri: 20.2,
                    Poses: globalThis.ToMap([...FOREARMPOSES]),
                    GlobalDefaultOverride: globalThis.ToMap(["Front", "Crossed"]),
                    SwapLayerPose: {Crossed: "CrossGloveRight"},
                    TieToLayer: "ForeLongMittenRight",
                    NoOverride: true,
                    InheritColor: "Display",
                },
                { Name: "DisplayLongMittenRight", Layer: "MittenRight", Pri: 120.2,
                    Poses: globalThis.ToMapSubtract([...ARMPOSES], ["Wristtie", "Boxtie", "Up"]),
                    GlobalDefaultOverride: globalThis.ToMap(["Front", "Crossed"]),
                    SwapLayerPose: {Crossed: "CrossMittenRight", Front: "ForeMittenRight"},
                    TieToLayer: "LongMittenRight",
                    NoOverride: true,
                    InheritColor: "Display",
                },
                { Name: "LockForeLongMittenRight", Layer: "ForeMittenRight", Pri: 20.3,
                    Poses: globalThis.ToMap([...FOREARMPOSES]),
                    GlobalDefaultOverride: globalThis.ToMap(["Front", "Crossed"]),
                    SwapLayerPose: {Crossed: "CrossGloveRight"},
                    TieToLayer: "ForeLongMittenRight",
                    NoOverride: true,
                    InheritColor: "Lock",
                },
                { Name: "LockLongMittenRight", Layer: "MittenRight", Pri: 120.3,
                    Poses: globalThis.ToMapSubtract([...ARMPOSES], ["Wristtie", "Boxtie", "Up"]),
                    GlobalDefaultOverride: globalThis.ToMap(["Front", "Crossed"]),
                    SwapLayerPose: {Crossed: "CrossMittenRight", Front: "ForeMittenRight"},
                    TieToLayer: "LongMittenRight",
                    NoOverride: true,
                    InheritColor: "Lock",
                },
                { Name: "GlowForeLongMittenRight", Layer: "ForeMittenRight", Pri: 20.4,
                    Poses: globalThis.ToMap([...FOREARMPOSES]),
                    GlobalDefaultOverride: globalThis.ToMap(["Front", "Crossed"]),
                    SwapLayerPose: {Crossed: "CrossGloveRight"},
                    TieToLayer: "ForeLongMittenRight",
                    NoOverride: true,
                    InheritColor: "Glow",
                },
                { Name: "GlowLongMittenRight", Layer: "MittenRight", Pri: 120.4,
                    Poses: globalThis.ToMapSubtract([...ARMPOSES], ["Wristtie", "Boxtie", "Up"]),
                    GlobalDefaultOverride: globalThis.ToMap(["Front", "Crossed"]),
                    SwapLayerPose: {Crossed: "CrossMittenRight", Front: "ForeMittenRight"},
                    TieToLayer: "LongMittenRight",
                    NoOverride: true,
                    InheritColor: "Glow",
                },
        
        
        
                { Name: "StrapsForeLongMittenRight", Layer: "ForeMittenRight", Pri: 20.1,
                    Poses: globalThis.ToMap([...FOREARMPOSES]),
                    GlobalDefaultOverride: globalThis.ToMap(["Front", "Crossed"]),
                    SwapLayerPose: {Crossed: "CrossGloveRight"},
                    TieToLayer: "ForeLongMittenRight",
                    NoOverride: true,
                    InheritColor: "Straps",
                },
                { Name: "StrapsLongMittenRight", Layer: "MittenRight", Pri: 120.1,
                    Poses: globalThis.ToMap([...ARMPOSES]),
                    GlobalDefaultOverride: globalThis.ToMap(["Front", "Crossed"]),
                    SwapLayerPose: {Crossed: "CrossMittenRight", Front: "ForeMittenRight"},
                    TieToLayer: "LongMittenRight",
                    NoOverride: true,
                    InheritColor: "Straps",
                },
                { Name: "UpperCuffForeLongMittenRight", Layer: "ForeMittenRight", Pri: 20.1,
                    Poses: globalThis.ToMap([...FOREARMPOSES]),
                    GlobalDefaultOverride: globalThis.ToMap(["Front", "Crossed"]),
                    SwapLayerPose: {Crossed: "CrossGloveRight"},
                    TieToLayer: "ForeLongMittenRight",
                    NoOverride: true,
                    InheritColor: "UpperCuff",
                },
                { Name: "UpperCuffLongMittenRight", Layer: "MittenRight", Pri: 120.1,
                    Poses: globalThis.ToMap([...ARMPOSES]),
                    GlobalDefaultOverride: globalThis.ToMap(["Front", "Crossed"]),
                    SwapLayerPose: {Crossed: "CrossMittenRight", Front: "ForeMittenRight"},
                    TieToLayer: "LongMittenRight",
                    NoOverride: true,
                    InheritColor: "UpperCuff",
                    Folder: 'CyberMitts'
                },
                { Name: "UpperDisplayLongMittenRight", Layer: "MittenRight", Pri: 120.2,
                    Poses: globalThis.ToMap([...ARMPOSES]),
                    GlobalDefaultOverride: globalThis.ToMap(["Front", "Crossed"]),
                    SwapLayerPose: {Crossed: "CrossMittenRight", Front: "ForeMittenRight"},
                    TieToLayer: "LongMittenRight",
                    NoOverride: true,
                    InheritColor: "UpperDisplay",
                    Folder: 'CyberMitts'
                },
                { Name: "UpperLockLongMittenRight", Layer: "MittenRight", Pri: 120.3,
                    Poses: globalThis.ToMap([...ARMPOSES]),
                    GlobalDefaultOverride: globalThis.ToMap(["Front", "Crossed"]),
                    SwapLayerPose: {Crossed: "CrossMittenRight", Front: "ForeMittenRight"},
                    TieToLayer: "LongMittenRight",
                    NoOverride: true,
                    InheritColor: "UpperLock",
                    Folder: 'CyberMitts'
                },
                { Name: "UpperGlowLongMittenRight", Layer: "MittenRight", Pri: 120.4,
                    Poses: globalThis.ToMap([...ARMPOSES]),
                    GlobalDefaultOverride: globalThis.ToMap(["Front", "Crossed"]),
                    SwapLayerPose: {Crossed: "CrossMittenRight", Front: "ForeMittenRight"},
                    TieToLayer: "LongMittenRight",
                    NoOverride: true,
                    InheritColor: "UpperGlow",
                    Folder: 'CyberMitts'
                },
            ])
        })

        globalThis.AddModel({
            Name: SciFiSet.OpenMitten,
            Folder: "CyberArms",
            TopLevel: true,
            Categories: ["Gloves", "Sleeves"],
            AddPose: ["Mittens"],
            Layers: globalThis.ToLayerMap([
                ...globalThis.GetModelLayers(OpenMittenLeft),
                ...globalThis.GetModelLayers(OpenMittenRight),
            ])
        });
    }
)
//#endregion