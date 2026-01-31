## Dollahanns-testboard-e2e-tests

В ходе работы были написаны E2E-тесты на стеке TypeScript + Playwright для учебного web-приложения Testboard.

Подробнее о структуре тестируемого приложения можно узнать в репозитории ручного тестирования: https://github.com/Dollahann/Manual-tests-avitoqa

### Требования

- установлен Node.js 18+ (лучше LTS)
- установлен npm 9+

### Использование вечного пользователя в тестах

В .env вносятся **данные пользователя**:

```bash
const USER_EMAIL = ;
const USER_PASSWORD = ;
```

### Запуск тестов

Тесты были написаны и запускались в IDE VScode, далее инструкция по запуску тестов в этом окружении:
1. Установить расширение: открыть раздел Extensions в VS Code (Ctrl+Shift+X или Cmd+Shift+X) и найти “Playwright”.
2. Сделать git clone репозитория.
3. Установить Playwright в рабочую директорию репозитория: открыть директорию через Open Folder, открыть Command Palette (Ctrl+Shift+P или Cmd+Shift+P) и выполнить команду Test: Install Playwright.
Либо, находясь в директории, можно установить зависимости **следующими командами**:
```bash
npm install
```
```bash
npx playwright install
```
4. Запуск тестов осуществлялся через интерфейс расширения во вкладке Testing, но также можно использовать **команду**:
```bash
npx playwright test
```
**Запустить конкретный тестовый файл openLoginForm.test.ts:**

```bash
npx playwright test tests/accountTests/openLoginForm.test.ts
```

**Запустить конкретный тест по названию:**

```bash
npx playwright test -g "Удаление объявления"
```
### Линтер (ESLint)

**Проверить проект линтером:**

```bash
npx eslint . 
```
**Запустить линтер для конкретного файла:**

```bash
npx eslint fixtures/auth.fixture.ts --fix
```
**Запустить линтер для всего проекта:**

```bash
npx eslint . --fix
```
