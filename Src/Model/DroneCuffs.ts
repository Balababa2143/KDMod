import { KDInterface as KD } from 'kinkydungeoninterfacewrapper'
declare let HIDEARMPOSES: string[]

const ModelFolder = 'KDMod/CuffLink' as const

export const ModelName = {
    Belt: 'KDMod.CuffLink.Belt',
    TighCuff: 'KDMod.CuffLink.ArmCuff',
    ArmLink: 'KDMod.CuffLink.ArmLink',
    ArmLinkYoke: 'KDMod.CuffLink.ArmLinkYoke',
    ThighLink: 'KDMod.CuffLink.ThighLink',
    AnkleLink: 'KDMod.CuffLink.AnkleLink'
} as const

export function Register() {
    AddModel(KD.GetModelWithExtraLayers_({
        BaseModel: 'NeoCyberBelt',
        NewModel: ModelName.Belt,
        Layers: [
            {
                Name: "BeltPort",
                Layer: "BeltBondage",
                Invariant: true,
                Pri: 0,
                InheritColor: "BaseMetal",
                Folder: ModelFolder
            }
        ]
    }))
    AddModel(GetModelFashionVersion(ModelName.Belt, true))
    AddModel(KD.GetModelWithExtraLayers_({
        BaseModel: 'CyberCuffsThigh',
        NewModel: ModelName.TighCuff,
        Layers: [
            {
                Name: "TighPort",
                Layer: "ThighRight",
                Poses: ToMap(["Spread"]),
                Pri: 0,
                InheritColor: "BaseMetal",
                Folder: ModelFolder
            }
        ]
    }))
    AddModel(GetModelFashionVersion(ModelName.TighCuff, true))
    AddModel({
        Name: ModelName.ArmLink,
        Folder: ModelFolder,
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
    AddModel(GetModelFashionVersion(ModelName.ArmLink, true))
    AddModel({
        Name: ModelName.ArmLinkYoke,
        Folder: ModelFolder,
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
    AddModel(GetModelFashionVersion(ModelName.ArmLinkYoke, true))
    AddModel({
        Name: ModelName.ThighLink,
        Folder: ModelFolder,
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
    AddModel(GetModelFashionVersion(ModelName.ThighLink, true))
    AddModel({
        Name: ModelName.AnkleLink,
        Folder: ModelFolder,
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
    AddModel(GetModelFashionVersion(ModelName.AnkleLink, true))
}