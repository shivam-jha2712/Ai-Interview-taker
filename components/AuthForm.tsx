"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import FormField from "./FormField"
import { useRouter } from "next/navigation"


const authFormSchema = (type: FormType) => {
    return z.object({
        name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
        email: z.email(),
        password: z.string().min(3),
    })
}

// Conditional form ka data chhaiye isliye you need to add that ki agar mere pass ek type hai uske basis pe bifurcate ho raha hai. Like if it is sign in then waisa if sign up then waisa. 
const AuthForm = ({ type }: { type: FormType }) => {

    const router = useRouter();
    const formSchema = authFormSchema(type);

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    // And in place of the console logging the values we are routing their values to the corresponding places where it is needed to be sent to. 
    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (type === 'sign-up') {
                toast.success('Account Created Successfully, Please Sign In');
                router.push('/sign-in')
            }
            else {
                toast.success('Signed In Successfully');
                router.push('/')
            }
        } catch (error) {
            console.log(error);
            toast.error(`There was an error: ${error}`);
        }
    }
    // Creating a boolean just to justify what form field will be available in which sort of form.
    const isSignIn = type === 'sign-in';
    return (
        <div className="card-border lg:min-w-[566px]">
            <div className="flex flex-col gap-6 card py-14 px-10">
                <div className="flex flex-roe gap-2 justify-center">
                    <Image src="/logo.svg" alt="logo" height={32} width={38} />
                    <h2 className="text-primary-100">PrepGPT</h2>
                </div>
                <h3>Practice Job Interviews with AI</h3>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
                        {!isSignIn &&
                            (<FormField
                                control={form.control}
                                name="name"
                                label="Name"
                                placeholder="Enter Your Name"
                            />
                            )}
                        <FormField
                            control={form.control}
                            name="email"
                            label="Email"
                            placeholder="Enter Your Email"
                            type="email"
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            label="Password"
                            placeholder="Enter Your Password"
                            type="password"
                        />
                        <Button className="btn" type="submit">{isSignIn ? 'Sign in' : 'Create an Account'}</Button>
                    </form>
                </Form>
                <p className="text-center">
                    {isSignIn ? 'No account yet' : 'Have an Account already?'}
                    <Link href={!isSignIn ? '/sign-in' : '/sign-up'} className="font-bold text-user-primary ml-1">
                        {!isSignIn ? "Sign in" : "Sign up"}
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default AuthForm