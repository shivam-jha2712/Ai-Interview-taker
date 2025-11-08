'use server';

import { db, auth } from "@/firebase/admin";
import { cookies } from "next/headers";


const ONE_WEEK = 60 * 60 * 24 * 7;


export async function signUp(params: SignUpParams){
    // Destructuring the signUp interface parameters down here. 
    const {uid, name, email} = params;

    // The objective of the try block here is to sign up our user.
    try{
        const userRecord = await db.collection('users').doc(uid).get();

        // You fetch the userRecord and if it exists what you do is you simply return an error identifying the userRecord to be existing in rge firebase db
        if(userRecord.exists){
            return {
                success: false,
                message: 'The user already exists. Please sign in instead'
            }
        }
        // And if it does not exists, you need to add this user in your domain. and mind u this is done on the server side.
        await db.collection('users').doc(uid).set({
            name, email
        })

        return {
            success: true,
            message: 'Account successfully created. Please Sign In!'
        }

    }catch(e: any){
        console.error('Error in creating a user', e);

        if(e.code === 'auth/email-already-exists'){
            return {
                success: false,
                message: 'This email is already in use.'
            }
        }

        return {
            success: false,
            message: 'Failed to create an account.'
        }
    }
}

export async function signIn(params: SignInParams){
    const {email, idToken} = params;

    try{
        const userRecord = await auth.getUserByEmail(email);

        if(!userRecord){

            return{
                success: false,
                message: 'User does not exists. Create an account instead.'
            }
        }
// Agar to exist karta hai user to sessionCookie bana dijiye depending upon the email and password jo ki aap daal rahe hai. Aur aisa kuch aur nahi hai ismei khaas.
        await setSessionCookie(idToken);
    }catch(e){
        console.log(e);

        return{
            success: false,
            message: 'Failed to log into an account.'
        }
    }
}


export async function setSessionCookie(idToken: string){
    // Yaha pe kar kya rahe hai ki ek sessionToken generate kr rahe hai aur uske saath yeh yaad rakh rahe hai aane wale hafte bhar ke liye ki agar toh koi bhi aaya toh woh jaayega fetch krega woh session aur baar baar signin ka jhanjhat hata dega.
    const cookieStore = await cookies();

    const sessionCookie = await auth.createSessionCookie(idToken, {
        expiresIn:  ONE_WEEK * 1000,
    })

    cookieStore.set('session', sessionCookie, {
        maxAge: ONE_WEEK,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax'
    })
}

export async function getCurrentUser(): Promise<User| null>{
    const cookieStore = await cookies();

    const sessionCookie = cookieStore.get('session')?.value;

    if(!sessionCookie){
        return null;
    }

    try{
        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

        const userRecord = await db.collection('users').doc(decodedClaims.uid).get();

        if(!userRecord.exists) {
            return null;
        }

        return {
            ...userRecord.data(),
            id:userRecord.id,
        }as User;

    }catch(e){
        console.log(e);

        return null;
    }
}

export async function isAuthenticated(){
    const user = await getCurrentUser();

    return !!user;
    // This is for creation of the logic where the existence or non existence of the user inside the database 
}