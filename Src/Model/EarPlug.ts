import { KDInterface as KD } from 'kinkydungeoninterfacewrapper'

const ModelFolder = 'KDMod/EarPlug' as const

export const ModelName = {
	EarPlug: 'KDMod.EarPlug',
	ElfEarPlug: 'KDMod.ElfEarPlug'
}

export function Register() {
	AddModel({
		Name: ModelName.EarPlug,
		// Parent: ModelName.EarPlug,
		TopLevel: true,
		Protected: true,
		Categories: ["Body", "Face", "Cosplay"],
		Folder: ModelFolder,
		Layers: ToLayerMap([
			{
				Name: "EarPlugFront", Layer: "Head", Pri: 10,
				Invariant: true,
				InheritColor: 'BaseMetal',
				HidePoses: ToMap(["Cosplay", "AnimalEars"]),
			},
			{
				Name: "ElfEarPlugFront", Layer: "Head", Pri: 10,
				Invariant: true,
				InheritColor: 'BaseMetal',
				RequirePoses: ToMap(["Cosplay"]),
				HidePoses: ToMap(["AnimalEars"]),
			},
		])
	})

	// AddModel({
	// 	Name: ModelName.ElfEarPlug,
	// 	TopLevel: true,
	// 	Protected: true,
	// 	Categories: ["Body", "Face", "Cosplay"],
	// 	Folder: ModelFolder,
	// 	Layers: ToLayerMap([
	// 		...KD.GetModelLayers_({
	// 			ModelName: ModelName.ElfEarPlug,
	// 		})
	// 	])
	// })
}

