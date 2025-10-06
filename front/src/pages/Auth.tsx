import Form from '../components/form';
import { authentUser } from '../actions/users';

const Auth: React.FC = () => {
  return (
    <div>
      <Form onSubmit={authentUser} />
    </div>
  );
};

export default Auth;
