const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const API_URL = `${baseUrl}/api`;

export async function createContact(firstname: string, lastname: string, phone: string) {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Authentication required');
    }

    const response = await fetch(`${API_URL}/contacts/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ firstname, lastname, phone }),
    });
    console.log("body", { firstname, lastname, phone });
  const dataToSend = await response.json();
  console.log("dataToSend:", dataToSend);
  return dataToSend;
}

export async function getContactsByUserId(userId: string) {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Authentication required');
    }

    console.log('Fetching contacts for userId:', userId);

    const response = await fetch(`${API_URL}/contacts`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });

    const dataToSend = await response.json();
    return dataToSend;
}

export async function getContactByContactId(contactId: string) {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Authentication required');
    }   

    const response = await fetch(`${API_URL}/contacts/${contactId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    console.log("Response :", response);

    const dataToSend = await response.json();
    return dataToSend;
}

export async function patchContact(contactId: string, data: { firstname: string, lastname: string, phone: string }) {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Authentication required');
    }

    const response = await fetch(`${API_URL}/contacts/${contactId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            firstname: data.firstname,
            lastname: data.lastname,
            phone: data.phone
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update contact');
    }

    const dataToSend = await response.json();
    return { success: true, data: dataToSend };
}

export async function deleteContact(contactId: string) {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Authentication required');
    }

    const response = await fetch(`${API_URL}/contacts/${contactId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete contact');
    }

    const dataToSend = await response.json();
    return dataToSend;
}