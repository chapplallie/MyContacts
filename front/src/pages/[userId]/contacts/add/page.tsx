import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { createContact } from "../../../../actions/contacts";

const UserPage: React.FC = () => {
    const navigate = useNavigate();
    const { userId } = useParams<{ userId: string }>();
  return (
    <section>
        <div>
            <h1>Ajouter un contact pour l'utilisateur {userId}</h1>
        </div>
        <form
            onSubmit={async (e) => {
                e.preventDefault();
                try {
                    const formData = new FormData(e.currentTarget);
                    const firstname = formData.get("firstname") as string;
                    const lastname = formData.get("lastname") as string;
                    const phone = formData.get("phone") as string;

                    if (!userId) {
                        throw new Error('User ID is required');
                    }

                    await createContact(
                        firstname,
                        lastname,
                        phone
                    );

                    navigate(`/${userId}/contacts`);
                } catch (error) {
                    console.error('Error adding contact:', error);
                    alert(error instanceof Error ? error.message : 'Failed to add contact');
                    alert(error instanceof Error ? error.message : 'Failed to add contact');
                }
            }}
        >
            <div>
                <label>
                Prénom :
                    <input type="text" name="firstname" required />
                </label>
            </div>
            <div>
                <label>
                    Nom :
                    <input type="text" name="lastname" required />
                </label>
            </div>
            <div>
                <label>
                    Téléphone:
                    <input type="text" name="phone" required />
                </label>
            </div>
            <button type="submit">Ajouter le contact</button>
        </form>
    </section>
  );
};

export default UserPage;
