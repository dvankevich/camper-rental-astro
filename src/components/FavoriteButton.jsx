// src/components/FavoriteButton.jsx
import { favorites, toggleFavorite } from "../lib/store";
import { HeartIcon, HeartFillIcon } from "./ui/LocalIcons";

export default function FavoriteButton({ camper, className = "" }) {
  // Коли ми звертаємось до favorites.value тут, Preact автоматично
  // підписує цей компонент на оновлення сигналу.
  const isFavorite = favorites.value.some((fav) => fav.id === camper.id);

  const handleClick = (e) => {
    e.preventDefault();
    toggleFavorite(camper);
  };

  return (
    <button
      onClick={handleClick}
      className={className}
      type="button"
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 0,
        display: "flex",
        alignItems: "center",
        color: isFavorite ? "var(--button)" : "var(--main)",
      }}
    >
      {/* ВАЖЛИВО: щоб іконки перемальовувались, ми використовуємо
        тернарний оператор безпосередньо в JSX
      */}
      {isFavorite ? <HeartFillIcon size={24} /> : <HeartIcon size={24} />}

      {/* Ваш дебаг-текст теж буде оновлюватись */}
      {/* <span style={{ marginLeft: "8px" }}>{isFavorite ? "Fav" : "..."}</span> */}
    </button>
  );
}
