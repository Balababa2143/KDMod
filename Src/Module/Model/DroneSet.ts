import { KD } from '../../Common'
import { RootNamespace } from '../../Common'
import { NameOf } from '../../Common/Helpers'

namespace Folder {
    export const CuffLink = 'KDMod/CuffLink' as const
    export const EarPlug = 'KDMod/EarPlug' as const
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
                Name: "EarPlugFront", Layer: "Head", Pri: 10,
                Invariant: true,
                InheritColor: 'BaseMetal',
                HidePoses: ToMap(["Cosplay", "AnimalEars"]),
            },
            {
                Name: "ElfEarPlugFront", Layer: "Head", Pri: 10,
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
}