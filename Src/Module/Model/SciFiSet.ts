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
    export const EarPlug: string = `${Namespace}.${NameOf(() => EarPlug)}`
    export const Muzzle: string = `${Namespace}.${NameOf(() => Muzzle)}`
    export const MuzzlePlug: string = `${Namespace}.${NameOf(() => MuzzlePlug)}`
    export const Belt: string = `${Namespace}.${NameOf(() => Belt)}`
    export const TighCuff: string = `${Namespace}.${NameOf(() => TighCuff)}`
    export const ArmLink: string = `${Namespace}.${NameOf(() => ArmLink)}`
    export const ArmLinkYoke: string = `${Namespace}.${NameOf(() => ArmLinkYoke)}`
    export const ThighLink: string = `${Namespace}.${NameOf(() => ThighLink)}`
    export const AnkleLink: string = `${Namespace}.${NameOf(() => AnkleLink)}`
    export const Visor: string = `${Namespace}.${NameOf(() => Visor)}`
    export const Mask: string = `${Namespace}.${NameOf(() => Mask)}`
    export const VisorOpaque: string = `${Namespace}.${NameOf(() => VisorOpaque)}`
    export const MaskOpaque: string = `${Namespace}.${NameOf(() => MaskOpaque)}`
}

//#region register
Helpers.RegisterModule(
    `${Namespace}Registered`,
    () =>{
        AddModel(KD.GetModelWithExtraLayers_({
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
        AddModel(GetModelFashionVersion(SciFiSet.Belt, true))
        AddModel(KD.GetModelWithExtraLayers_({
            BaseModel: 'CyberCuffsThigh',
            NewModel: SciFiSet.TighCuff,
            Layers: [
                {
                    Name: "TighPort",
                    Layer: "ThighRight",
                    Poses: ToMap(["Spread"]),
                    Pri: 0,
                    InheritColor: "BaseMetal",
                    Folder: Folder.CuffLink
                }
            ]
        }))
        AddModel(GetModelFashionVersion(SciFiSet.TighCuff, true))
        AddModel({
            Name: SciFiSet.ArmLink,
            Folder: Folder.CuffLink,
            TopLevel: true,
            Categories: ["Restraints", "Cuffs"],
            Restraint: true,
            Layers: ToLayerMap([
                {
                    Name: "WristLink", Layer: "BindChainLinksUnder", Pri: 0,
                    Poses: ToMap(["Free", "Yoked", "Front"]),
                    GlobalDefaultOverride: ToMap(["Front", "Yoked"]),
                    SwapLayerPose: { Yoked: "BindForeWristLeft", Front: "BindForeWristLeft" },
                    InheritColor: "Link",
                },
                {
                    Name: "ElbowLink", Layer: "BindChainLinksUnder", Pri: 0,
                    Poses: ToMap(["Free", "Boxtie", "Yoked"]),
                    GlobalDefaultOverride: ToMap(["Yoked"]),
                    SwapLayerPose: { Yoked: "BindForeWristLeft" },
                    InheritColor: "Link",
                },
            ])
        })
        AddModel(GetModelFashionVersion(SciFiSet.ArmLink, true))
        AddModel({
            Name: SciFiSet.ArmLinkYoke,
            Folder: Folder.CuffLink,
            TopLevel: true,
            Categories: ["Restraints", "Cuffs"],
            Restraint: true,
            Layers: ToLayerMap([
                {
                    Name: "WristLink", Layer: "BindChainLinksUnder", Pri: 0,
                    Poses: ToMap(["Yoked"]),
                    GlobalDefaultOverride: ToMap(["Front", "Crossed"]),
                    // SwapLayerPose: { Crossed: "CrossMittenLeft", Front: "ForeMittenLeft" },
                    InheritColor: "Link",
                },
                {
                    Name: "ElbowLink", Layer: "BindChainLinksUnder", Pri: 0,
                    Poses: ToMap(["Yoked"]),
                    GlobalDefaultOverride: ToMap(["Front", "Crossed"]),
                    // SwapLayerPose: { Crossed: "CrossMittenLeft", Front: "ForeMittenLeft" },
                    InheritColor: "Link",
                },
            ])
        })
        AddModel(GetModelFashionVersion(SciFiSet.ArmLinkYoke, true))
        AddModel({
            Name: SciFiSet.ThighLink,
            Folder: Folder.CuffLink,
            TopLevel: true,
            Restraint: true,
            Categories: ["Restraints", "Cuffs", "Links"],
            Layers: ToLayerMap([
                {
                    Name: "ThighLink", Layer: "BindChainLinksUnder", Pri: 0,
                    Poses: ToMap(["Spread"]),
                    InheritColor: "Link",
                },
            ])
        })
        AddModel(GetModelFashionVersion(SciFiSet.ThighLink, true))
        AddModel({
            Name: SciFiSet.AnkleLink,
            Folder: Folder.CuffLink,
            TopLevel: true,
            Restraint: true,
            Categories: ["Restraints", "Cuffs", "Links"],
            Layers: ToLayerMap([
                {
                    Name: "AnkleLink", Layer: "BindChainLinksUnder", Pri: 0,
                    Poses: ToMap(["Spread"]),
                    InheritColor: "Link",
                },
            ])
        })
        AddModel(GetModelFashionVersion(SciFiSet.AnkleLink, true))
        AddModel({
            Name: SciFiSet.EarPlug,
            TopLevel: true,
            Protected: true,
            Categories: ["Body", "Face", "Cosplay"],
            Folder: Folder.EarPlug,
            Layers: ToLayerMap([
                {
                    Name: "EarPlugFront", Layer: "Head", Pri: 0.3,
                    Invariant: true,
                    InheritColor: 'BaseMetal',
                    HidePoses: ToMap(["Cosplay", "AnimalEars"]),
                },
                {
                    Name: "ElfEarPlugFront", Layer: "Head", Pri: 0.3,
                    Invariant: true,
                    InheritColor: 'BaseMetal',
                    RequirePoses: ToMap(["Cosplay"]),
                    HidePoses: ToMap(["AnimalEars"]),
                },
                {
                    Name: "ElfEarPlugBack", Layer: "Head", Pri: -0.09,
                    Invariant: true,
                    InheritColor: 'BaseMetal',
                    RequirePoses: ToMap(["Cosplay"]),
                    HidePoses: ToMap(["AnimalEars"]),
                },
            ])
        })
        AddModel(GetModelFashionVersion(SciFiSet.EarPlug, true))
    
        const unwantedLayers =
            GetModelLayers('AdvancedSciFiMuzzle')
                .map(layer => layer.Name)
                .concat('Ball')
        AddModel(KD.GetModelWithExtraLayers_({
            BaseModel: 'AdvancedSciFiMuzzle',
            NewModel: SciFiSet.Muzzle,
            Layers:
                GetModelLayers('UltimateSciFiBallGag')
                    .filter(ballGagLayer => !unwantedLayers.some(unwantedLayer => ballGagLayer.Name === unwantedLayer))
        }))
        AddModel(GetModelFashionVersion(SciFiSet.Muzzle, true))
    
        AddModel(KD.GetModelWithExtraLayers_({
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
        AddModel(GetModelFashionVersion(SciFiSet.MuzzlePlug, true))
    
        AddModel({
            Name: SciFiSet.Visor,
            Folder: Folder.Visor,
            TopLevel: true,
            Categories: ["Accessories", "Face"],
            Layers: ToLayerMap([
                {
                    Name: "VisorGlass", Layer: "Goggles", Pri: 14,
                    InheritColor: "Goggles",
                    Invariant: true,
                    HideWhenOverridden: true,
                },
            ])
        })
        AddModel(GetModelFashionVersion(SciFiSet.Visor, true))
    
        AddModel({
            Name: SciFiSet.VisorOpaque,
            Folder: Folder.Visor,
            TopLevel: true,
            Categories: ["Accessories", "Face"],
            Layers: ToLayerMap([
                {
                    Name: "VisorOpaque", Layer: "Blindfold", Pri: 14,
                    InheritColor: "Goggles",
                    Invariant: true,
                    HideWhenOverridden: true,
                },
            ])
        })
        AddModel(GetModelFashionVersion(SciFiSet.Visor, true))
    
        AddModel({
            Name: SciFiSet.Mask,
            Folder: Folder.Visor,
            TopLevel: true,
            Categories: ["Accessories", "Face"],
            AddPoseConditional: {
                Xray: ["HoodMask",],
            },
            Layers: ToLayerMap([
                {
                    Name: "FullMaskGlass", Layer: "Hood", Pri: -10,
                    InheritColor: "FullVisor",
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
                    TieToLayer: "FullMaskGlass",
                    Folder: 'Visors',
                    SwapLayerPose: { 
                        Xray: "GagStraps"
                     },
                },
            ])
        })
        AddModel(GetModelFashionVersion(SciFiSet.Mask, true))
    
        AddModel({
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
            Layers: ToLayerMap([
                {
                    Name: "FullMaskOpaque", Layer: "Hood", Pri: -10,
                    InheritColor: "FullVisor",
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
        AddModel(GetModelFashionVersion(SciFiSet.MaskOpaque, true))
    }
)
//#endregion