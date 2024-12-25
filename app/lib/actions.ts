"use server";
import { z } from 'zod';
import connectionPool from '@/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

/*
** customerId - Zod already throws an error if the customer field is empty as it expects a type string. But let's add a friendly message if the user doesn't select a customer.
** amount - Since you are coercing the amount type from string to number, it'll default to zero if the string is empty. Let's tell Zod we always want the amount greater than 0 with the .gt() function.
** status - Zod already throws an error if the status field is empty as it expects "pending" or "paid". Let's also add a friendly message if the user doesn't select a status.
*/

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({
        invalid_type_error: 'Please select a customer.',
    }),
    amount: z.coerce
        .number()
        .gt(0, { message: 'Please enter an amount greater than $0.' }),
    status: z.enum(['pending', 'paid'], {
        invalid_type_error: 'Please select an invoice status.',
    }),
    date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export type State = {
    errors?: {
        customerId?: string[];
        amount?: string[];
        status?: string[];
    };
    message?: string | null;
};

export async function createInvoice(prevState: State, formData: FormData) {

    const validatedFields = CreateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        };
    }

    // Prepare data for insertion into the database
    const { customerId, amount, status } = validatedFields.data;

    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    await connectionPool.query(`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES ('${customerId}', '${amountInCents}', '${status}', '${date}')
      `);


    // return {
    //     message: 'Database Error: Failed to Create Invoice.',
    // };

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');

    // Test it out:
    // console.log(formData);
}

// Use Zod to update the expected types
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

// ...

export async function updateInvoice(
    id: string,
    prevState: State,
    formData: FormData,
) {
    const validatedFields = UpdateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Invoice.',
        };
    }

    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;

    try {
        await connectionPool.query(`
        UPDATE invoices
        SET customer_id = '${customerId}', amount = '${amountInCents}', status = '${status}'
        WHERE id = '${id}'
      `);
    } catch (error) {
        return { message: 'Database Error: Failed to Update Invoice.' };
    }

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}
export async function deleteInvoice(id: string) {
    // throw new Error('Failed to Delete Invoice');
    try {
        await connectionPool.query(`DELETE FROM invoices WHERE id = '${id}'`);
        revalidatePath('/dashboard/invoices');
    } catch (error) {
        return {
            message: 'Database Error: Failed to Create Invoice.',
        };
    }
}