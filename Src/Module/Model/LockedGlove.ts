import { Helpers, KD, RootNamespace } from "../../Common"
import { NameOf } from "../../Common/Helpers"
declare let HIDEARMPOSES: string[]

const Folder = `${RootNamespace}/LockedGlove` as const
const Namespace: string = `${RootNamespace}.${NameOf(() => LockedGlove)}`

export namespace LockedGlove {
    export const Glove: string = `${Namespace}.${NameOf(() => Glove)}`
    export const GloveLeft: string = `${Namespace}.${NameOf(() => GloveLeft)}`
    export const GloveRight: string = `${Namespace}.${NameOf(() => GloveRight)}`
}

//#endregion register
Helpers.RegisterModule(
    `${Namespace}Registred`,
    () =>{
        AddModel({
            Name: LockedGlove.GloveLeft,
            Folder: Folder,
            Parent: LockedGlove.Glove,
            Categories: ["Gloves", "Mittens", "Restraints"],
            Restraint: true,
            AddPose: ["Mittens"],
            Layers: ToLayerMap([
                {
                    Name: "ArmLeft", Layer: "GloveLeft", Pri: 100.1,
                    Poses: ToMapSubtract(ARMPOSES, [...HIDEARMPOSES], "Hogtie"),
                    GlobalDefaultOverride: ToMap(["Hogtie", "Front", "Crossed"]),
                    AppendPose: ToMapDupe(["Hogtie"]),
                    AppendPoseRequire: ToMap(["Wristtie"]),
                    InheritColor: 'GloveBody'
                },
                {
                    Name: "ForeArmLeft", Layer: "GloveLeft", Pri: 100.1,
                    Poses: ToMap(FOREARMPOSES),
                    GlobalDefaultOverride: ToMap(["Front", "Crossed"]),
                    SwapLayerPose: { Crossed: "CrossGloveLeft", Front: "ForeGloveLeft" },
                    InheritColor: 'GloveBody'
                },
                {
                    Name: "HandLeft", Layer: "GloveLeft", Pri: 100.1,
                    Poses: ToMap(HANDLEFTPOSES),
                    GlobalDefaultOverride: ToMap(["Front"]),
                    HidePoses: ToMap(["HideHands", "EncaseHandLeft"]),
                    InheritColor: 'GloveBody'
                },
                {
                    Name: "ForeHandLeft", Layer: "GloveLeft", Pri: 100.1,
                    Sprite: "HandLeft",
                    Poses: ToMap(FOREHANDLEFTPOSES),
                    GlobalDefaultOverride: ToMap(["Front"]),
                    SwapLayerPose: { Crossed: "CrossGloveLeft", Front: "ForeGloveLeft" },
                    HidePoses: ToMap(["HideHands", "EncaseHandLeft"]),
                    InheritColor: 'GloveBody'
                },
                {
                    Name: "ZipperLeft", Layer: "GloveLeft", Pri: 100.2,
                    Poses: ToMapSubtract([...ARMPOSES], ["Wristtie", "Boxtie", "Up"]),
                    GlobalDefaultOverride: ToMap(["Front", "Crossed"]),
                    SwapLayerPose: { Crossed: "CrossGloveLeft", Front: "ForeGloveLeft" },
                    // TieToLayer: "LatexLeft",
                    NoOverride: true,
                    InheritColor: "Zipper",
                },
                {
                    Name: "BandLeft", Layer: "GloveLeft", Pri: 100.3,
                    Poses: ToMapSubtract([...ARMPOSES], ["Wristtie", "Boxtie", "Up"]),
                    GlobalDefaultOverride: ToMap(["Front", "Crossed"]),
                    SwapLayerPose: { Crossed: "CrossGloveLeft", Front: "ForeGloveLeft" },
                    // TieToLayer: "LongGloveLeft",
                    NoOverride: true,
                    InheritColor: "Band",
                },
                {
                    Name: "LockLeft", Layer: "GloveLeft", Pri: 100.4,
                    Poses: ToMapSubtract([...ARMPOSES], ["Wristtie", "Boxtie", "Up"]),
                    GlobalDefaultOverride: ToMap(["Front", "Crossed"]),
                    SwapLayerPose: { Crossed: "CrossGloveLeft", Front: "ForeGloveLeft" },
                    // TieToLayer: "LongGloveLeft",
                    NoOverride: true,
                    InheritColor: "Lock",
                },
            ])
        })
        
        AddModel({
            Name: LockedGlove.GloveRight,
            Folder: Folder,
            Parent: LockedGlove.Glove,
            Categories: ["Gloves", "Mittens", "Restraints"],
            Restraint: true,
            AddPose: ["Mittens"],
            Layers: ToLayerMap([
                {
                    Name: "ArmRight", Layer: "GloveRight", Pri: 100.1,
                    Poses: ToMapSubtract(ARMPOSES, [...HIDEARMPOSES], "Hogtie"),
                    GlobalDefaultOverride: ToMap(["Hogtie", "Front", "Crossed"]),
                    AppendPose: ToMapDupe(["Hogtie"]),
                    AppendPoseRequire: ToMap(["Wristtie"]),
                    InheritColor: 'GloveBody'
                },
                {
                    Name: "ForeArmRight", Layer: "GloveRight", Pri: 100.1,
                    Poses: ToMap(FOREARMPOSES),
                    GlobalDefaultOverride: ToMap(["Front", "Crossed"]),
                    SwapLayerPose: { Crossed: "CrossGloveRight", Front: "ForeGloveRight" },
                    InheritColor: 'GloveBody'
                },
                {
                    Name: "HandRight", Layer: "GloveRight", Pri: 100.1,
                    Poses: ToMap(HANDRIGHTPOSES),
                    GlobalDefaultOverride: ToMap(["Front"]),
                    HidePoses: ToMap(["HideHands", "EncaseHandRight"]),
                    InheritColor: 'GloveBody'
                },
                {
                    Name: "ForeHandRight", Layer: "GloveRight", Pri: 100.1,
                    Sprite: "HandRight",
                    Poses: ToMap(FOREHANDRIGHTPOSES),
                    GlobalDefaultOverride: ToMap(["Front"]),
                    SwapLayerPose: { Crossed: "CrossGloveRight", Front: "ForeGloveRight" },
                    HidePoses: ToMap(["HideHands", "EncaseHandRight"]),
                    InheritColor: 'GloveBody'
                },
                {
                    Name: "ZipperRight", Layer: "GloveRight", Pri: 100.2,
                    Poses: ToMapSubtract([...ARMPOSES], ["Wristtie", "Boxtie", "Up"]),
                    GlobalDefaultOverride: ToMap(["Front", "Crossed"]),
                    SwapLayerPose: { Crossed: "CrossGloveRight", Front: "ForeGloveRight" },
                    // TieToLayer: "LatexRight",
                    NoOverride: true,
                    InheritColor: "Zipper",
                },
                {
                    Name: "BandRight", Layer: "GloveRight", Pri: 100.3,
                    Poses: ToMapSubtract([...ARMPOSES], ["Wristtie", "Boxtie", "Up"]),
                    GlobalDefaultOverride: ToMap(["Front", "Crossed"]),
                    SwapLayerPose: { Crossed: "CrossGloveRight", Front: "ForeGloveRight" },
                    // TieToLayer: "LongGloveRight",
                    NoOverride: true,
                    InheritColor: "Band",
                },
                {
                    Name: "LockRight", Layer: "GloveRight", Pri: 100.4,
                    Poses: ToMapSubtract([...ARMPOSES], ["Wristtie", "Boxtie", "Up"]),
                    GlobalDefaultOverride: ToMap(["Front", "Crossed"]),
                    SwapLayerPose: { Crossed: "CrossGloveRight", Front: "ForeGloveRight" },
                    // TieToLayer: "LongGloveRight",
                    NoOverride: true,
                    InheritColor: "Lock",
                }
            ])
        })
        
        AddModel({
            Name: LockedGlove.Glove,
            Folder: Folder,
            TopLevel: true,
            Categories: ["Gloves", "Mittens", "Restraints"],
            Restraint: true,
            AddPose: ["Mittens"],
            Layers: ToLayerMap([
                ...KD.GetModelLayers_({
                    ModelName: LockedGlove.GloveLeft
                }),
                ...KD.GetModelLayers_({
                    ModelName: LockedGlove.GloveRight
                }),
            ])
        })
    }
)
//#endregion