import React, { useState } from 'react';
import './Accordion.css';

const AccordionTitle: React.FC<{ title: string, children : any}> = ({ title, children }) => {
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
            {isOpen && <div>{children}</div>}
        </div>
    );
};

const Accordion: React.FC<{title: string, content: any, answer: number}> = ({title, content, answer}) => {

  const numericAnswer =  parseInt(String(answer), 10);
  return (
        <div className="space-y-2">
            <AccordionTitle title={title}>
                {content.map((text : string, index : number) => {
                  return (
                      <p className={index === numericAnswer ? 'correct-answer' : ''} key={index} >
                        {index + 1}. {text}
                      </p>
                  );
                })}
            </AccordionTitle>

        </div>
    );
};

export default Accordion;