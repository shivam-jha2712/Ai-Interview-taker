import { cn, getTechLogos } from '@/lib/utils'
import Image from 'next/image';
import React from 'react'


// What this component is doing is fetching the mapping that is present in the utils file and is getting us the icons of the associated tech stack


// This has all been achieved by creating a utility function that maps over the technology, normalizes the name such that it replaces all the dots and extra spaces and all of it is fetched from the url for-"Devicon" from where you can simply fetch any type of icons that is needed for you 
const DisplayTechIcons = async ({ techStack }: TechIconProps) => {
    const techIcons = await getTechLogos(techStack);
    return (
        <div className='flex flex-row'>{techIcons.slice(0, 3).map(({ tech, url }, index) => (
            // The cn that is used here is a shdcn property that can be used for getting the indexes correctly.
            <div key={tech} className={cn('relative-group bg-dark-300 rounded-full p-2 flex-center', index >= 1 && '-ml-3')}>
                <span className="tech-tooltip">{tech}</span>
                <Image src={url} alt={tech} width={100} height={100} className='size-5' />
            </div>
        ))}</div>
    )
}

export default DisplayTechIcons