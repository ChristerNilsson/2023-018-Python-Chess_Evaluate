# 2023-018-Python-Chess_Evaluate

[Try it!](https://christernilsson.github.io/2023-018-Python-Chess_Evaluate)

Detta program visar värdet av alla drag i ett helt schackparti.  
Tog fram detta pga att den feedback man får från chess.com och lichess mest består i att kalla alltför många drag "bookmove".  

Utvärdering av dragen sker med hjälp av ett separat pythonprogram som anropar stockfish.exe.

Pythonprogrammet läser en .pgn-fil och producerar en .json-fil.

![Skärmdump](Capture.JPG)

* Det drag som utförts, Ne5, står längst ner i högra knappraden.
* Hopp mellan utförda drag sker med horisontella pilar eller *prev*/*next*.
* Hopp mellan bättre drag sker med vertikala pilar.
* Bästa draget, Bd3 står högst upp, stjärnmarkerat.
* Aktuellt drag visas med röd knapptext.
* De bättre dragen är sorterade med fallande styrka.
* Om det utförda draget är bäst, visas bara detta.
* Brädet kan vändas med mellanslag eller *flip*
* *link* leder till analys av partiet på chess.com eller lichess.
* Under varje knapp visas dragets värde grafiskt.

# JSON-filen

```js
[1, "32", "d4", "e4 Nf3", "d2d4", "e2e4 g1f3", "37 37"],
[1, "34", "e6", "d5 Nf6", "e7e6", "d7d5 g8f6", "28 28"],
[2, "30", "Nf3", "e4 c4 g3", "g1f3", "e2e4 c2c4 g2g3", "44 41 39"],
[2, "56", "f5", "Nf6 d5 c5", "f7f5", "g8f6 d7d5 c7c5", "29 36 45"]
```

Varje rad innehåller utvärdering av ett halvdrag.
* 0: Halvdragets nummer
* 1: Utvärdering (score)
* 2: Utfört drag med SAD (Standard Algebraic Notation)
* 3: Bättre drag med SAD (Nf3)
* 4: Utfört drag med UCI (Universal Chess Interface)
* 5: Bättre drag med UCI (g1f3)
* 6: Bättre dragens utvärdering i centipawns.

Att både SAD och UCI används beror på att det krävs en del jobb för att omvandla mellan dem.  
UCI behövs för att flytta pjäserna på brädet.  
SAD behövs för att visa användaren draget i text.  

Move: 1.5 innebär att vit gjort två drag och att det är svarts tur.

