import React from 'react'
import { Alert } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';

const ErrorMessage = ({title, text}) => {
    const icon = <IconInfoCircle />;
  return (
    <div className='mb5'>
      <Alert variant="light" color="red" title={title} icon={icon}>
            {text}
        </Alert>
    </div>  
  )
}

export default ErrorMessage
