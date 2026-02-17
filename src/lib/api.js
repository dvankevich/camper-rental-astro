// src/lib/api.js
const API_URL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers";

export async function fetchCampers(params = {}) {
  const searchParams = new URLSearchParams();

  // ДОДАЄМО ТІЛЬКИ ЗАПОВНЕНІ ПАРАМЕТРИ
  Object.entries(params).forEach(([key, value]) => {
    // Перевіряємо, щоб значення не було порожнім
    if (value !== "" && value !== null && value !== undefined) {
      searchParams.append(key, value.toString());
    }
  });

  // Дефолтні значення для пагінації, якщо вони не прийшли з фільтрів
  if (!searchParams.has("page")) searchParams.set("page", "1");
  if (!searchParams.has("limit")) searchParams.set("limit", "4");

  console.log("Fetching URL:", `${API_URL}?${searchParams.toString()}`);

  try {
    const res = await fetch(`${API_URL}?${searchParams.toString()}`);
    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();

    // MockAPI повертає або масив, або об'єкт з {items, total}
    if (data && typeof data === "object" && Array.isArray(data.items)) {
      return { items: data.items, total: data.total };
    }

    if (Array.isArray(data)) {
      return { items: data, total: data.length };
    }

    return { items: [], total: 0 };
  } catch (error) {
    console.error("Fetch error:", error);
    return { items: [], total: 0 };
  }
}

// src/lib/api.js
/** @typedef { import('../types').Camper } Camper */

/**
 * @param {string} id
 * @returns {Promise<Camper | null>}
 */
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
