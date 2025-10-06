import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { patchContact, getContactByContactId } from "../../../../actions/contacts";

interface Contact {
    _id: string;
    firstname: string;
    lastname: string;
    phone: string;
}

const EditContactPage: React.FC = () => {
    const navigate = useNavigate();
    const { userId, contactId } = useParams();
    const [contact, setContact] = useState<Contact | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchContact = async () => {
            if (!contactId) {
                throw new Error('Contact ID is required');
            }
            const data = await getContactByContactId(contactId);
            console.log("Fetched contact data:", data);
            setContact({
                _id: data._id,
                firstname: data.firstname,
                lastname: data.lastname,
                phone: data.phone
            });
            console.log("Fetched contact data:", data);
        
        };

        if (contactId) {
            fetchContact();
        }
    }, [userId, contactId, navigate]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        try {
            if (!contactId) {
                throw new Error('Contact ID is required');
            }

            const formData = new FormData(e.currentTarget);
            const updatedContact = {
                firstname: formData.get("firstname") as string,
                lastname: formData.get("lastname") as string,
                phone: formData.get("phone") as string
            };

            if (!updatedContact.firstname || !updatedContact.lastname || !updatedContact.phone) {
                throw new Error('All fields are required');
            }

            const result = await patchContact(contactId, updatedContact);
            if (!result) {
                throw new Error('Failed to update contact');
            }

            navigate(`/${userId}/contacts`);
        } catch (error) {
            console.error('Error updating contact:', error);
            setError(error instanceof Error ? error.message : 'Failed to update contact');
        }
    };
    if (!contact) return <div>Contact not found</div>;

    return (
        <section className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Modifier le contact</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Prénom:
                        <input
                            type="text"
                            name="firstname"
                            defaultValue={contact.firstname}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </label>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Nom:
                        <input
                            type="text"
                            name="lastname"
                            defaultValue={contact.lastname}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </label>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Téléphone:
                        <input
                            type="tel"
                            name="phone"
                            defaultValue={contact.phone}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </label>
                </div>
                <div className="flex gap-4">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Enregistrer
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate(`/${userId}/contacts`)}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Annuler
                    </button>
                </div>
            </form>
        </section>
    );
};

export default EditContactPage;