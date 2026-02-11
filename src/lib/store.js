// src/lib/store.js
import { signal, effect } from "@preact/signals";

// Початкове значення читаємо з localStorage (тільки в браузері)
const getInitialFavorites = () => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  }
  return [];
};

export const favorites = signal(getInitialFavorites());

// Ефект для збереження змін в localStorage
effect(() => {
  if (typeof window !== "undefined") {
    localStorage.setItem("favorites", JSON.stringify(favorites.value));
  }
});

// Функція toggle (аналог вашого toggleFavorite з Redux)
export const toggleFavorite = (camper) => {
  const isExists = favorites.value.some((f) => f.id === camper.id);
  if (isExists) {
    favorites.value = favorites.value.filter((f) => f.id !== camper.id);
  } else {
    favorites.value = [...favorites.value, camper];
  }
};
