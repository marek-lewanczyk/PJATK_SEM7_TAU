# Laboratorium 5: Testy w Cucumber

## Przygotowanie środowiska i uruchomienie testów
1. Upewnij się, że masz zainstalowane node.js oraz npm.
2. Uruchom instalacje zależności:
   ```bash
   npm install
   ```
3. Uruchom testy za pomocą polecenia:
   ```bash
   npm run test-all
   ```

## Wybrane aplikacje internetowe:
1. [The Internet](https://the-internet.herokuapp.com/) - Zestaw prostych aplikacji do testowania.
2. [Apple](https://www.apple.com) – Oficjalna strona producenta sprzętu elektronicznego.

## Scenariusz 1 - logowanie poprawne i błędne (The Internet)

### Cel:
Przetestowanie funkcjonalności logowania z poprawnymi i błędnymi danymi.

### Kroki:
1. Otwórz stronę [The Internet - Login Page](https://the-internet.herokuapp.com/login).
2. Wprowadź poprawną nazwę użytkownika: `tomsmith`.
3. Wprowadź poprawne hasło: `SuperSecretPassword!`.
4. Kliknij przycisk "Login".
5. Sprawdź, czy pojawił się komunikat o pomyślnym logowaniu.
6. Wyloguj się, klikając przycisk "Logout".
7. Wróć do strony logowania.
8. Wprowadź błędną nazwę użytkownika: `wronguser`.
9. Wprowadź błędne hasło: `wrongpassword`.
10. Kliknij przycisk "Login".
11. Sprawdź, czy pojawił się komunikat o błędnym logowaniu

### Oczekiwane wyniki:
- Po poprawnym logowaniu aplikacja powinna przekierować użytkownika do strony z komunikatem o sukcesie.
- Po błędnym logowaniu aplikacja powinna wyświetlić komunikat o błędzie.

## Scenariusz 2 - sprawdzenie strony głównej Apple i przejście do zakupu produktu

### Cel:
Sprawdzenie poprawności działania strony głównej Apple oraz przejścia do podstrony zakupu produktu iPhone.

### Kroki:
1. Otwórz stronę główną Apple (https://www.apple.com).
2. Sprawdź, czy tytuł strony zawiera słowo „Apple”.
3. Zlokalizuj przycisk „Buy” dla produktu „iPhone 17 Pro”.
4. Kliknij przycisk „Buy”.
5. Sprawdź, czy nastąpiło przekierowanie na stronę zakupu produktu.

### Oczekiwane wyniki:
- Strona główna Apple otwiera się poprawnie, a jej tytuł zawiera słowo „Apple”.
- Po kliknięciu przycisku „Buy” użytkownik zostaje przekierowany na stronę zakupu „iPhone 17 Pro”.
