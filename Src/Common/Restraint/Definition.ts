import { Record, RecordOf, Seq } from "immutable"
import { InfoText, Property, Template } from "."

type DefinitionProp = {
    Property: restraint
    InfoText: InfoText
}

type Definition = RecordOf<DefinitionProp>

namespace Definition {
    export const Create = Record<DefinitionProp>({
        Property: Property.Default,
        InfoText: InfoText.Default
    })

    export function FromTemplate(template: Template): Definition {
        const qualifiedName = template.QualifiedName.join('.')
        return Create({
            Property: template.Property.set('name', qualifiedName),
            InfoText: InfoText.Create(
                Seq.Keyed(template.InfoText)
                .map((text) => `${qualifiedName}.${text}`)
            )
        })
    }

    export const Default = Create()
}

export default Definition