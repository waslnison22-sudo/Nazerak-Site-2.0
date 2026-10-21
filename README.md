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

Лёгкий статический frontend без обязательного сборщика и Node.js на сервере. Есть главная страница, адаптивная навигация, чистые маршруты, страницы-разделы форума, каталог участников, поиск, кабинет-заглушка, обращения, профиль и 404. Копирование IP работает.

Живые темы, участники, модерация и OAuth пока не подключены. Страницы не показывают вымышленные данные и не выполняют изменения в Supabase. Перед включением OAuth нужно проверить redirect allowlist существующего проекта. Перед подключением форума нужно сверить live-схему и RLS с миграциями.

## Локальный запуск

Для просмотра главной страницы запустите в папке проекта:
`python -m http.server 8000`
Откройте http://localhost:8000. Чистые маршруты требуют Apache с .htaccess или dev-сервера с fallback на index.html.

## Визуальная система

Премиальная тёмная палитра, красный акцент, умеренные анимации и поддержка prefers-reduced-motion. Главный фон использует существующее изображение NaZerak с production-домена, не создавая новую картинку.

## Безопасность и выпуск

- Не переносить service-role/secret keys, Discord client secret или OAuth-токены в клиент.
- Не сбрасывать существующую БД и не применять исторические миграции вслепую.
- Не публиковать в REG.RU и не менять DNS без отдельной проверки и подтверждения.
- Перед релизом провести route, mobile, accessibility, browser, auth, RLS и deploy smoke tests.

Подробное ТЗ: docs/MASTER_PROJECT_SPEC.md. Текущий статус: docs/STATUS.md.
