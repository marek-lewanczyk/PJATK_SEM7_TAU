# Simple Board Game Engine

Prosty silnik gry planszowej:

- generuje planszę AxB (min 5x5),
- losuje START (`A`) i STOP (`B`) na krawędziach (nie sąsiadują ze sobą),
- losuje przeszkody (`X`),
- wystawia funkcje ruchu (góra/dół/lewo/prawo) z walidacją ruchu.

## Uruchomienie lokalne

```bash
npm install
```

```bash
npm test
```

## Przykładowa plansza

```
. X . . . . X
. . . X . . X
. . . X . . .
A . . . X . B
. . . . . X .
```



