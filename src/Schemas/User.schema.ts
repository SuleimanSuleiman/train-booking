import { object, string, TypeOf, number } from 'zod';

const StorePayload = {
    body: object({
        first_name: string({
             required_error: "First name is required",
        }),
        last_name: string({
             required_error: "Last name is required",
        }),
        email: string({
             required_error: "Email is required",
        }).email("Invalid Email"),
        age: number({
             required_error: "number is required",
        }),
         phone: number({
            required_error: "phone is required",
        }),
        password: string({
            required_error: "password is required",
        }).min(6, "Password too short - should be 6 chars minimum"),
        passwordConfirmation: string({
            required_error: "passwordConfirmation is required",
        }),
    })
    .strict()
    .refine(data => data.password === data.passwordConfirmation, {
        message: "Passwords do not match",  
        path: ["passwordConfirmation"],
    })
}

const LoginPayload = {
    body: object({
        email: string({
             required_error: "Email is required",
        }).email("Invalid Email"),
        password: string({
            required_error: "password is required",
        })
    })
}

const EditPayload = {
     body: object({
        first_name: string({
            required_error: "First name is required",
        }).min(1),
        last_name: string({
             required_error: "Last name is required",
        }).min(1),
        age: number({
             required_error: "age is required",
        }),
        phone: number({
            required_error: "phone is required",
        }),
    })
}

export const StoreUserSchema = object({
    ...StorePayload
})

export const LoginUserSchema = object({
    ...LoginPayload
})

export const EditUserSchema = object({
    ...EditPayload
})

export type StoreOREditUserInput = Omit<
    TypeOf<typeof StoreUserSchema >,
    "body.passwordConfirmation"
>;

export type LoginPayloadInput = TypeOf<typeof LoginUserSchema>

export type EditUserInput = Omit<
    TypeOf<typeof EditUserSchema >,
    "body.passwordConfirmation"
>;