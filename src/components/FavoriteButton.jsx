// src/components/FavoriteButton.jsx
import { favorites, toggleFavorite } from "../lib/store";
import { HeartIcon, HeartFillIcon } from "./ui/LocalIcons";

export default function FavoriteButton({ camper, className = "" }) {
  const isFavorite = favorites.value.some((fav) => fav.id === camper.id);

  const handleClick = (e) => {
    e.preventDefault();
    toggleFavorite(camper);
  };

  return (
    <button
      onClick={handleClick}
      className={className}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 0,
        display: "flex",
        color: isFavorite ? "var(--button)" : "var(--main)",
      }}
    >
      {isFavorite ? <HeartFillIcon /> : <HeartIcon />}
    </button>
  );
}
