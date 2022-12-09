import { Model } from '@src/apps/ModelBase'
import { Field } from '@src/utils/forms';

export class Reservation extends Model {
    ci_date: Date;
    co_date: Date;
    name: String;

    form_fields(): Field[] {
        return [
            { name: 'name', validation: 'required' },
            { name: 'co_date', type: "date", label: 'CheckOut Date', validation: 'required' },
            { name: 'ci_date', type: "date", validation: 'required' },
        ];
    }
}

