// src/lib/api.js
const API_URL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers";

// src/lib/api.js
export async function fetchCampers(params = {}) {
  const searchParams = new URLSearchParams(params);
  if (!searchParams.has("page")) searchParams.set("page", "1");
  if (!searchParams.has("limit")) searchParams.set("limit", "4");

  try {
    const res = await fetch(`${API_URL}?${searchParams.toString()}`);
    if (!res.ok) throw new Error("Failed to fetch");
    
    const data = await res.json();

    // ПЕРЕВІРКА: 
    // Якщо прийшов масив — повертаємо його.
    // Якщо прийшов об'єкт з полем items — повертаємо items.
    // В іншому випадку — порожній масив.
    if (Array.isArray(data)) return data;
    if (data && typeof data === 'object' && Array.isArray(data.items)) return data.items;
    
    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function fetchCamperById(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error("Not found");
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
