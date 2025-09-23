import React, { useEffect, useState } from "react";

type Contact = {
    id: string;
    firstname: string;
    prelastname: string;
    telephone: string;
};

const TableContact: React.FC = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchContacts = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `/api/contacts`
                );
                if (!response.ok) throw new Error("Failed to fetch contacts");
                const data = await response.json();
                setContacts(data);
            } catch (error) {
                setContacts([]);
            } finally {
                setLoading(false);
            }
        };
        fetchContacts();
    }, []);

    return (
        <div>
            <h2>Contacts</h2>
            {loading ? (
                <p>Chargement...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Téléphone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact) => (
                            <tr key={contact.id}>
                                <td>{contact.firstname}</td>
                                <td>{contact.prelastname}</td>
                                <td>{contact.telephone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default TableContact;