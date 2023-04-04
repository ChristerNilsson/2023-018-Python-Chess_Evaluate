
1. Läs in PGN-fil
2. Utvärdera varje drag.
3. MOVES = 12. Visa upp till tolv bättre drag.
4. Skapa fil.
5. Visa mha .js

Både UCI och SAN behövs, även om de är redundanta.
SAN visas och UCI behövs för draggenereringen.
Att konvertera mellan dem kräver kontext.

Filen innehåller en lista av listor:
```
[
[1, 25, "e4", "", "e2e4", ""],
[1, 35, "e5", "c5 d5 c6 Nc6", "e7e5", "c7c5 d7d5 c7c6 b8c6"],
[2, 35, "Nf3", "", "g1f3", ""],
[2, 21, "Nc6", "", "b8c6", ""],
[3, 42, "Bb5", "d4", "f1b5", "d2d4"],
...
]
```
* 0: move number
* 1: score: evaluation in centipawns or number of moves to mate
* 2: san: the actual move
* 3: superiorsSAN: sorted moves that are stronger than the played move. If zero, the best move was played. Last move is strongest.
* 4: uci: the actual move
* 5: superiorsUCI: sorted moves that are stronger than the played move. If zero, the best move was played.

uci = Universal Chess Interface (b8c6)
san = Standard Algebraic Notation (Nxc6+)

Listan till höger innehåller de drag som är bättre än det utförda draget.
Överst ser vi det bästa draget enligt Stockfish. Stjärnmärkt.
Nederst ser vi det utförda draget.
Mellan dem ligger drag med fallande styrka.
Om det utförda draget är bäst, visas bara detta drag.