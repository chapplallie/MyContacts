// @ts-ignore
const API_URL = process.env.API_URL as string;

export async function createUser(data:{email: string, password: string}) {
    const response = await fetch(`${API_URL}/signin`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

  const dataToSend = await response.json();
  return dataToSend;
}

export async function authentUser(data: { email: string, password: string}) {
    const response = await fetch(`${API_URL}/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

  const dataToSend = await response.json();
  return dataToSend;
}