import { Helpers, RootNamespace } from "../../Common"
import { NameOf } from "../../Common/Helpers"

function ImplementNamespace(args:{module: object, name: string, containtingNamespace: string}){
    const {module, name, containtingNamespace} = args
    const fullName = `${containtingNamespace}.${name}`
    Object.defineProperties(module,{
        Name:{
            get() {
                return name
            },
            configurable: false
        },
        FullName:{
            get() {
                return fullName
            },
            configurable: false
        },
        SubGetFullName:{
            get() {
                return (nameLambda: () => any) => `${fullName}${NameOf(nameLambda)}`
            },
            configurable: false
        }
    })
}

export namespace EquipmentCategory {

    export declare const Name: string
    export declare const FullName: string
    export declare const SubGetFullName: (nameLambda: () => any) => string
    ImplementNamespace({
        module: EquipmentCategory,
        containtingNamespace: RootNamespace,
        name: NameOf(() => EquipmentCategory)
    })

    export namespace Controller {
        export declare const Name: string
        export declare const FullName: string
        export declare const SubGetFullName: (nameLambda: () => any) => string
        ImplementNamespace({
            module: Controller,
            containtingNamespace: EquipmentCategory.FullName,
            name: NameOf(() => Controller)
        })
    }
    export namespace Sensory {
        export declare const Name: string
        export declare const FullName: string
        export declare const SubGetFullName: (nameLambda: () => any) => string
        ImplementNamespace({
            module: Sensory,
            containtingNamespace: EquipmentCategory.FullName,
            name: NameOf(() => Controller)
        })

        export namespace EquipmentTag {
            export const Gag: string = SubGetFullName(() => Gag)
            export const EarPlug: string = SubGetFullName(() => EarPlug)
            export const Mask: string = SubGetFullName(() => Mask)
        }
    }

    export namespace Cuff {
        export declare const Name: string
        export declare const FullName: string
        export declare const SubGetFullName: (nameLambda: () => any) => string
        ImplementNamespace({
            module: Cuff,
            containtingNamespace: EquipmentCategory.FullName,
            name: NameOf(() => Cuff)
        })

        export namespace EquipmentTag {
            export const Torso: string = SubGetFullName(() => Torso)
            export const Arm: string = SubGetFullName(() => Arm)
            export const Thigh: string = SubGetFullName(() => Thigh)
            export const Ankle: string = SubGetFullName(() => Ankle)
        }
    }
}

export namespace ItemTags {
    export declare const Name: string
    export declare const FullName: string
    export declare const SubGetFullName: (nameLambda: () => any) => string
    ImplementNamespace({
        module: ItemTags,
        containtingNamespace: RootNamespace,
        name: NameOf(() => ItemTags)
    })
    export namespace CyberDrone {
        export declare const Name: string
        export declare const FullName: string
        export declare const SubGetFullName: (nameLambda: () => any) => string
        ImplementNamespace({
            module: CyberDrone,
            containtingNamespace: CyberDrone.FullName,
            name: NameOf(() => CyberDrone)
        })
        export const Controller = SubGetFullName(() => Controller)
        export const Equipment = SubGetFullName(() => Equipment)
    }
}