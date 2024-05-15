import { KD } from "../../Common"
declare let HIDEARMPOSES: string[]

const ModelName = {
    LockedGlove: 'LockedGlove',
    LockedGloveLeft: 'LockedGloveLeft',
    LockedGloveRight: 'LockedGloveRight'
} as const

export function Register() {
    AddModel({
        Name: ModelName.LockedGloveLeft,
        Folder: "KDMod/LockedGlove",
        Parent: ModelName.LockedGlove,
        Categories: ["Gloves", "Mittens", "Restraints"],
        Restraint: true,
        AddPose: ["Mittens"],
        Layers: ToLayerMap([
            {
                Name: "ArmLeft", Layer: "MittenLeft", Pri: 100.1,
                Poses: ToMapSubtract(ARMPOSES, [...HIDEARMPOSES], "Hogtie"),
                GlobalDefaultOverride: ToMap(["Hogtie", "Front", "Crossed"]),
                AppendPose: ToMapDupe(["Hogtie"]),
                AppendPoseRequire: ToMap(["Wristtie"]),
                InheritColor: 'GloveBody'
            },
            {
                Name: "ForeArmLeft", Layer: "MittenLeft", Pri: 100.1,
                Poses: ToMap(FOREARMPOSES),
                GlobalDefaultOverride: ToMap(["Front", "Crossed"]),
                SwapLayerPose: { Crossed: "CrossMittenLeft", Front: "ForeMittenLeft" },
                InheritColor: 'GloveBody'
            },
            {
                Name: "HandLeft", Layer: "MittenLeft", Pri: 100.1,
                Poses: ToMap(HANDLEFTPOSES),
                GlobalDefaultOverride: ToMap(["Front"]),
                HidePoses: ToMap(["HideHands", "EncaseHandLeft"]),
                InheritColor: 'GloveBody'
            },
            {
                Name: "ForeHandLeft", Layer: "MittenLeft", Pri: 100.1,
                Sprite: "HandLeft",
                Poses: ToMap(FOREHANDLEFTPOSES),
                GlobalDefaultOverride: ToMap(["Front"]),
                SwapLayerPose: { Crossed: "CrossMittenLeft", Front: "ForeMittenLeft" },
                HidePoses: ToMap(["HideHands", "EncaseHandLeft"]),
                InheritColor: 'GloveBody'
            },
            {
                Name: "ZipperLeft", Layer: "MittenLeft", Pri: 100.2,
                Poses: ToMapSubtract([...ARMPOSES], ["Wristtie", "Boxtie", "Up"]),
                GlobalDefaultOverride: ToMap(["Front", "Crossed"]),
                SwapLayerPose: { Crossed: "CrossMittenLeft", Front: "ForeMittenLeft" },
                // TieToLayer: "LatexLeft",
                NoOverride: true,
                InheritColor: "Zipper",
            },
            {
                Name: "BandLeft", Layer: "MittenLeft", Pri: 100.3,
                Poses: ToMapSubtract([...ARMPOSES], ["Wristtie", "Boxtie", "Up"]),
                GlobalDefaultOverride: ToMap(["Front", "Crossed"]),
                SwapLayerPose: { Crossed: "CrossMittenLeft", Front: "ForeMittenLeft" },
                // TieToLayer: "LongMittenLeft",
                NoOverride: true,
                InheritColor: "Band",
            },
            {
                Name: "LockLeft", Layer: "MittenLeft", Pri: 100.4,
                Poses: ToMapSubtract([...ARMPOSES], ["Wristtie", "Boxtie", "Up"]),
                GlobalDefaultOverride: ToMap(["Front", "Crossed"]),
                SwapLayerPose: { Crossed: "CrossMittenLeft", Front: "ForeMittenLeft" },
                // TieToLayer: "LongMittenLeft",
                NoOverride: true,
                InheritColor: "Lock",
            },
        ])
    })

    AddModel({
        Name: ModelName.LockedGloveRight,
        Folder: "KDMod/LockedGlove",
        Parent: ModelName.LockedGlove,
        Categories: ["Gloves", "Mittens", "Restraints"],
        Restraint: true,
        AddPose: ["Mittens"],
        Layers: ToLayerMap([
            {
                Name: "ArmRight", Layer: "MittenRight", Pri: 100.1,
                Poses: ToMapSubtract(ARMPOSES, [...HIDEARMPOSES], "Hogtie"),
                GlobalDefaultOverride: ToMap(["Hogtie", "Front", "Crossed"]),
                AppendPose: ToMapDupe(["Hogtie"]),
                AppendPoseRequire: ToMap(["Wristtie"]),
                InheritColor: 'GloveBody'
            },
            {
                Name: "ForeArmRight", Layer: "MittenRight", Pri: 100.1,
                Poses: ToMap(FOREARMPOSES),
                GlobalDefaultOverride: ToMap(["Front", "Crossed"]),
                SwapLayerPose: { Crossed: "CrossMittenRight", Front: "ForeMittenRight" },
                InheritColor: 'GloveBody'
            },
            {
                Name: "HandRight", Layer: "MittenRight", Pri: 100.1,
                Poses: ToMap(HANDRIGHTPOSES),
                GlobalDefaultOverride: ToMap(["Front"]),
                HidePoses: ToMap(["HideHands", "EncaseHandRight"]),
                InheritColor: 'GloveBody'
            },
            {
                Name: "ForeHandRight", Layer: "MittenRight", Pri: 100.1,
                Sprite: "HandRight",
                Poses: ToMap(FOREHANDRIGHTPOSES),
                GlobalDefaultOverride: ToMap(["Front"]),
                SwapLayerPose: { Crossed: "CrossMittenRight", Front: "ForeMittenRight" },
                HidePoses: ToMap(["HideHands", "EncaseHandRight"]),
                InheritColor: 'GloveBody'
            },
            {
                Name: "ZipperRight", Layer: "MittenRight", Pri: 100.2,
                Poses: ToMapSubtract([...ARMPOSES], ["Wristtie", "Boxtie", "Up"]),
                GlobalDefaultOverride: ToMap(["Front", "Crossed"]),
                SwapLayerPose: { Crossed: "CrossMittenRight", Front: "ForeMittenRight" },
                // TieToLayer: "LatexRight",
                NoOverride: true,
                InheritColor: "Zipper",
            },
            {
                Name: "BandRight", Layer: "MittenRight", Pri: 100.3,
                Poses: ToMapSubtract([...ARMPOSES], ["Wristtie", "Boxtie", "Up"]),
                GlobalDefaultOverride: ToMap(["Front", "Crossed"]),
                SwapLayerPose: { Crossed: "CrossMittenRight", Front: "ForeMittenRight" },
                // TieToLayer: "LongMittenRight",
                NoOverride: true,
                InheritColor: "Band",
            },
            {
                Name: "LockRight", Layer: "MittenRight", Pri: 100.4,
                Poses: ToMapSubtract([...ARMPOSES], ["Wristtie", "Boxtie", "Up"]),
                GlobalDefaultOverride: ToMap(["Front", "Crossed"]),
                SwapLayerPose: { Crossed: "CrossMittenRight", Front: "ForeMittenRight" },
                // TieToLayer: "LongMittenRight",
                NoOverride: true,
                InheritColor: "Lock",
            }
        ])
    })

    AddModel({
        Name: ModelName.LockedGlove,
        Folder: "KDMod/LockedGlove",
        TopLevel: true,
        Categories: ["Gloves", "Mittens", "Restraints"],
        Restraint: true,
        AddPose: ["Mittens"],
        Layers: ToLayerMap([
            ...KD.GetModelLayers_({
                ModelName: ModelName.LockedGloveLeft
            }),
            ...KD.GetModelLayers_({
                ModelName: ModelName.LockedGloveRight
            }),
        ])
    })
}