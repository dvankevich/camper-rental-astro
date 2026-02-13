import { favorites, toggleFavorite } from "../lib/store";
import "iconify-icon"; // Імпортуємо для реєстрації тегу <iconify-icon>

export default function FavoriteButton({ camper, className }) {
  const isFavorite = favorites.value.some((fav) => fav.id === camper.id);

  const handleClick = (e) => {
    e.preventDefault();
    toggleFavorite(camper);
  };

  return (
    <button
      onClick={handleClick}
      className={className}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 0,
        display: "flex",
      }}
    >
      <iconify-icon
        icon={isFavorite ? "bi:heart-fill" : "bi:heart"}
        width="24"
        height="24"
        style={{ color: isFavorite ? "var(--button)" : "var(--main)" }}
      ></iconify-icon>
    </button>
  );
}
