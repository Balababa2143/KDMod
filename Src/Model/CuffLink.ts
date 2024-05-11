import { KDInterface as KD } from 'kinkydungeoninterfacewrapper'
declare let HIDEARMPOSES: string[]

export const ModelName = {
    ArmLink: 'ArmLink'
} as const

export function Register(){
    AddModel({
        Name: ModelName.ArmLink,
        Folder: "KDMod/CuffLink",
        TopLevel: true,
        Categories: ["Restraints","Cuffs"],
        Restraint: true,
        Layers: ToLayerMap([
            {
                Name: "WristLink", Layer: "BindChainLinksUnder", Pri: 0,
                Poses: ToMap(["Free"]),
                GlobalDefaultOverride: ToMap(["Front", "Crossed"]),
                // SwapLayerPose: { Crossed: "CrossMittenLeft", Front: "ForeMittenLeft" },
                InheritColor: "Link",
            },
            {
                Name: "ElbowLink", Layer: "BindChainLinksUnder", Pri: 0,
                Poses: ToMap(["Free", "Boxtie"]),
                GlobalDefaultOverride: ToMap(["Front", "Crossed"]),
                // SwapLayerPose: { Crossed: "CrossMittenLeft", Front: "ForeMittenLeft" },
                InheritColor: "Link",
            },
        ])
    })
    AddModel(GetModelFashionVersion(ModelName.ArmLink, true))
}