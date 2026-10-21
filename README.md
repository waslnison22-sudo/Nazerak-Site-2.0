# NaZerak Site 2.0

Новая версия сайта NaZerak. Репозиторий создаётся отдельно от действующего сайта и пока не публикуется в production.

- Production: https://nazerak.ru/
- Старый репозиторий: https://github.com/waslnison22-sudo/NazerakSites
- Новый репозиторий: https://github.com/waslnison22-sudo/Nazerak-Site-2.0
- Minecraft: 1.21.11
- Сервер: nazehard.rustix.cc
- Discord: https://discord.gg/2KvsYYDHN6
- Существующий Supabase: https://ujlbyzvdsncvqbrhasuw.supabase.co — не создавать новый проект.

## Первая версия

Лёгкий статический frontend без обязательного сборщика и Node.js на production-сервере. Есть главная страница, адаптивная навигация, чистые маршруты, страницы-разделы форума, каталог участников, поиск, кабинет-заглушка, обращения, профиль и 404. Копирование IP работает.

Живые темы, участники, модерация и OAuth пока не подключены. Страницы не показывают вымышленные данные и не выполняют изменения в Supabase. Перед включением OAuth нужно проверить redirect allowlist существующего проекта. Перед подключением форума нужно сверить live-схему и RLS с миграциями.

## Публикация в GitHub Pages

После слияния изменений workflow автоматически соберёт и опубликует тестовую версию в GitHub Pages: https://waslnison22-sudo.github.io/Nazerak-Site-2.0/ . Сборка учитывает адрес репозитория с подпапкой и создаёт `404.html`, чтобы внутренние страницы открывались при прямом переходе. Это отдельный тестовый адрес: production-домен `nazerak.ru` и REG.RU не изменяются.

Если GitHub Pages ещё не разрешён для репозитория, workflow попробует включить его автоматически. Если настройки организации или GitHub заблокируют включение, откройте Settings → Pages и выберите **GitHub Actions** в качестве источника публикации, затем перезапустите workflow.

## Локальный запуск и проверка

Требуется Node.js 22 или совместимая актуальная версия. В корне проекта выполните:

```bash
node scripts/preview-server.mjs
```

Откройте http://127.0.0.1:4173. Сервер нужен только для локального просмотра; production остаётся статическим и не требует Node.js.

Проверить маршруты и файлы:

```bash
node scripts/qa-checks.mjs
node scripts/build-pages.mjs
node scripts/preview-smoke.mjs
```

## Визуальная система

Премиальная тёмная палитра, красный акцент, умеренные анимации и поддержка prefers-reduced-motion. Главный фон использует существующее изображение NaZerak с production-домена, не создавая новую картинку.

## Безопасность и выпуск

- Не переносить service-role/secret keys, Discord client secret или OAuth-токены в клиент.
- Не сбрасывать существующую БД и не применять исторические миграции вслепую.
- Не публиковать в REG.RU и не менять DNS без отдельной проверки и подтверждения.
- Перед релизом провести браузерные, accessibility, auth, RLS и deploy smoke tests.

Подробное ТЗ: docs/MASTER_PROJECT_SPEC.md. Текущий статус: docs/STATUS.md.

## Источник фонового изображения

Для главного hero-блока используется изображение Minecraft Forest Lake 4K Wallpaper, заявленное источником в разрешении 3840 × 2160. Страница источника: https://www.wallpaperalchemy.com/wallpaper/minecraft-forest-lake-4k-wallpaper-357. Прямая ссылка на файл используется в `styles.css`. Изображение загружается с внешнего хоста, поэтому для его отображения требуется доступ к `server.wallpaperalchemy.com`.
