import {initializeApp, getApps, cert} from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

// We are making sure to also add validation checks so that we don't intialize firebase more than once and that too both in production and in dev as well. 
const initFirebaseAdmin = () =>{
    const apps = getApps();

    if(!apps.length){
        initializeApp({
            credential: cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n")
                // This replacing will make sure it does not takes into consideration of any new lines or spaces in our private keys that are used above. 
            })
        })
    }



    // Now we can return and check the Auth from Firebase, this will be used to perform firebase server side authentication from the server side later on. 
    return {
        auth:getAuth(),
        db:getFirestore()
    }
}

// This we are exporting both our authentication and our db access for our client here in this.
export const {auth, db} = initFirebaseAdmin();


// This is the admin side firestore where we don't have the client side functionality and more or less this is what is mostly used. 