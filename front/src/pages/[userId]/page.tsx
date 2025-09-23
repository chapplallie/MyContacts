import TableContact from "../../components/table-contact";

interface UserPageProps {
  userEmail: string;
}

const UserPage: React.FC<UserPageProps> = ({ userEmail }) => {

  return (
    <div>
        <h1>Bienvenue sur la page de {userEmail}</h1>
        <div className="w-full flex justify-between">
            <h2>Gerer les contacts :</h2>
            <button>Ajouter un contact</button>
        </div>
        <div>
            <TableContact />
        </div>
    </div>
  );
};

export default UserPage;
