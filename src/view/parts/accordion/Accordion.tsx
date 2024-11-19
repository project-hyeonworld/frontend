import React, { useState } from 'react';

const AccordionItem: React.FC<{ title: string, children : any}> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button
                className="mb-2 justify-between items-center p-2 bg-blue-500 rounded-2xl"
                onClick={toggleAccordion}>
                <span>{title}</span>
            </button>
            {isOpen && <div className="p-4">{children}</div>}
        </div>
    );
};

const Accordion: React.FC<{title: string, content: any}> = ({title, content}) => {

    return (
        <div className="space-y-2">
            <AccordionItem title={title}>
                {content.map((text : string, index : number) => {
                    return <p key={index}>{(index+1)+"."}{text}</p>;
                })}
            </AccordionItem>

        </div>
    );
};

export default Accordion;