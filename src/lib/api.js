// src/lib/api.js
const API_URL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers";

export async function fetchCampers(params = {}) {
  const searchParams = new URLSearchParams(params);
  console.log("(api.js)searchParams: ", searchParams);
  // Дефолтні значення, якщо не передані
  if (!searchParams.has("page")) searchParams.set("page", "1");
  if (!searchParams.has("limit")) searchParams.set("limit", "4");

  try {
    const res = await fetch(`${API_URL}?${searchParams.toString()}`);
    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();

    // Логіка обробки відповіді MockAPI
    // 1. Якщо це об'єкт з items (формат пагінації)
    if (data && typeof data === "object" && Array.isArray(data.items)) {
      console.log("(api.js)data.total: ", data.total);
      return {
        items: data.items,
        total: data.total,
      };
    }

    // 2. Якщо API повернуло просто масив (інколи MockAPI так робить, якщо не передати page/limit)
    if (Array.isArray(data)) {
      return {
        items: data,
        total: data.length,
      };
    }

    return { items: [], total: 0 };
  } catch (error) {
    console.error("Fetch error:", error);
    return { items: [], total: 0 };
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
