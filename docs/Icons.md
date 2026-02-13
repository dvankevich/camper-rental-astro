Команда `npx astro add icon` застаріла або не розпізнає скорочення. Крім того, бібліотека `astro-icon` оновилася до версії 4, яка працює трохи інакше (вона вимагає встановлення наборів іконок локально або налаштування завантажувачів).

Давайте встановимо все **вручну**. Це надійніше.

### Крок 1: Встановлення основної бібліотеки

Запустіть у терміналі:

```bash
npm install astro-icon

```

Це виправить помилку `Cannot find module 'astro-icon/components'`, оскільки пакет з'явиться у `node_modules`.

### Крок 2: Встановлення наборів іконок (Колекцій)

`astro-icon` v4 не завантажує іконки з інтернету "на льоту" за замовчуванням (для стабільності). Потрібно встановити ті набори, які ви використовуєте у своєму маппінгу (`bi`, `lucide`, `hugeicons`, `ion`, `ph`).

Запустіть цю команду (це dev-залежності):

```bash
npm install -D @iconify-json/bi @iconify-json/lucide @iconify-json/hugeicons @iconify-json/ion @iconify-json/ph

```

### Крок 3: Підключення в конфігурації Astro

Відкрийте файл `astro.config.mjs` у корені проекту і додайте інтеграцію `icon()`:

```javascript
// astro.config.mjs
import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import icon from "astro-icon"; // <--- 1. Імпортуємо

export default defineConfig({
  integrations: [
    preact(),
    icon(), // <--- 2. Додаємо в масив
  ],
});
```

Все, що рендериться всередині `.astro` через `astro-icon`, під час білду стає статичним SVG і не робить запитів. А от клієнтські компоненти (наші "острівці" Preact) зазвичай тягнуть іконки з мережі, що створює затримку та зайвий трафік.

Найкращий спосіб позбутися цього — створити маленькі **Preact-компоненти для цих іконок**. Оскільки це звичайний JSX, вони просто вшиються у ваш JavaScript-бандл.

### Крок 1: Створимо файл з SVG-компонентами

Створіть файл `src/components/ui/LocalIcons.jsx` (або просто додайте це в початок файлу з кнопкою).

```jsx
// src/components/ui/LocalIcons.jsx

export const HeartIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 16 16"
  >
    <path
      fill="currentColor"
      d="m8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385c.92 1.815 2.834 3.989 6.286 6.357c3.452-2.368 5.365-4.542 6.286-6.357c.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"
    />
  </svg>
);

export const HeartFillIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 16 16"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8 1.314C12.438-3.248 23.534 4.735 8 15C-7.534 4.736 3.562-3.248 8 1.314"
    />
  </svg>
);
```

---

### Крок 2: Оновимо `FavoriteButton.jsx`

Тепер ми просто імпортуємо ці іконки. Жодних `iconify-icon`, жодних запитів до API.

```jsx
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
```

---

### Чому це ідеальне рішення:

1. **Миттєва реакція:** Іконка змінюється миттєво, бо код уже в пам'яті браузера.
2. **Zero Network:** Жодного запиту до `api.iconify.design` у клієнта.
3. **Повний контроль:** Ви можете легко міняти `fill`, `stroke` чи розміри через пропси або CSS змінні.

### А що з іншими іконками в `Icon.astro`?

Там **нічого міняти не треба**. Пакет `astro-icon` під час виконання команди `npm run build` витягує код іконок і вставляє його прямо в HTML (інлайнить). Тобто користувач отримає готовий SVG без жодних додаткових запитів.
