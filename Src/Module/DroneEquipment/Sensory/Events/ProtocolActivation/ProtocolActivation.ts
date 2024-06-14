import { EquipmentCategory } from "../../../Constants"
import Category = EquipmentCategory.Sensory
import GetFullNameOf = Category.GetFullNameOf

export const EventName = GetFullNameOf('ProtocalActivation' as any)

export interface EventData {
    EquipmentCategory: string
}