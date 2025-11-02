// What are we doing here is that we are defining the types for our application. This helps in type-checking and ensures that we are using the correct types throughout our codebase.

// We have defined interfaces for Feedback, Interview, CreateFeedbackParams, User, InterviewCardProps, AgentProps, RouteParams, GetFeedbackByInterviewIdParams, GetLatestInterviewsParams, SignInParams, SignUpParams, FormType, InterviewFormProps and TechIconProps.

// Each interface defines the structure of the object and the types of each property. This helps in ensuring that we are passing the correct data types and structures throughout our application.

// For example, the Feedback interface defines the structure of a feedback object, which includes properties like id, interviewId, totalScore, categoryScores, strengths, areasForImprovement, finalAssessment and createdAt. Each property has a specific type, such as string, number or array.

// Similarly, the Interview interface defines the structure of an interview object, which includes properties like id, role, level, questions, techstack, createdAt, userId, type and finalized.

// By defining these types, we can ensure that our code is more robust and less prone to errors. It also helps in improving the developer experience by providing better autocompletion and type-checking in our IDEs.
interface Feedback {
  id: string;
  interviewId: string;
  totalScore: number;
  categoryScores: Array<{
    name: string;
    score: number;
    comment: string;
  }>;
  strengths: string[];
  areasForImprovement: string[];
  finalAssessment: string;
  createdAt: string;
}

interface Interview {
  id: string;
  role: string;
  level: string;
  questions: string[];
  techstack: string[];
  createdAt: string;
  userId: string;
  type: string;
  finalized: boolean;
}

interface CreateFeedbackParams {
  interviewId: string;
  userId: string;
  transcript: { role: string; content: string }[];
  feedbackId?: string;
}

interface User {
  name: string;
  email: string;
  id: string;
}

interface InterviewCardProps {
  interviewId?: string;
  userId?: string;
  role: string;
  type: string;
  techstack: string[];
  createdAt?: string;
}

interface AgentProps {
  userName: string;
  userId?: string;
  interviewId?: string;
  feedbackId?: string;
  type: "generate" | "interview";
  questions?: string[];
}

interface RouteParams {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string>>;
}

interface GetFeedbackByInterviewIdParams {
  interviewId: string;
  userId: string;
}

interface GetLatestInterviewsParams {
  userId: string;
  limit?: number;
}

interface SignInParams {
  email: string;
  idToken: string;
}

interface SignUpParams {
  uid: string;
  name: string;
  email: string;
  password: string;
}

type FormType = "sign-in" | "sign-up";

interface InterviewFormProps {
  interviewId: string;
  role: string;
  level: string;
  type: string;
  techstack: string[];
  amount: number;
}

interface TechIconProps {
  techStack: string[];
}
