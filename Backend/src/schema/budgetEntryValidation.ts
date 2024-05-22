import * as yup from 'yup';

export const addBudgetEntrySchema = yup.object({

    body: yup.object({
        price: yup.number().required(),
        name: yup.string().required(),
        date : yup.string().required()
    }),
    
    params: yup.mixed().notRequired(),
    query: yup.mixed().notRequired(),

    });
