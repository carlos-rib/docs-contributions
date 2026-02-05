import * as React from 'react';

function Table({ className, ...props }) {
  return (
    <div
      data-slot='table-container'
      className='relative w-full overflow-x-auto'
    >
      <table data-slot='table' className='table' {...props} />
    </div>
  );
}

function TableHeader({ className, ...props }) {
  return <thead data-slot='table-header' className='table-header' {...props} />;
}

function TableBody({ className, ...props }) {
  return <tbody data-slot='table-body' className='table-body' {...props} />;
}

function TableFooter({ className, ...props }) {
  return <tfoot data-slot='table-footer' className='table-footer' {...props} />;
}

function TableRow({ className, ...props }) {
  return <tr data-slot='table-row' className='table-row' {...props} />;
}

function TableHead({ className, ...props }) {
  return <th data-slot='table-head' className='table-head' {...props} />;
}

function TableCell({ className, ...props }) {
  return <td data-slot='table-cell' className='table-cell' {...props} />;
}

function TableCaption({ className, ...props }) {
  return (
    <caption data-slot='table-caption' className='table-caption' {...props} />
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
