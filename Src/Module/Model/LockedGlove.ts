import { Helpers, KD, RootNamespace } from "../../Common"
import { NameOf } from "../../Common/Helpers"
declare let HIDEARMPOSES: string[]

const Folder = `${RootNamespace}/LockedGlove` as const
const CatsuitFolder = 'Catsuit' as const
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
            Folder: CatsuitFolder,
            Parent: LockedGlove.Glove,
            Categories: ["Gloves", "Mittens", "Restraints"],
            Restraint: true,
            AddPose: ["Mittens"],
            Layers: ToLayerMap([
                { Name: "ArmLeft", Layer: "GloveLeft", Pri: 1 + 100,
                    Poses: ToMapSubtract(ARMPOSES, [...HIDEARMPOSES], "Hogtie"),
                    GlobalDefaultOverride: ToMap(["Hogtie", "Front", "Crossed"]),
                    AppendPose: ToMapDupe(["Hogtie"]),
                    AppendPoseRequire: ToMap(["Wristtie"]),
                    Folder: Folder
                },
                { Name: "ForeArmLeft", Layer: "ForeGloveLeft", Pri: 1 + 100,
                    Poses: ToMap(FOREARMPOSES),
                    GlobalDefaultOverride: ToMap(["Front", "Crossed"]),
                    SwapLayerPose: {Crossed: "CrossArmLeft"},
                },
                { Name: "HandLeft", Layer: "GloveLeft", Pri: 1 + 100,
                    Poses: ToMap(HANDLEFTPOSES),
                    GlobalDefaultOverride: ToMap(["Front"]),
                    HidePoses: ToMap(["HideHands", "EncaseHandLeft"]),
                },
                { Name: "ForeHandLeft", Layer: "ForeGloveLeft", Pri: 1 + 100,
                    Sprite: "HandLeft",
                    Poses: ToMap(FOREHANDLEFTPOSES),
                    GlobalDefaultOverride: ToMap(["Front"]),
                    HidePoses: ToMap(["HideHands", "EncaseHandLeft"]),
                },
            ])
        })
        
        AddModel({
            Name: LockedGlove.GloveRight,
            Folder: CatsuitFolder,
            Parent: LockedGlove.Glove,
            Categories: ["Gloves", "Mittens", "Restraints"],
            Restraint: true,
            AddPose: ["Mittens"],
            Layers: ToLayerMap([
                { Name: "ArmRight", Layer: "GloveRight", Pri: 1 + 100,
                    Poses: ToMapSubtract(ARMPOSES, [...HIDEARMPOSES], "Hogtie"),
                    GlobalDefaultOverride: ToMap(["Hogtie", "Front", "Crossed"]),
                    AppendPose: ToMapDupe(["Hogtie"]),
                    AppendPoseRequire: ToMap(["Wristtie"]),
                    Folder: Folder
                },
                { Name: "ForeArmRight", Layer: "ForeGloveRight", Pri: 1 + 100,
                    Poses: ToMap(FOREARMPOSES),
                    GlobalDefaultOverride: ToMap(["Front", "Crossed"]),
                    SwapLayerPose: {Crossed: "CrossArmRight"},
                },
                { Name: "HandRight", Layer: "GloveRight", Pri: 1 + 100,
                    Poses: ToMap(HANDRIGHTPOSES),
                    GlobalDefaultOverride: ToMap(["Front"]),
                    HidePoses: ToMap(["HideHands", "EncaseHandRight"]),
                },
                { Name: "ForeHandRight", Layer: "ForeGloveRight", Pri: 1 + 100,
                    Sprite: "HandRight",
                    Poses: ToMap(FOREHANDRIGHTPOSES),
                    GlobalDefaultOverride: ToMap(["Front"]),
                    HidePoses: ToMap(["HideHands", "EncaseHandRight"]),
                },
            ])
        })
        
        AddModel({
            Name: LockedGlove.Glove,
            Folder: CatsuitFolder,
            TopLevel: true,
            Categories: ["Gloves", "Mittens", "Restraints"],
            Restraint: true,
            AddPose: ["Mittens"],
            Layers: ToLayerMap([
                ...KD.GetModelLayers_({
                    ModelName: LockedGlove.GloveLeft,
                    InheritColor: "GloveBody"
                }),
                ...KD.GetModelLayers_({
                    ModelName: LockedGlove.GloveRight,
                    InheritColor: "GloveBody"
                }),
            ])
        })
    }
)
//#endregion