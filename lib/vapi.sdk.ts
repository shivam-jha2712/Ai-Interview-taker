import Vapi from '@vapi-ai/web';

export const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN!);

// Here what we are trying to acheive could be done using Vapi workflows that will contain a series of steps that could be guiding the ai on related to what to ask and how to interact with the end user to get the best possible information from the user to make the best assessment/feedback for them.


