import { getRandomInterviewCover } from '@/lib/utils';
import dayjs from 'dayjs';
import Image from 'next/image';
import React from 'react'
import { Button } from './ui/button';
import Link from 'next/link';
import DisplayTechIcons from './DisplayTechIcons';
// The process of having all the elements of the interview card in a separate component is called componentization. It helps in reusability and better organization of code.

// Along with that as we are now getting the data from props, we can now make this component dynamic and reusable for different interview cards by passing different data as props.

// Destructuring the props directly in the function parameter for cleaner code.
const InterviewCard = ({ interviewId, userId, role, type, techstack, createdAt }: InterviewCardProps) => {
    const feedback = null as Feedback | null;
    // What we did here was that we used a regular expression to test if the type string contains the word "mix" in a case-insensitive manner. If it does, we set normalizedType to "Mixed"; otherwise, we keep it as the original type. This way, we ensure that any variation of "mix" (like "Mix", "MIX", etc.) is correctly identified and displayed as "Mixed".
    const normalizedType = /mix/gi.test(type) ? 'Mixed' : type;
    // Here we added the date on which the feeback value is being generated over here.
    const formattedDate = dayjs(feedback?.createdAt || createdAt || Date.now()).format('MMM D, YYYY');
    return (
        <div className='card-border w-[360px] min-sm:w-full min-h-96'>
            <div className='card-interview'>
                <div>
                    <div className='absolute top-0 right-0 w-fit px-4 py-2 rounded-b-lg bg-light-600'>
                        <p className='badge-text'>{normalizedType}</p>
                    </div>
                    {/* This is done to have the label of the companies name and their logo that has been added in the constants and its value is being fetched from utils. */}
                    <Image src={getRandomInterviewCover()} alt='cover-image' width={90} height={90} className='rounded-full object-fit size-[90px]' />

                    <h3 className='mt-5 capitalize'>
                        {role} interview
                    </h3>

                    <div className='flex flex-row gap-5 mt-3'>
                        <div className='flex flex-row gap-2'>
                            <Image src="/calendar.svg" alt='calender' width={22} height={22} />

                            <p>{formattedDate}</p>
                        </div>
                        <div className='flex flex-row gap-2 items-center'>
                            <Image src="/star.svg" alt='star' width={22} height={22} />
                            <p>{feedback?.totalScore || '---'}/100</p>
                        </div>
                    </div>

                    <p className='line-clamp mt-5'>
                        {feedback?.finalAssessment || "You haven't taken an interview yet. Take one and improve your skills."}
                    </p>
                </div>

                <div className="flex flex-row justify-between">
                    <DisplayTechIcons techStack={techstack} />
                    {/* The tech icons that will be used here would be mapped out of the constants that was  under index.ts*/}
                    <Button className="btn-primary">
                        <Link href={feedback
                            ? `/interview/${interviewId}/feedback`
                            : `/interview/${interviewId}`
                        }>
                            {feedback ? 'Check Feedback' : 'View Interview'}
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default InterviewCard