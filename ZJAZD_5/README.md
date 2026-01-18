# Laboratorium 5: Testy w Cucumber

## Przygotowanie środowiska
1. Upewnij się, że masz zainstalowane Node.js (zalecane LTS) oraz npm.
2. Sklonuj repozytorium i przejdź do katalogu projektu (jesteś już w katalogu `ZJAZD_5`).
3. Zainstaluj zależności:

   ```bash
   npm install
   ```

   > Uwaga: projekt używa `ts-node/esm` i TypeScript w konfiguracji ESM; nie trzeba dodatkowo kompilować plików TS przed uruchomieniem testów.

## Uruchamianie testów BDD (Cucumber)
Repo zawiera przygotowane skrypty npm do uruchamiania testów:

- Uruchom testy w Chrome:

   ```bash
   npm run bdd:chrome
   ```

- Uruchom testy w Firefox:

   ```bash
   npm run bdd:firefox
   ```

- Uruchom oba zestawy kolejno (Chrome, a potem Firefox):

   ```bash
   npm run bdd:all
   ```

- Tryb "suchy" (sprawdzanie importów / dry run):

   ```bash
   npm run bdd:chrome:debug
   npm run bdd:firefox:debug
   ```

Skrypty uruchamiają Cucumber przez `ts-node/esm` (ESM runtime). Jeżeli chcesz uruchomić specyficzny scenariusz lub tag, możesz przekazać dodatkowe argumenty do cucumber-js używając bezpośrednio polecenia, np.:

```bash
BROWSER=chrome node --loader ts-node/esm ./node_modules/.bin/cucumber-js --import ./features/step.ts --format progress --tags "@apple"
```
