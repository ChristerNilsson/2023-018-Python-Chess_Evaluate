
1. Läs in PGN-fil
2. Utvärdera varje drag.
3. MOVES = 10. Visa upp till tio bättre drag.
4. Skapa fil.
5. Visa mha .js

Filen innehåller en lista objekt:
```
{
	"ply": "d2d4", 
	"san": "d4", 
	"score": 31, 
	"superiors": "Nf3 Qxb6"
}
```
* ply: from square to square.
* san: standardized algebraic notation, e.g. Nxd6+
* score: evaluation in centipawns or number of moves to mate
* superiors: sorted plies that are stronger than the played move. If zero, the best move was played.
