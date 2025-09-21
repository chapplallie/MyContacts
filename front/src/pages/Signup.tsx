import React from 'react';
import Form from '../components/form';
import { createUser } from '../actions/users'; 
  
const Signup: React.FC = () => {
  return (
    <div>
      <Form onSubmit={createUser} />
    </div>
  );
};

export default Signup;
