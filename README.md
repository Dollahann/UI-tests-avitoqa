# Dollahanns-testboard-e2e-tests

E2E тесты на Playwright для Testboard.

### Требования

- Node.js 18+ (лучше LTS)
- npm 9+

### Использование вечного пользователя в тестах

В .env внесены данные моего пользователя:

```bash
const USER_EMAIL = ;
const USER_PASSWORD = ;
```

### Запуск тестов

Тесты запускались в IDE VScode.
1. Установите расширение: откройте раздел Extensions в VS Code (Ctrl+Shift+X или Cmd+Shift+X) и найдите “Playwright”.
2. Сделайте git clone репозитория.
3. Установите Playwright в рабочую директорию репозитория: откройте директорию через OpenFolder, откройте Command Palette (Ctrl+Shift+P или Cmd+Shift+P) и выполните команду Test: Install Playwright.
Аналог для 3го шага в терминале VScode:
находясь в директории, установить зависимости
```bash
npm install
```

```bash
npx playwright install
```
4. Запуск тестов осуществлялся через интерфейс расширения во вкладке Testing, но также можно использовать команду (из-за скорости выполнения и зависимости от нагруженности сервера некоторые тесты могут падать, перезапуск обычно исправляет проблему, при перезапуске теста searchAndFilters.test.ts важно, чтобы в профиле не было других объявлений с тем же префиксом):
```bash
npx playwright test
```

Запустить конкретный тестовый файл openLoginForm.test.ts:
```bash
npx playwright test tests/accountTests/openLoginForm.test.ts
```

Запустить конкретный тест по названию:
```bash
npx playwright test -g "Удаление объявления"
```
## Линтер (ESLint)

#### Проверить проект линтером:
```bash
npx eslint . 
```
Пустота означает, что ошибок нет
#### Запустить линтер для конкретного файла:
```bash
npx eslint fixtures/auth.fixture.ts --fix
```
#### Запустить линтер для всего проекта:
```bash
npx eslint . --fix
```
