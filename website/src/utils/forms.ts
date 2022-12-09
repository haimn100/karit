import { capitalize } from "@src/utils/string";
import { ModelForm } from "@src/apps/ModelBase";

// export const getModelSchema = async (model: string, modelId?: string) => {

//     let formhtml = await requestApi({ path: model + '/schema' });

//     let html = '<html><body><ul>' + formhtml.data + '</ul></body></table>';
//     html = html.replace(/>\s+</g, '><');
//     const parser = new DOMParser();

//     let doc = parser.parseFromString(html, 'text/html');

//     let children = doc.getElementsByTagName('ul').item(0)?.childNodes;
//     let schema: any = [];

//     children?.forEach((li: any) => {
//         const label: any = li.firstChild.textContent;
//         const input: any = li.lastChild;
//         schema.push({
//             $formkit: input.tagName.toLowerCase() !== 'input' ? input.tagName.toLowerCase() : input.type.toLowerCase(),
//             name: input.attributes.name.value,
//             label: label,

//         })
//     });
//     debugger;

//     return schema;
// }



export type Field = {
    id?: string,
    name: string;
    type?: string;
    label?: string;
    value?: any;
    validation?: string;
    $formkit?: string
}


export const createSchema = (fields: Field[], data?: any): Field[] => {

    let schema: Field[] = [];

    fields.forEach((f) => {
        schema.push({
            id: f.name,
            $formkit: f.type || 'text',
            name: f.name,
            label: f.label || capitalize(f.name),
            validation: f.validation,
            value: data ? data[f.name] : null
        });
    });

    return schema;
}
