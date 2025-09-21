// @ts-ignore
const API_URL = process.env.REACT_APP_API_URL as string;

export async function createContact(data:{firstname: string, lastname: string, phone: string}) {
    const response = await fetch(`${API_URL}/contacts/add`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

  const dataToSend = await response.json();
  return dataToSend;

}

export async function getContactsByUserId() {
    const response = await fetch(`${API_URL}/contacts`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const dataToSend = await response.json();
    return dataToSend;
}

export async function patchContact(contactId: string, data: { firstname?: string, lastname?: string, phone?: string }) {
    const response = await fetch(`${API_URL}/contacts/${contactId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const dataToSend = await response.json();
    return dataToSend;
}

export async function deleteContact(contactId: string) {
    const response = await fetch(`${API_URL}/contacts/${contactId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const dataToSend = await response.json();
    return dataToSend;
}