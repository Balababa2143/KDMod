import { RootNamespace } from "../../Common";
import { NameOf } from "../../Common/Helpers";

export namespace EquipmentCategory {
    export const DroneEquipment = 'DroneEquipment' as const
    export namespace Sensory {
        export const SubModuleName = 'Sensory' as const
        export const Namespace: string = `${RootNamespace}.${DroneEquipment}.${SubModuleName}`
        export function GetFullNameOf(nameLambda: () => any) {
            return `${Namespace}.${NameOf(nameLambda)}`
        }
        export const Gag: string = GetFullNameOf(() => Gag)
        export const EarPlug: string = GetFullNameOf(() => EarPlug)
        export const Mask: string = GetFullNameOf(() => Mask)
    }
}