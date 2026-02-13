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
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import icon from 'astro-icon'; // <--- 1. Імпортуємо

export default defineConfig({
  integrations: [
    preact(),
    icon() // <--- 2. Додаємо в масив
  ]
});

```

### Використання `iconify-icon` (Web Component)

Для Preact офіційно рекомендується використовувати універсальний пакет **`@iconify/react`**, оскільки Preact має повну сумісність із React-компонентами через `preact/compat`.

Цей метод найкращий, тому що він не залежить від фреймворку (Preact/React) і не потребує складних імпортів.

**1. Встановіть пакет (він точно є, це загальний стандарт):**

```bash
npm install iconify-icon

```

**2. Оновіть `src/components/FavoriteButton.jsx`:**
Замініть весь код на цей. Тут ми просто використовуємо веб-компонент, який реєструється при імпорті.

```jsx
import { favorites, toggleFavorite } from '../lib/store';
import 'iconify-icon'; // Імпортуємо для реєстрації тегу <iconify-icon>

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
      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}
    >
      <iconify-icon 
        icon={isFavorite ? "bi:heart-fill" : "bi:heart"} 
        width="24" 
        height="24" 
        style={{ color: isFavorite ? 'var(--button)' : 'var(--main)' }}
      ></iconify-icon>
    </button>
  );
}

```
