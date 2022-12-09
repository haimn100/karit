import { requestApi } from "@src/services/api";
import { Field } from "@src/utils/forms";
import { ApiResponse } from "@src/utils/network";



export interface ModelForm {
    form_fields(): Array<Field>
}


export interface ModelCtr {
    new(data?: any): Model
}

export abstract class Model implements ModelForm {

    id: Number;

    path(): string {
        return (this as any).constructor.name.toLowerCase() + '/';
    };

    create(data: any) {
        let newObj: any = new (this as any).constructor();

        Object.entries(data).forEach(entry => {
            const name = entry[0];
            const val = entry[1];
            (name === 'id' || !Object.hasOwn(newObj, name)) ?
                Object.defineProperty(newObj, name, { value: val, configurable: false, writable: false }) :
                newObj[name] = val;
        });
        return newObj;
    }

    set(data: any) {

        Object.entries(data).forEach(kv => {
            if (Object.hasOwn(this, kv[0])) {
                (this as any)[kv[0]] = kv[1];
            }
        });
    }

    clean_data() {
        let obj: any = {};
        Object.entries(this).forEach(kv => {
            obj[kv[0]] = kv[1];
        });
        return obj;
    }

    async get(pk: number): Promise<any> {

        const res = await requestApi({ path: this.path() + pk + '/', protected: false });
        if (!res.ok) throw res;

        const item: Model = new (this as any).constructor();
        item.set(res.data);
        return item;
    }

    async all(): Promise<Array<any>> {

        let records: Array<Model> = [];
        const res = await requestApi({ path: this.path() });
        if (!res.ok) throw res;

        res.data.results.forEach((data: any) => {
            const item: Model = new (this as any).constructor();
            item.set(data);
            records.push(item);
        });
        return records;
    }

    async del(): Promise<ApiResponse> {
        return await requestApi({ path: this.path() + (this as any).id + '/', verb: 'delete' });
    }

    async save(): Promise<ApiResponse> {
        if (this.id === 0) throw 'Cant save non instance';
        return await requestApi({ path: this.path() + (this as any).id + '/', verb: 'put', payload: this.clean_data() });
    }

    async add(payload: any): Promise<ApiResponse> {
        return await requestApi({ path: this.path(), verb: 'post', payload });
    }

    form_fields(): Field[] {
        throw new Error("form_fields not implemented on Model");
    }
}