'use client';

import { ScrollArea } from '@/components/ui/scroll-area';

type Props = {};

const experienceList = [
    {
        id: 1,
        role: "Data Analyst Intern",
        company: "IBM SkillsBuild (AICTE Academic Internship)",
        location: "Remote",
        duration: "Aug 2026",
        description: "Completed the IBM SkillsBuild Academic Internship in Data Analytics with AI, applying data cleaning, exploratory analysis, and AI-assisted analytical techniques as part of an AICTE-recognized program. Delivered a project under the BharatCares initiative, working with real-world datasets to derive and communicate actionable insights.",
        current: true,
        technologies: ["Data Analysis", "Python", "AI Tools", "Data Cleaning"]
    },
    {
        id: 2,
        role: "Web Development Intern",
        company: "Unlox Job Bridge Program (with Outpro India)",
        location: "Bengaluru, Karnataka",
        duration: "Jun 2026",
        description: "Shipped a new full-stack project every week across a project-based web development program, earning the Unlox Edge Certification. Engineered a MERN-stack social media app with real-time chat using Socket.IO, MongoDB Atlas, Express, and React. Developed a Blog REST API with Node.js/Express and a React e-commerce app with React Router and Context API, plus a React To-Do & Notes app and JavaScript/DOM mini projects.",
        technologies: ["React.js", "Node.js", "Express.js", "Socket.IO", "MongoDB Atlas"]
    }
];

const Experience = (props: Props) => {

    return (
        <ScrollArea className='h-full p-4 sm:p-6 overflow-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
            {experienceList?.map((item, i) => (
                <div key={item.id} className={`group relative pl-6 ${i > 0 ? '' : ''}`}>
                    <div className="flex flex-col mb-1 sm:mb-0">
                        <span className='text-md font-semibold text-foreground'>{item.role}</span>
                        <span className='w-fit py-0.5 font-semibold bg-primary text-xs rounded-full text-primary-foreground px-5'>
                            {item.duration}
                        </span>
                    </div>
                    <div className="mb-1 flex flex-col items-start before:absolute before:left-2 before:h-full before:-translate-x-1/2 before:translate-y-3 before:self-start before:bg-border before:px-px after:absolute after:left-2 after:box-content after:h-2 after:w-2 after:-translate-x-1/2 after:translate-y-1.5 after:rounded-full after:border-4 after:border-background after:bg-primary group-last:before:hidden">
                        <time className="mt-1 left-0 mb-1 inline-flex h-5 w-36 translate-y-0.5 items-center justify-center rounded-full bg-secondary text-[10px] font-semibold uppercase text-secondary-foreground">
                            {item.location}
                        </time>
                        <div className="text-xs mt-1 font-light text-muted-foreground">
                            {item.company}
                        </div>
                    </div>
                    <p className="text-sm mb-3 text-gray-700 dark:text-gray-400">{item.description}</p>
                </div>
            ))}
        </ScrollArea>
    );
};

export default Experience;
