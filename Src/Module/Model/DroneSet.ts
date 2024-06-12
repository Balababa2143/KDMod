import { KD } from '../../Common'
import { RootNamespace } from '../../Common'
import { NameOf } from '../../Common/Helpers'

namespace Folder {
    export const CuffLink = `${RootNamespace}/CuffLink` as const
    export const EarPlug = `${RootNamespace}/EarPlug` as const
    export const Visor = `${RootNamespace}/Visor`
}

export namespace DroneSet {
    export const EarPlug: string = `${RootNamespace}.${NameOf(() => DroneSet)}.${NameOf(() => EarPlug)}`
    export const Muzzle: string = `${RootNamespace}.${NameOf(() => DroneSet)}.${NameOf(() => Muzzle)}`
    export const MuzzlePlug: string = `${RootNamespace}.${NameOf(() => DroneSet)}.${NameOf(() => MuzzlePlug)}`
    export const Belt: string = `${RootNamespace}.${NameOf(() => DroneSet)}.${NameOf(() => Belt)}`
    export const TighCuff: string = `${RootNamespace}.${NameOf(() => DroneSet)}.${NameOf(() => TighCuff)}`
    export const ArmLink: string = `${RootNamespace}.${NameOf(() => DroneSet)}.${NameOf(() => ArmLink)}`
    export const ArmLinkYoke: string = `${RootNamespace}.${NameOf(() => DroneSet)}.${NameOf(() => ArmLinkYoke)}`
    export const ThighLink: string = `${RootNamespace}.${NameOf(() => DroneSet)}.${NameOf(() => ThighLink)}`
    export const AnkleLink: string = `${RootNamespace}.${NameOf(() => DroneSet)}.${NameOf(() => AnkleLink)}`
    export const Visor: string = `${RootNamespace}.${NameOf(() => DroneSet)}.${NameOf(() => Visor)}`
    export const Mask: string = `${RootNamespace}.${NameOf(() => DroneSet)}.${NameOf(() => Mask)}`
    export const VisorOpaque: string = `${RootNamespace}.${NameOf(() => DroneSet)}.${NameOf(() => VisorOpaque)}`
    export const MaskOpaque: string = `${RootNamespace}.${NameOf(() => DroneSet)}.${NameOf(() => MaskOpaque)}`
}

export function Register() {
    AddModel(KD.GetModelWithExtraLayers_({
        BaseModel: 'NeoCyberBelt',
        NewModel: DroneSet.Belt,
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
    AddModel(GetModelFashionVersion(DroneSet.Belt, true))
    AddModel(KD.GetModelWithExtraLayers_({
        BaseModel: 'CyberCuffsThigh',
        NewModel: DroneSet.TighCuff,
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
    AddModel(GetModelFashionVersion(DroneSet.TighCuff, true))
    AddModel({
        Name: DroneSet.ArmLink,
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
    AddModel(GetModelFashionVersion(DroneSet.ArmLink, true))
    AddModel({
        Name: DroneSet.ArmLinkYoke,
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
    AddModel(GetModelFashionVersion(DroneSet.ArmLinkYoke, true))
    AddModel({
        Name: DroneSet.ThighLink,
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
    AddModel(GetModelFashionVersion(DroneSet.ThighLink, true))
    AddModel({
        Name: DroneSet.AnkleLink,
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
    AddModel(GetModelFashionVersion(DroneSet.AnkleLink, true))
    AddModel({
        Name: DroneSet.EarPlug,
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
    AddModel(GetModelFashionVersion(DroneSet.EarPlug, true))

    const unwantedLayers =
        GetModelLayers('AdvancedSciFiMuzzle')
            .map(layer => layer.Name)
            .concat('Ball')
    AddModel(KD.GetModelWithExtraLayers_({
        BaseModel: 'AdvancedSciFiMuzzle',
        NewModel: DroneSet.Muzzle,
        Layers:
            GetModelLayers('UltimateSciFiBallGag')
                .filter(ballGagLayer => !unwantedLayers.some(unwantedLayer => ballGagLayer.Name === unwantedLayer))
    }))
    AddModel(GetModelFashionVersion(DroneSet.Muzzle, true))

    AddModel(KD.GetModelWithExtraLayers_({
        BaseModel: DroneSet.Muzzle,
        NewModel: DroneSet.MuzzlePlug,
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
    AddModel(GetModelFashionVersion(DroneSet.MuzzlePlug, true))

    AddModel({
        Name: DroneSet.Visor,
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
    AddModel(GetModelFashionVersion(DroneSet.Visor, true))

    AddModel({
        Name: DroneSet.VisorOpaque,
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
    AddModel(GetModelFashionVersion(DroneSet.Visor, true))

    AddModel({
        Name: DroneSet.Mask,
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
    AddModel(GetModelFashionVersion(DroneSet.Mask, true))

    AddModel({
        Name: DroneSet.MaskOpaque,
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
    AddModel(GetModelFashionVersion(DroneSet.MaskOpaque, true))

}