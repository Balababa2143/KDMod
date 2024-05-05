import { Record, RecordOf, Stack } from "immutable"
import { Definition, InfoText, Property } from "."

type TemplateProp = {
    QualifiedName: Stack<string>
    Property: Property
    InfoText: InfoText
}

type Template = RecordOf<TemplateProp>

namespace Template {
    export const Create = Record<TemplateProp>({
        QualifiedName: Stack(),
        Property: Property.Default,
        InfoText: InfoText.Default
    })

    export const Default = Create()

    export const ToDefinition = Definition.FromTemplate
}

export default Template
