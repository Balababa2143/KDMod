import { RootNamespace } from "../../Common"
import { KDInterface as KD } from "kinkydungeoninterfacewrapper"
import { NameOf } from "../../Common/Helpers"
import { CurseData, Curse } from "../../KDInterfaceExtended"

const ModuleName = 'DroneSet' as const

function GetFullNameOf(nameLambda: () => any){
    return `${RootNamespace}.${ModuleName}.${NameOf(nameLambda)}`
}

export namespace SensoryItemTags {
    export const Gag: string = GetFullNameOf(() => Gag)
    export const EarPlug: string = GetFullNameOf(() => EarPlug)
    export const Mask: string = GetFullNameOf(() => Mask)
}

export const SensoryControlCurse: Curse = new Curse({
    Name: GetFullNameOf(() => SensoryControlCurse),
    Data: new CurseData({
        powerMult: 1,
		lock: true,
		level: 0,
        weight: (item) => {
			return 1
		},
        condition: (item) => false,
        remove: (item, host) => {

        }
    })
})

export function Register(){
    if(SensoryControlCurse.Name in KDCurses){
        throw new Error('Sensory Register: SensoryControlCurse already exists')
    }
    else{
        KDCurses[SensoryControlCurse.Name] = SensoryControlCurse.Data.toJS()
    }
}