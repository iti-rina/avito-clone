# Клон Авито

## Суть задания

Разработать клон Авито с базовыми возможностями по работе с объявлениями. Приложение должно поддерживать размещение, редактирование и отображение объявлений в трёх различных категориях: недвижимость, авто и услуги.

## Возникшие проблемы и принятые решения в формате ADR

### Функциональные:

- [Изменения в UX/UI](./docs/functional-adrs/001-ux-ui-changes.md)
- [Добавление переводов](./docs/functional-adrs/002-translations-i18n.md)

### Нефункциональные:

- [Доработки API](./docs/non-functional-adr/001-api-changes.md)
- [Инструменты для валидации формы](./docs/non-functional-adr/002-react-hook-form.md)
- [Управление запросами к API](./docs/non-functional-adr/003-react-query-axios.md)
- [Выбор архитектуры проекта](./docs/non-functional-adr/004-fsd.md)
- [Выбор инструментов для сборки и запуска](./docs/non-functional-adr/005-project-building.md)

## Сборка и запуск проекта

### Docker

Требования:

- наличие Docker (20+)
- отсутствие запущенных приложений на `:3000`, `:80`

Команды:

- запуск проекта `docker-compose up -d`, веб-интерфейс проекта будет доступен на http://127.0.0.1:80
- остановка проекта `docker-compose stop`
- остановка проекта и удаление контенеров `docker-compose down`

### Локальная сборка через npm

Требования:

- node 20 и выше
- npm 10 и выше
- отсутствие приложений на `:3000` и `:5173`

Порядок запуска:

- запускаем backend-сервер: `cd backend && npm i && npm run start`
- запускаем приложение: `cd frontend && npm i && npm run dev`
- переходим на http://127.0.0.1:5173
