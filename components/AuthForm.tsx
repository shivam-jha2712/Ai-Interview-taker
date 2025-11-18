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
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/firebase/client"
import { signIn, signUp } from "@/lib/actions/auth.action"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

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

    // 👇 state for show / hide password
    const [showPassword, setShowPassword] = useState(false)

    // 2. Define a submit handler.
    // And in place of the console logging the values we are routing their values to the corresponding places where it is needed to be sent to. 
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (type === 'sign-up') {
                // This is the fireBase logic that is being implemented to destructure the userdata
                const { name, email, password } = values;

                // This is used to register a new user in the firebase auth and not firestore database using email and password only if the wmail is not already in use.
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                // The above function is only doing the auth logic and not signing it up so for signing up

                const result = await signUp({
                    uid: userCredential.user.uid,
                    name: name!,
                    email,
                    password,
                })

                //This is the toast reply for the sucess and error message if the user is not signed up. 

                // The question mark is added as the result variable is undefined thus we need to get its value thus it is added.
                if (!result?.success) {
                    toast.error(result?.message);
                    return;
                }

                toast.success('Account Created Successfully, Please Sign In');
                router.push('/sign-in')
            }

            // The sign in logic begins here if the project has the idea of the user if exists.
            else {

                const { email, password } = values;
                // Here the sign in is being also done on the client side but it be stored on the idToken is being stored on the server side under auth.action.ts
                const userCredential = await signInWithEmailAndPassword(auth, email, password);

                const idToken = await userCredential.user.getIdToken();

                if (!idToken) {
                    toast.error('Sign in Failed');
                    return;
                }
                // Agar toh aapka idToken present hai toh aap signIn wala auth action utha kr ke token se verify kar ke dikha dijiye nahi toh agar aisa hai ki hai toh error push in kar hi rahe hai toast ke taur pe.
                await signIn({
                    email, idToken
                })

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
                    <h2 className="text-primary-100">PrepareGPT</h2>
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
                        <div className="relative">
                            <FormField
                                control={form.control}
                                name="password"
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter Your Password"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-6 w-6 mr-4 mb-1" />
                                ) : (
                                    <Eye className="h-6 w-6 mr-4 mb-7" />
                                )}
                            </button>
                        </div>

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