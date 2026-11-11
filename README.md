# TaskFlow CRM — Starter

Стартовый каркас fullstack CRM на Next.js App Router, FSD, React Query, Redux Toolkit, Prisma ORM 7, PostgreSQL и Redis.

## Требования

- Node.js 22.18+ (для Prisma ORM 7; для нового окружения предпочтительна актуальная LTS-версия Node.js).
- Bun 1.x.
- Docker Desktop + Docker Compose.

> Важно: Prisma CLI и `@prisma/client` зафиксированы на major 7. Не запускайте `bunx prisma` без версии в другом проекте и не обновляйте Prisma CLI до 8 RC отдельно от Client. Для этого проекта используйте пакетный скрипт `bun run db:...`.

## 1. Установка

```bash
bun install
cp .env.example .env
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Замените `POSTGRES_PASSWORD` и `REDIS_PASSWORD` в `.env` на разные случайные значения. Такие же пароли должны присутствовать в `DATABASE_URL` и `REDIS_URL`.

Для генерации секретов можно выполнить в PowerShell:

```powershell
[Convert]::ToHexString([Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
```

## 2. Запуск инфраструктуры

```bash
docker compose up -d
```

Проверить контейнеры:

```bash
docker compose ps
docker compose logs -f postgres redis
```

PostgreSQL доступен на `localhost:5432`, Redis — на `localhost:6379`. Оба порта привязаны только к loopback-интерфейсу хоста.

## 3. Prisma

```bash
bun run db:generate
bun run db:migrate --name init
```

Если ваш Bun некорректно передаёт аргументы в script, используйте:

```bash
bunx prisma@7 migrate dev --name init
```

Prisma 7 берёт URL подключения из `prisma.config.ts`, а приложение подключается к PostgreSQL через `@prisma/adapter-pg`.

Prisma Client генерируется в `src/shared/lib/server/generated/prisma`. Эта директория игнорируется Git: после `bun install` запускайте `bun run db:generate`.

## 4. Запуск приложения

```bash
bun run dev
```

Откройте http://localhost:3000. Endpoint проверки инфраструктуры: http://localhost:3000/api/health.

## 5. Качество кода

```bash
bun run lint
bun run typecheck
bun run format:check
```

## 6. shadcn/ui

Конфигурация `components.json` уже использует FSD-алиасы и Tailwind CSS v4. Инициализируйте компоненты CLI:

```bash
bunx --bun shadcn@latest init
bunx --bun shadcn@latest add button card badge separator skeleton input label textarea dialog dropdown-menu select table tabs tooltip
```

Проверьте предложенные CLI настройки и оставьте каталог компонентов `src/shared/ui/components`. Переиспользуемые UI-примитивы должны находиться в `shared`, а компоненты, реализующие конкретные пользовательские сценарии, — в `features`.

## Команды

| Команда | Назначение |
|---|---|
| `bun run dev` | Dev-сервер Next.js |
| `bun run build` | Production build |
| `bun run lint` | ESLint |
| `bun run typecheck` | Проверка TypeScript |
| `bun run db:generate` | Генерация Prisma Client |
| `bun run db:migrate` | Создание dev-миграции |
| `bun run db:deploy` | Применение production-миграций |
| `bun run db:studio` | Prisma Studio |
| `bun run check` | ESLint + Typecheck |

## Архитектура

```text
src/
├── app/                 # Next.js routes, layouts, providers, route handlers
├── pages/               # FSD page compositions (добавим при росте экранов)
├── widgets/             # крупные блоки интерфейса
├── features/            # пользовательские действия и сценарии
├── entities/            # бизнес-сущности
└── shared/              # общая инфраструктура, UI, store, helpers
    ├── api/
    ├── lib/server/       # server-only: Prisma, Redis, generated client
    ├── store/            # Redux store
    └── ui/components/    # shadcn/ui

prisma/                  # schema и migrations
```

### Правила состояния

- TanStack Query: данные сервера, кеш, запросы, мутации и invalidation.
- Redux Toolkit: только локальное состояние интерфейса (например, Sidebar и вид доски).
- PostgreSQL: постоянные бизнес-данные.
- Redis: временные данные, rate limits, сессии/кеш с TTL на следующих этапах.

Не копируйте результаты React Query в Redux.

## Важные ограничения стартового этапа

- Регистрация, login, Resend, 2FA, RBAC и CRUD ещё не реализованы — это следующие этапы.
- Health endpoint показывает техническую доступность PostgreSQL и Redis, но не заменяет полноценный мониторинг.
- Не публикуйте `.env`, не открывайте Redis/PostgreSQL в интернет и не используйте dev-пароли в production.
- Перед production нужно добавить CI, тесты, CSP/security headers, резервное копирование и отдельный deployment workflow.
