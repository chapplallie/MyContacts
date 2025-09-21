// @ts-ignore
const API_URL = process.env.REACT_APP_API_URL as string;

export async function createUser(data:{email: string, password: string}) {
    const response = await fetch(`${API_URL}/signin`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
  const dataToSend = await response.json(); 
   console.log("user created:", dataToSend);
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
  console.log("user authent:", dataToSend);

  return dataToSend;
}