// src/lib/data/states.ts
const API_BASE_URL = 'http://localhost:3000/api';

export async function fetchStates(): Promise<string[]> {
    const response = await fetch(`${API_BASE_URL}/states`); // Assuming you have a /api/states endpoint
    if (!response.ok) {
        throw new Error(`Failed to fetch states: ${response.statusText}`);
    }
    return response.json();
}