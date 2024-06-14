import { RootNamespace } from "../../Common";
import { NameOf } from "../../Common/Helpers";

export namespace EquipmentCategory {
    export const DroneEquipment = 'DroneEquipment' as const
    export const Namespace = `${RootNamespace}.${DroneEquipment}`
    export function GetFullNameOf(nameLambda: () => any) {
        return `${Namespace}.${NameOf(nameLambda)}`
    }
    export namespace Controller {
        const SubModuleName = 'Controller' as const
        export const SubNamespace: string = `${Namespace}.${SubModuleName}`
        export const Tag = SubNamespace
        export function GetFullNameOf(nameLambda: () => any) {
            return `${SubNamespace}.${NameOf(nameLambda)}`
        }
    }
    export namespace Sensory {
        const SubModuleName = 'Sensory' as const
        export const SubNamespace: string = `${Namespace}.${SubModuleName}`
        export const Tag = SubNamespace
        export function GetFullNameOf(nameLambda: () => any) {
            return `${SubNamespace}.${NameOf(nameLambda)}`
        }
        export namespace EquipmentTag {
            export const Gag: string = GetFullNameOf(() => Gag)
            export const EarPlug: string = GetFullNameOf(() => EarPlug)
            export const Mask: string = GetFullNameOf(() => Mask)
        }
    }
}