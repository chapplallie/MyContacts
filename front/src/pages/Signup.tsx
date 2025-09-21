import React from 'react';
import Form from '../components/form';
import { authentUser } from '../../actions/users';

  
const Signup: React.FC = () => {
  return (
    <div>
      <Form onSubmit={authentUser} />
    </div>
  );
};

export default Signup;
