import React, { useActionState } from 'react';
import Form from '../components/form';
import { createUser } from '../../actions/users';

const Auth: React.FC = () => {
  return (
    <div>
      <Form onSubmit={createUser} />
    </div>
  );
};

export default Auth;
