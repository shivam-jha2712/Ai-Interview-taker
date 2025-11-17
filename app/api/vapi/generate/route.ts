import {generateText} from "ai";
import { google } from "@ai-sdk/google";
import { getRandomInterviewCover } from "@/lib/utils";
import { db } from "@/firebase/admin";
export async function GET(){
    return Response.json({success: true, data:'THANK YOU!!'}, {status: 200});
}

// This route could be checked by navigating to the given location as and as this is a "GET" request the kind of request needs to be GET. - localhost:3000/api/vapi/generate

export async function POST(request : Request){
    const {type, role, level, techstack, amount, userid} = await request.json();

    try{
        const {text: questions} = await generateText({
            model: google('gemini-2.0-flash-001'),
            prompt: `Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${techstack}.
        The focus between behavioural and technical questions should lean towards: ${type}.
        The amount of questions required is: ${amount}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]
        
        Thank you! <3
    `,
        })

        // The interview variable so generated is a JSON that stores the data that is available from the user in the given format and thus is parsed. 

        /*
            {
               "type": "mixed",
                "role": "frontend",
                "level": "senior",
                "techstack": "next.js",
                "amount": "7",
                "userid": "eM43yhGwGZV7BKDGdBPTlhaO1j52" // This is the userid of the user who is giving the interview.
            }
        */ 

        // This is how you will be storing the db and that will be further used inside the db and will be used for the necessary purpose. 
        const interview = {
            role, type, level,
            techstack: techstack.split('.'),
            questions: JSON.parse(questions),
            userId: userid,
            finalized: true,
            coverImage: getRandomInterviewCover(),
            createdAt :  new Date().toISOString()
        }

        await db.collection("interviews").add(interview);

        return Response.json({success: true}, {status: 200});

    }catch(error){
        console.error(error);

        return Response.json({success: false, error}, {status: 500});
    }
}