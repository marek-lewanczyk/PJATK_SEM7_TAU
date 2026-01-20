# Laboratorium 6 — Atrapy (Mocki)

## Domenа: E-commerce payments & orders (fikcyjny API)

Ten projekt dostarcza atrapy REST API dla prostego systemu płatności i faktur w sklepie internetowym. Nie uruchamiamy prawdziwego serwera — zamiast tego mamy:

- statyczne dane w `src/data/db.json`,
- warstwę `FakeApiClient` w `src/client/fakeApiClient.ts`, która symuluje endpointy i zwraca obiekty typu `ApiResponse<T>`,
- testy w `tests/` używające klienta i mocków.

Base URL: https://api.example.com (fikcyjny)
Auth: Bearer token (opis, brak realnej autoryzacji)

## Zasoby i modele
- Customer: `id, name, email, createdAt`
- Payment: `id, customerId, amount (cents), currency, status, createdAt`
- Refund: `id, paymentId, amount, reason?, createdAt`
- Invoice: `id, customerId, amount, paid, issuedAt`

## Endpointy (minimum 10)
1) GET /customers
   - Opis: lista klientów
   - Params: -
   - Response 200: list of customers
2) GET /customers/:id
   - Opis: pobierz klienta po ID
   - Response 200: customer
   - Response 404: not found
3) GET /payments
   - Opis: lista płatności (opcjonalny query: ?status=)
   - Response 200: list of payments
4) GET /payments/:id
   - Opis: pobierz płatność po ID
   - Response 200 | 404
5) POST /payments
   - Opis: utwórz płatność
   - Body: { customerId, amount, currency }
   - Response 201: created payment
   - Response 400: validation error
6) POST /payments/:id/capture
   - Opis: zarejestruj capture płatności (pending -> captured)
   - Response 200 | 404 | 400 (invalid state)
7) POST /payments/:id/cancel
   - Opis: anuluj płatność (pending -> cancelled)
   - Response 200 | 404 | 400
8) GET /refunds
   - Opis: lista refundów
9) GET /refunds/:id
   - Opis: refund po id
   - Response 200 | 404
10) POST /refunds
    - Opis: utwórz refund (wymagane: paymentId, amount)
    - Response 201 | 400 | 404
11) GET /invoices
12) GET /invoices/:id


## Data Source
Dane pochodzą z `src/data/db.json` i są wczytywane przez `src/client/dataSource.ts`. `FakeApiClient` używa sklonowanej kopii danych i symuluje tworzenie obiektów w pamięci.

## Uruchomienie testów
1. Zainstaluj zależności

```bash
npm install
```

2. Uruchom testy

```bash
npm test
```

## Uwagi
- To atrapa: nie ma końcówek sieciowych, wszystkie funkcje działają w pamięci.
- Można rozszerzyć klienta o dodatkowe operacje lub dodać bardziej zaawansowaną walidację.

