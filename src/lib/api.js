// src/lib/api.js
const API_URL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers";

export async function fetchCampers(params = {}) {
  const searchParams = new URLSearchParams(params);
  // Додаємо дефолтні параметри, якщо потрібно
  if (!searchParams.has("page")) searchParams.set("page", "1");
  if (!searchParams.has("limit")) searchParams.set("limit", "4");

  try {
    const res = await fetch(`${API_URL}?${searchParams.toString()}`);
    if (!res.ok) throw new Error("Failed to fetch campers");
    return await res.json();
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
