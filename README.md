
# Tech Drafting App

## Описание
"Tech Drafting App" е уеб платформа за управление на инженерни чертежи и заявки. Потребителите могат да създават, разглеждат и прикачват файлове към проекти, а администраторите управляват всички заявки и статуси.

## Роли и възможности
- **Потребител:**
	- Регистрация и вход
	- Създаване на проект/заявка
	- Качване и преглед на файлове (DWG, PDF, STEP и др.)
	- Преглед на статус и история на проектите
- **Администратор:**
	- Вижда всички проекти
	- Променя статуси (pending, in_progress, completed)
	- Управлява заявки и файлове

## Архитектура и технологии
- **Front-end:** Vite (vanilla JS), Bootstrap 5
- **Back-end:** Supabase (Auth, Database, Storage)
- **База данни:** Supabase Postgres (таблици: users, profiles, projects, documents)
- **Хостинг:** Netlify

## Инсталирани зависимости
- @supabase/supabase-js
- bootstrap

## Централизирана връзка с база данни
Връзката със Supabase се осъществява чрез файла `src/supabase.js`.

## Инструкции за стартиране
1. Инсталирайте зависимостите: `npm install`
2. Стартирайте проекта: `npm run dev`

## Конфигуриране на Supabase
Заменете `YOUR_SUPABASE_URL` и `YOUR_SUPABASE_ANON_KEY` в `src/supabase.js` с вашите данни.

## Структура на проекта

```
├── index.html
├── login.html
├── register.html
├── dashboard.html
├── admin.html
├── src/
│   ├── supabase.js
│   ├── auth.js
│   ├── dashboard.js
│   ├── admin.js
│   ├── login.js
│   ├── register.js
│   └── ...
├── public/
├── package.json
├── vite.config.js
├── netlify.toml
└── ...
```
