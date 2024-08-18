import { cookies } from "next/headers";

export async function fetchEvents() {
    const res = await fetch('http://localhost:3300/api/events', {
      method: 'GET',
      credentials: 'include',
      next: { revalidate: 20 },
      // cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (!res.ok) { console.log('Failed to fetch events'); }
    return res.json();
  }

export async function getMyEvents(token: any) {
    // console.log(token);
    const response = await fetch('http://localhost:3300/api/events/myevents',
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token.value}`,
          'Content-Type': 'application/json',
        }
      });
    if (!response.ok) { console.log('Failed to fetch my events'); }
    const res = response.json()
    return res;
  }
  
  export async function getRegisteredEvents(token: any) {
    const response = await fetch('http://localhost:3300/api/events/registered',
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token.value}`,
          'Content-Type': 'application/json',
        }
      });
    if (!response.ok) { console.log('Failed to fetch registeredevents'); }
    const res = response.json()
    return res;
  }

  export async function logoutUser(token:any) {
    if (!token) { return}
    const response = await fetch('http://localhost:3300/api/auth/logout',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token.value}`,
          'Content-Type': 'application/json',
        }
      });
    if (!response.ok) { console.log('Failed to logout'); }
    const res = response.json()
    return res;
  }
  