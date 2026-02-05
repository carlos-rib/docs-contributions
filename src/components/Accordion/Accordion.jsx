import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDownIcon } from 'lucide-react';

import './Accordion.css';

function Accordion({ ...props }) {
  return (
    <AccordionPrimitive.Root type='multiple' data-slot='accordion' {...props} />
  );
}

function AccordionItem({ className, ...props }) {
  return (
    <AccordionPrimitive.Item
      data-slot='accordion-item'
      className='accordionItem'
      {...props}
    />
  );
}

function AccordionTrigger({ className, children, ...props }) {
  return (
    <AccordionPrimitive.Header className='accordionTriggerHeader'>
      <AccordionPrimitive.Trigger
        data-slot='accordion-trigger'
        className='accordionTrigger'
        {...props}
      >
        {children}
        <ChevronDownIcon className='chevronDownIcon' />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({ className, children, ...props }) {
  return (
    <AccordionPrimitive.Content
      data-slot='accordion-content'
      className='accordionContent'
      {...props}
    >
      <div className='accordionContentChildren'>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
