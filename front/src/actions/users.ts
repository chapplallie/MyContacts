// @ts-ignore
const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const API_URL = `${baseUrl}/api`;

export async function createUser(data:{email: string, password: string}) {
  
  const response = await fetch(`${API_URL}/signin`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
  const dataToSend = await response.json(); 
  window.location.href = "/auth";
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
  
  if (dataToSend.token) {
    localStorage.setItem('token', dataToSend.token);
    localStorage.setItem('userId', dataToSend.id);
    localStorage.setItem('userEmail', data.email);
    console.log(dataToSend);
    window.location.href = `/${dataToSend.id}/contacts`;
  } else {
    console.error('No token received from server');
  }
  return dataToSend;
}