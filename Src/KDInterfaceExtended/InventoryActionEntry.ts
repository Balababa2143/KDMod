import * as IM from 'immutable'
import { DEFAULT } from '../Common';

export interface InventoryActionEntryData {
    Name: string,
    Data: KDInventoryActionDef
}

export class InventoryActionEntry extends
    IM.Record<InventoryActionEntryData>({
        Name: DEFAULT,
        Data: {
            text: undefined,
            label: undefined,
            itemlabel: undefined,
            labelcolor: undefined,
            itemlabelcolor: undefined,
            show: undefined,
            valid: (player: entity, item: item) => true,
            click: (player: entity, item: item,) => {},
            cancel: (player: entity, delta: number) => false,
            icon: (player: entity, item: item) => DEFAULT,
            alsoShow: undefined,
        }
    })
{
    constructor(prop: InventoryActionEntryData){
        super(prop)
    }
    declare toJS: ()=> InventoryActionEntry
    static Register(def: InventoryActionEntry){
        KDInventoryAction[def.Name] = def.Data
        // TODO: inject interactive button without modify the original inventory action filter
        /**
         * This is a dirty trick to make the new interactive button show up
         * need to engineer a cleaner way
         */
        const oldFilter = KDInventoryActionsDefault.restraint
        KDInventoryActionsDefault.restraint = function(item){
            const ret = oldFilter(item)
            ret.push(def.Name)
            return ret
        }
    }
}