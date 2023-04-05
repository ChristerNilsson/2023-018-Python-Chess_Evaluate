// Generated by CoffeeScript 2.5.1
var f, g, pgdn, pgup,
  modulo = function(a, b) { return (+a % (b = +b) + b) % b; },
  indexOf = [].indexOf;

export var global = {
  board: null,
  index: 0,
  SIZE: 50,
  filename: "",
  pics: {},
  moves: [],
  data: null,
  superIndex: 0,
  piecess: [],
  buttons: [],
  partier: {},
  currGame: 0
};

import {
  ass,
  log,
  range,
  split
} from '../js/utils.js';

import {
  Button
} from '../js/button.js';

export var coords = (uci) => {
  var c0, c1, r0, r1;
  c0 = "abcdefgh".indexOf(uci[0]);
  r0 = "12345678".indexOf(uci[1]);
  c1 = "abcdefgh".indexOf(uci[2]);
  r1 = "12345678".indexOf(uci[3]);
  return [c0 + 8 * r0, c1 + 8 * r1];
};

ass([8, 24], coords("a2a4"));

export var empty = (n) => {
  return (1 + Math.floor(n / 8)).toString();
};

pgup = () => {
  return loadGame(1);
};

pgdn = () => {
  return loadGame(-1);
};

export var loadGame = (delta) => {
  var j, keys, len, move, ref;
  global.currGame = modulo(global.currGame + delta, _.size(global.partier));
  keys = _.keys(global.partier);
  global.filename = keys[global.currGame];
  global.data = global.partier[keys[global.currGame]];
  global.board.start();
  global.moves = global.data.plies;
  global.piecess = [];
  global.moves = _.map(global.moves, (move) => {
    var san, score, scores, superiors, superiorsSan, uci;
    score = move[1];
    san = move[2];
    superiorsSan = split(move[3]);
    uci = move[4];
    superiors = split(move[5]);
    scores = split(move[6]);
    superiorsSan = superiorsSan.slice(0, 12);
    superiors = superiors.slice(0, 12);
    return {score, uci, san, superiors, superiorsSan, scores};
  });
  global.piecess.push(global.board.pieces);
  ref = global.moves;
  for (j = 0, len = ref.length; j < len; j++) {
    move = ref[j];
    global.board.pieces = makeMove(move.uci, _.last(global.piecess));
    global.piecess.push(global.board.pieces);
  }
  return setIndex(0); // tomt bräde
};

export var makeMove = (uci, pieces) => {
  var enPassant, enPassantTrue, from, normalMove, promote, swap, to;
  swap = function(a, b, c, d) {
    return [pieces[a], pieces[b], pieces[c], pieces[d]] = [pieces[b], pieces[a], pieces[d], pieces[c]];
  };
  promote = function(uci, from, to) {
    var newPiece;
    newPiece = uci[4];
    if (indexOf.call(range(56, 63), to) >= 0) {
      newPiece = newPiece.toUpperCase();
    }
    pieces[to] = newPiece;
    return pieces[from] = empty(from);
  };
  enPassantTrue = function(from, to) { // Denna funktion skapades av CoPilot. Nästan korrekt.
    var ref, ref1, ref2;
    if ((ref = pieces[from], indexOf.call('pP', ref) >= 0) && pieces[to] === empty(to)) {
      if (pieces[from] === 'p' && pieces[to + 8] === 'P' && ((ref1 = from - to) === 7 || ref1 === 9)) {
        return true; // black takes white pawn
      }
      if (pieces[from] === 'P' && pieces[to - 8] === 'p' && ((ref2 = to - from) === 7 || ref2 === 9)) {
        return true; // white takes black pawn
      }
    }
    return false;
  };
  enPassant = function(from, to) {
    if (pieces[from] === 'p') {
      pieces[to + 8] = empty(to + 8);
    }
    if (pieces[from] === 'P') {
      pieces[to - 8] = empty(to - 8);
    }
    pieces[to] = pieces[from];
    return pieces[from] = empty(to);
  };
  normalMove = function(from, to) {
    pieces[to] = pieces[from];
    pieces[from] = empty(from);
    return pieces;
  };
  pieces = pieces.split("");
  [from, to] = coords(uci);
  if (uci === 'e1g1') {
    swap(4, 6, 5, 7); // castlings
  } else if (uci === 'e1c1') {
    swap(4, 2, 0, 3);
  } else if (uci === 'e8g8') {
    swap(60, 62, 61, 63);
  } else if (uci === 'e8c8') {
    swap(56, 59, 58, 60);
  } else if (uci.length === 5) {
    promote(uci, from, to);
  } else if (enPassantTrue(from, to)) {
    enPassant(from, to);
  } else {
    normalMove(from, to);
  }
  pieces = pieces.join("");
  return pieces;
};

ass("RNBQKBNRPPPP2PPP333333334444P4445555555566666666pppppppprnbqkbnr", makeMove('e2e4', "RNBQKBNRPPPPPPPP33333333444444445555555566666666pppppppprnbqkbnr"));

ass("R1111RK1222222223333333344444444555555556666666677777777r888k88r", makeMove('e1g1', "R111K11R222222223333333344444444555555556666666677777777r888k88r"));

ass("11KR111R222222223333333344444444555555556666666677777777r888k88r", makeMove('e1c1', "R111K11R222222223333333344444444555555556666666677777777r888k88r"));

ass("R111K11R222222223333333344444444555555556666666677777777r8888rk8", makeMove('e8g8', "R111K11R222222223333333344444444555555556666666677777777r888k88r"));

ass("R111K11R22222222333333334444444455555555666666667777777788kr888r", makeMove('e8c8', "R111K11R222222223333333344444444555555556666666677777777r888k88r"));

ass("R111K11R222222223333333344444444555555556666666677777777Q8888888", makeMove('a7a8q', "R111K11R2222222233333333444444445555555566666666P777777788888888"));

ass("1111r11122222222333333334444444455555555666666667777777788888888", makeMove('e2e1r', "111111112222p222333333334444444455555555666666667777777788888888"));

ass("11111111222222223333p3334444444455555555666666667777777788888888", makeMove('f4e3', "11111111222222223333P33344444p4455555555666666667777777788888888"));

ass('RNBQKBNR2PPPPPPP33333333P44444445555555566666666pppppppprnbqkbnr', makeMove('a2a4', "RNBQKBNRPPPPPPPP33333333444444445555555566666666pppppppprnbqkbnr"));

g = (item) => {
  if (indexOf.call(item, "#-") >= 0) {
    return -1000;
  }
  if (indexOf.call(item, "#") >= 0) {
    return 1000;
  }
  return parseInt(item);
};

f = (arrScore, c) => {
  var a, b, d;
  arrScore = _.map(arrScore, (item) => {
    return g(item);
  });
  a = _.min(arrScore);
  b = _.max(arrScore);
  c = g(c);
  d = _.max([Math.abs(a), Math.abs(b)]);
  a = -d;
  return (c - a) / (2 * d);
};

ass(0, f([-100, 50], -100));

ass(0.75, f([-100, 50], 50));

ass(1, f([-100, 50], 100));

export var setIndex = (value) => {
  var arrSAN, arrScore, i, j, len, move, ref;
  if (value < -1 || value > global.moves.length) {
    return;
  }
  if (value === -1) {
    return global.board.start();
  } else {
    global.index = value;
    global.buttons = [];
    global.board.pieces = global.piecess[global.index];
    if (global.index <= 0) {
      return;
    }
    move = global.moves[global.index - 1];
    global.superIndex = 0;
    if (move.superiors.length === 0) {
      arrSAN = [move.san];
      arrScore = [move.score];
    } else {
      arrSAN = move.superiorsSan.concat([move.san]);
      arrScore = move.scores.concat([move.score]);
    }
    ref = range(min(13, arrSAN.length));
    for (j = 0, len = ref.length; j < len; j++) {
      i = ref[j];
      ((i) => {
        var button, x, y;
        x = 9.4 * global.SIZE;
        y = 0.8 * global.SIZE * (i + 1.1);
        button = new Button(x, y, arrSAN[i], () => {
          return click(i);
        });
        button.bg = ['black', 'white'][global.index % 2];
        button.fg = ['white', 'black'][global.index % 2];
        button.align = LEFT;
        button.bar = f(arrScore, arrScore[i]);
        return global.buttons.push(button);
      })(i);
    }
    return global.buttons[0].drawStar = true;
  }
};

export var click = (key) => {
  if (key === 'flip') {
    return global.board.flip();
  } else if (key === 'first') {
    return setIndex(0);
  } else if (key === 'last') {
    return setIndex(global.moves.length);
  } else if (key === 'prev') {
    return setIndex(global.index - 1);
  } else if (key === 'next') {
    return setIndex(global.index + 1);
  } else if (key === 'link') {
    return window.open(data.link, '_blank');
  } else if (key === 'up') {
    return fixSuper(-1);
  } else if (key === 'down') {
    return fixSuper(1);
  } else if (key === 'pgup') {
    return pgup();
  } else if (key === 'pgdn') {
    return pgdn();
  } else {
    setIndex(global.index);
    return global.board.move(key);
  }
};

export var fixSuper = (value) => {
  var uci;
  global.superIndex = modulo(global.superIndex + value, getMove(global.index - 1).superiors.length + 1);
  if (global.superIndex === 0) {
    uci = getMove(global.index - 1).uci;
  } else {
    uci = getMove(global.index - 1).superiors[global.superIndex - 1];
  }
  return global.board.pieces = makeMove(uci, global.piecess[global.index - 1]);
};

export var getMove = (index) => {
  if (index === -1) {
    return {
      score: '',
      uci: '',
      san: '',
      superiors: [],
      superiorsSan: []
    };
  } else {
    return global.moves[index];
  }
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFscy5qcyIsInNvdXJjZVJvb3QiOiIuLiIsInNvdXJjZXMiOlsiY29mZmVlXFxnbG9iYWxzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLElBQUEsRUFBQSxJQUFBO0VBQUE7OztBQUFBLE9BQUEsSUFBTyxNQUFBLEdBQVM7RUFDZixLQUFBLEVBQU0sSUFEUztFQUVmLEtBQUEsRUFBTSxDQUZTO0VBR2YsSUFBQSxFQUFLLEVBSFU7RUFJZixRQUFBLEVBQVMsRUFKTTtFQUtmLElBQUEsRUFBSyxDQUFBLENBTFU7RUFNZixLQUFBLEVBQU0sRUFOUztFQU9mLElBQUEsRUFBSyxJQVBVO0VBUWYsVUFBQSxFQUFXLENBUkk7RUFTZixPQUFBLEVBQVEsRUFUTztFQVVmLE9BQUEsRUFBUSxFQVZPO0VBV2YsT0FBQSxFQUFTLENBQUEsQ0FYTTtFQVlmLFFBQUEsRUFBUztBQVpNOztBQWVoQixPQUFBO0VBQVEsR0FBUjtFQUFZLEdBQVo7RUFBZ0IsS0FBaEI7RUFBc0IsS0FBdEI7Q0FBQSxNQUFBOztBQUNBLE9BQUE7RUFBUSxNQUFSO0NBQUEsTUFBQTs7QUFFQSxPQUFBLElBQU8sTUFBQSxHQUFTLENBQUMsR0FBRCxDQUFBLEdBQUE7QUFDaEIsTUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQTtFQUFDLEVBQUEsR0FBSyxVQUFVLENBQUMsT0FBWCxDQUFtQixHQUFHLENBQUMsQ0FBRCxDQUF0QjtFQUNMLEVBQUEsR0FBSyxVQUFVLENBQUMsT0FBWCxDQUFtQixHQUFHLENBQUMsQ0FBRCxDQUF0QjtFQUNMLEVBQUEsR0FBSyxVQUFVLENBQUMsT0FBWCxDQUFtQixHQUFHLENBQUMsQ0FBRCxDQUF0QjtFQUNMLEVBQUEsR0FBSyxVQUFVLENBQUMsT0FBWCxDQUFtQixHQUFHLENBQUMsQ0FBRCxDQUF0QjtTQUNMLENBQUMsRUFBQSxHQUFHLENBQUEsR0FBRSxFQUFOLEVBQVUsRUFBQSxHQUFH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T0FBQSxDQUFRLE1BQU0sQ0FBQyxLQUFQLEdBQWEsQ0FBckIsQ0FBdUIsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVAsR0FBa0IsQ0FBbkIsRUFENUM7O1NBRUEsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFiLEdBQXNCLFFBQUEsQ0FBUyxHQUFULEVBQWEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBUCxHQUFhLENBQWQsQ0FBM0I7QUFKTDs7QUFNbEIsT0FBQSxJQUFPLE9BQUEsR0FBVSxDQUFDLEtBQUQsQ0FBQSxHQUFBO0VBQ2hCLElBQUcsS0FBQSxLQUFPLENBQUMsQ0FBWDtXQUNDO01BQUMsS0FBQSxFQUFNLEVBQVA7TUFBVyxHQUFBLEVBQUksRUFBZjtNQUFtQixHQUFBLEVBQUksRUFBdkI7TUFBMkIsU0FBQSxFQUFVLEVBQXJDO01BQXlDLFlBQUEsRUFBYTtJQUF0RCxFQUREO0dBQUEsTUFBQTtXQUdDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBRCxFQUhiOztBQURnQiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBnbG9iYWwgPSB7XHJcblx0Ym9hcmQ6bnVsbCxcclxuXHRpbmRleDowLFxyXG5cdFNJWkU6NTAsXHJcblx0ZmlsZW5hbWU6XCJcIixcclxuXHRwaWNzOnt9LFxyXG5cdG1vdmVzOltdLFxyXG5cdGRhdGE6bnVsbCxcclxuXHRzdXBlckluZGV4OjAsXHJcblx0cGllY2VzczpbXSxcclxuXHRidXR0b25zOltdLFxyXG5cdHBhcnRpZXI6IHt9LFxyXG5cdGN1cnJHYW1lOjBcclxufVxyXG5cclxuaW1wb3J0IHthc3MsbG9nLHJhbmdlLHNwbGl0fSBmcm9tICcuLi9qcy91dGlscy5qcydcclxuaW1wb3J0IHtCdXR0b259IGZyb20gJy4uL2pzL2J1dHRvbi5qcydcclxuXHJcbmV4cG9ydCBjb29yZHMgPSAodWNpKSA9PlxyXG5cdGMwID0gXCJhYmNkZWZnaFwiLmluZGV4T2YgdWNpWzBdXHJcblx0cjAgPSBcIjEyMzQ1Njc4XCIuaW5kZXhPZiB1Y2lbMV1cclxuXHRjMSA9IFwiYWJjZGVmZ2hcIi5pbmRleE9mIHVjaVsyXVxyXG5cdHIxID0gXCIxMjM0NTY3OFwiLmluZGV4T2YgdWNpWzNdXHJcblx0W2MwKzgqcjAsIGMxKzgqcjFdXHJcbmFzcyBbOCwyNF0sIGNvb3JkcyBcImEyYTRcIlxyXG5cclxuZXhwb3J0IGVtcHR5ID0gKG4pID0+ICgxK24vLzgpLnRvU3RyaW5nKClcclxuXHJcbnBndXAgPSA9PiBsb2FkR2FtZSAxXHJcbnBnZG4gPSA9PiBsb2FkR2FtZSAtMVxyXG5cclxuZXhwb3J0IGxvYWRHYW1lID0gKGRlbHRhKSA9PlxyXG5cdGdsb2JhbC5jdXJyR2FtZSA9IChnbG9iYWwuY3VyckdhbWUrZGVsdGEpICUlIF8uc2l6ZSBnbG9iYWwucGFydGllclxyXG5cclxuXHRrZXlzID0gXy5rZXlzIGdsb2JhbC5wYXJ0aWVyXHJcblx0Z2xvYmFsLmZpbGVuYW1lID0ga2V5c1tnbG9iYWwuY3VyckdhbWVdXHJcblx0Z2xvYmFsLmRhdGEgPSBnbG9iYWwucGFydGllcltrZXlzW2dsb2JhbC5jdXJyR2FtZV1dXHJcblxyXG5cdGdsb2JhbC5ib2FyZC5zdGFydCgpXHJcblxyXG5cdGdsb2JhbC5tb3ZlcyA9IGdsb2JhbC5kYXRhLnBsaWVzXHJcblx0Z2xvYmFsLnBpZWNlc3MgPSBbXVxyXG5cdGdsb2JhbC5tb3ZlcyA9IF8ubWFwIGdsb2JhbC5tb3ZlcywgKG1vdmUpID0+XHJcblx0XHRzY29yZSA9IG1vdmVbMV1cclxuXHRcdHNhbiA9IG1vdmVbMl1cclxuXHRcdHN1cGVyaW9yc1NhbiA9IHNwbGl0IG1vdmVbM11cclxuXHRcdHVjaSA9IG1vdmVbNF1cclxuXHRcdHN1cGVyaW9ycyA9IHNwbGl0IG1vdmVbNV1cclxuXHRcdHNjb3JlcyA9IHNwbGl0IG1vdmVbNl1cclxuXHRcdHN1cGVyaW9yc1NhbiA9IHN1cGVyaW9yc1Nhbi5zbGljZSAwLDEyXHJcblx0XHRzdXBlcmlvcnMgPSBzdXBlcmlvcnMuc2xpY2UgMCwxMlxyXG5cdFx0e3Njb3JlLCB1Y2ksIHNhbiwgc3VwZXJpb3JzLCBzdXBlcmlvcnNTYW4sIHNjb3Jlc31cclxuXHRnbG9iYWwucGllY2Vzcy5wdXNoIGdsb2JhbC5ib2FyZC5waWVjZXNcclxuXHJcblx0Zm9yIG1vdmUgaW4gZ2xvYmFsLm1vdmVzXHJcblx0XHRnbG9iYWwuYm9hcmQucGllY2VzID0gbWFrZU1vdmUgbW92ZS51Y2ksIF8ubGFzdCBnbG9iYWwucGllY2Vzc1xyXG5cdFx0Z2xvYmFsLnBpZWNlc3MucHVzaCBnbG9iYWwuYm9hcmQucGllY2VzXHJcblxyXG5cdHNldEluZGV4IDAgIyB0b210IGJyw6RkZVxyXG5cclxuZXhwb3J0IG1ha2VNb3ZlID0gKHVjaSxwaWVjZXMpID0+XHJcblxyXG5cdHN3YXAgPSAoYSxiLGMsZCkgLT5cclxuXHRcdFtwaWVjZXNbYV0scGllY2VzW2JdLHBpZWNlc1tjXSxwaWVjZXNbZF1dID0gW3BpZWNlc1tiXSxwaWVjZXNbYV0scGllY2VzW2RdLHBpZWNlc1tjXV1cclxuXHJcblx0cHJvbW90ZSA9ICh1Y2ksZnJvbSx0bykgLT5cclxuXHRcdG5ld1BpZWNlID0gdWNpWzRdXHJcblx0XHRpZiB0byBpbiByYW5nZSA1Niw2MyB0aGVuIG5ld1BpZWNlID0gbmV3UGllY2UudG9VcHBlckNhc2UoKVxyXG5cdFx0cGllY2VzW3RvXSA9IG5ld1BpZWNlXHJcblx0XHRwaWVjZXNbZnJvbV0gPSBlbXB0eSBmcm9tXHJcblxyXG5cdGVuUGFzc2FudFRydWUgPSAoZnJvbSx0bykgLT4gIyBEZW5uYSBmdW5rdGlvbiBza2FwYWRlcyBhdiBDb1BpbG90LiBOw6RzdGFuIGtvcnJla3QuXHJcblx0XHRpZiBwaWVjZXNbZnJvbV0gaW4gJ3BQJyBhbmQgcGllY2VzW3RvXSA9PSBlbXB0eSB0b1xyXG5cdFx0XHRpZiBwaWVjZXNbZnJvbV0gPT0gJ3AnIGFuZCBwaWVjZXNbdG8rOF09PSdQJyBhbmQgZnJvbSAtIHRvIGluIFs3LDldIHRoZW4gcmV0dXJuIHRydWUgIyBibGFjayB0YWtlcyB3aGl0ZSBwYXduXHJcblx0XHRcdGlmIHBpZWNlc1tmcm9tXSA9PSAnUCcgYW5kIHBpZWNlc1t0by04XT09J3AnIGFuZCB0byAtIGZyb20gaW4gWzcsOV0gdGhlbiByZXR1cm4gdHJ1ZSAjIHdoaXRlIHRha2VzIGJsYWNrIHBhd25cclxuXHRcdHJldHVybiBmYWxzZVxyXG5cclxuXHRlblBhc3NhbnQgPSAoZnJvbSx0bykgLT5cclxuXHRcdGlmIHBpZWNlc1tmcm9tXSA9PSAncCcgdGhlbiBwaWVjZXNbdG8rOF0gPSBlbXB0eSB0bys4XHJcblx0XHRpZiBwaWVjZXNbZnJvbV0gPT0gJ1AnIHRoZW4gcGllY2VzW3RvLThdID0gZW1wdHkgdG8tOFxyXG5cdFx0cGllY2VzW3RvXSA9IHBpZWNlc1tmcm9tXVxyXG5cdFx0cGllY2VzW2Zyb21dID0gZW1wdHkgdG9cclxuXHJcblx0bm9ybWFsTW92ZSA9IChmcm9tLHRvKSAtPlxyXG5cdFx0cGllY2VzW3RvXSA9IHBpZWNlc1tmcm9tXVxyXG5cdFx0cGllY2VzW2Zyb21dID0gZW1wdHkgZnJvbSBcclxuXHRcdHBpZWNlc1xyXG5cclxuXHRwaWVjZXMgPSBwaWVjZXMuc3BsaXQgXCJcIlxyXG5cclxuXHRbZnJvbSx0b10gPSBjb29yZHMgdWNpXHJcblx0aWYgdWNpPT0nZTFnMScgdGhlbiBzd2FwIDQsNiw1LDcgIyBjYXN0bGluZ3NcclxuXHRlbHNlIGlmIHVjaT09J2UxYzEnIHRoZW4gc3dhcCA0LDIsMCwzXHJcblx0ZWxzZSBpZiB1Y2k9PSdlOGc4JyB0aGVuIHN3YXAgNjAsNjIsNjEsNjNcclxuXHRlbHNlIGlmIHVjaT09J2U4YzgnIHRoZW4gc3dhcCA1Niw1OSw1OCw2MFxyXG5cdGVsc2UgaWYgdWNpLmxlbmd0aCA9PSA1IHRoZW4gcHJvbW90ZSB1Y2ksZnJvbSx0b1xyXG5cdGVsc2UgaWYgZW5QYXNzYW50VHJ1ZSBmcm9tLHRvIHRoZW4gZW5QYXNzYW50IGZyb20sdG9cclxuXHRlbHNlIG5vcm1hbE1vdmUgZnJvbSx0b1xyXG5cdHBpZWNlcyA9IHBpZWNlcy5qb2luIFwiXCJcclxuXHRwaWVjZXNcclxuXHJcbmFzcyBcIlJOQlFLQk5SUFBQUDJQUFAzMzMzMzMzMzQ0NDRQNDQ0NTU1NTU1NTU2NjY2NjY2NnBwcHBwcHBwcm5icWtibnJcIiwgbWFrZU1vdmUgJ2UyZTQnLCBcIlJOQlFLQk5SUFBQUFBQUFAzMzMzMzMzMzQ0NDQ0NDQ0NTU1NTU1NTU2NjY2NjY2NnBwcHBwcHBwcm5icWtibnJcIlxyXG5hc3MgXCJSMTExMVJLMTIyMjIyMjIyMzMzMzMzMzM0NDQ0NDQ0NDU1NTU1NTU1NjY2NjY2NjY3Nzc3Nzc3N3I4ODhrODhyXCIsIG1ha2VNb3ZlICdlMWcxJywgXCJSMTExSzExUjIyMjIyMjIyMzMzMzMzMzM0NDQ0NDQ0NDU1NTU1NTU1NjY2NjY2NjY3Nzc3Nzc3N3I4ODhrODhyXCJcclxuYXNzIFwiMTFLUjExMVIyMjIyMjIyMjMzMzMzMzMzNDQ0NDQ0NDQ1NTU1NTU1NTY2NjY2NjY2Nzc3Nzc3NzdyODg4azg4clwiLCBtYWtlTW92ZSAnZTFjMScsIFwiUjExMUsxMVIyMjIyMjIyMjMzMzMzMzMzNDQ0NDQ0NDQ1NTU1NTU1NTY2NjY2NjY2Nzc3Nzc3NzdyODg4azg4clwiXHJcbmFzcyBcIlIxMTFLMTFSMjIyMjIyMjIzMzMzMzMzMzQ0NDQ0NDQ0NTU1NTU1NTU2NjY2NjY2Njc3Nzc3Nzc3cjg4ODhyazhcIiwgbWFrZU1vdmUgJ2U4ZzgnLCBcIlIxMTFLMTFSMjIyMjIyMjIzMzMzMzMzMzQ0NDQ0NDQ0NTU1NTU1NTU2NjY2NjY2Njc3Nzc3Nzc3cjg4OGs4OHJcIlxyXG5hc3MgXCJSMTExSzExUjIyMjIyMjIyMzMzMzMzMzM0NDQ0NDQ0NDU1NTU1NTU1NjY2NjY2NjY3Nzc3Nzc3Nzg4a3I4ODhyXCIsIG1ha2VNb3ZlICdlOGM4JywgXCJSMTExSzExUjIyMjIyMjIyMzMzMzMzMzM0NDQ0NDQ0NDU1NTU1NTU1NjY2NjY2NjY3Nzc3Nzc3N3I4ODhrODhyXCJcclxuYXNzIFwiUjExMUsxMVIyMjIyMjIyMjMzMzMzMzMzNDQ0NDQ0NDQ1NTU1NTU1NTY2NjY2NjY2Nzc3Nzc3NzdRODg4ODg4OFwiLCBtYWtlTW92ZSAnYTdhOHEnLFwiUjExMUsxMVIyMjIyMjIyMjMzMzMzMzMzNDQ0NDQ0NDQ1NTU1NTU1NTY2NjY2NjY2UDc3Nzc3Nzc4ODg4ODg4OFwiXHJcbmFzcyBcIjExMTFyMTExMjIyMjIyMjIzMzMzMzMzMzQ0NDQ0NDQ0NTU1NTU1NTU2NjY2NjY2Njc3Nzc3Nzc3ODg4ODg4ODhcIiwgbWFrZU1vdmUgJ2UyZTFyJyxcIjExMTExMTExMjIyMnAyMjIzMzMzMzMzMzQ0NDQ0NDQ0NTU1NTU1NTU2NjY2NjY2Njc3Nzc3Nzc3ODg4ODg4ODhcIlxyXG5hc3MgXCIxMTExMTExMTIyMjIyMjIyMzMzM3AzMzM0NDQ0NDQ0NDU1NTU1NTU1NjY2NjY2NjY3Nzc3Nzc3Nzg4ODg4ODg4XCIsIG1ha2VNb3ZlICdmNGUzJywgXCIxMTExMTExMTIyMjIyMjIyMzMzM1AzMzM0NDQ0NHA0NDU1NTU1NTU1NjY2NjY2NjY3Nzc3Nzc3Nzg4ODg4ODg4XCJcclxuYXNzICdSTkJRS0JOUjJQUFBQUFBQMzMzMzMzMzNQNDQ0NDQ0NDU1NTU1NTU1NjY2NjY2NjZwcHBwcHBwcHJuYnFrYm5yJywgbWFrZU1vdmUgJ2EyYTQnLCBcIlJOQlFLQk5SUFBQUFBQUFAzMzMzMzMzMzQ0NDQ0NDQ0NTU1NTU1NTU2NjY2NjY2NnBwcHBwcHBwcm5icWtibnJcIlxyXG5cclxuZyA9IChpdGVtKSA9PlxyXG5cdGlmIFwiIy1cIiBpbiBpdGVtIHRoZW4gcmV0dXJuIC0xMDAwXHJcblx0aWYgXCIjXCIgaW4gaXRlbSB0aGVuIHJldHVybiAxMDAwXHJcblx0cGFyc2VJbnQgaXRlbVxyXG5cclxuZiA9IChhcnJTY29yZSxjKSA9PlxyXG5cdGFyclNjb3JlID0gXy5tYXAgYXJyU2NvcmUsIChpdGVtKSA9PiBnIGl0ZW1cclxuXHRhID0gXy5taW4gYXJyU2NvcmVcclxuXHRiID0gXy5tYXggYXJyU2NvcmVcclxuXHRjID0gZyBjXHJcblx0ZCA9IF8ubWF4IFtNYXRoLmFicyhhKSxNYXRoLmFicyhiKV1cclxuXHRhID0gLWRcclxuXHQoYy1hKS8oMipkKVxyXG5hc3MgMCwgZiBbLTEwMCw1MF0sLTEwMFxyXG5hc3MgMC43NSwgZiBbLTEwMCw1MF0sNTBcclxuYXNzIDEsIGYgWy0xMDAsNTBdLDEwMFxyXG5cclxuZXhwb3J0IHNldEluZGV4ID0odmFsdWUpID0+XHJcblx0aWYgdmFsdWUgPCAtMSBvciB2YWx1ZSA+IGdsb2JhbC5tb3Zlcy5sZW5ndGggdGhlbiByZXR1cm5cclxuXHRpZiB2YWx1ZSA9PSAtMSB0aGVuIGdsb2JhbC5ib2FyZC5zdGFydCgpXHJcblx0ZWxzZVxyXG5cdFx0Z2xvYmFsLmluZGV4ID0gdmFsdWVcclxuXHRcdGdsb2JhbC5idXR0b25zID0gW11cclxuXHRcdGdsb2JhbC5ib2FyZC5waWVjZXMgPSBnbG9iYWwucGllY2Vzc1tnbG9iYWwuaW5kZXhdXHJcblx0XHRpZiBnbG9iYWwuaW5kZXg8PTAgdGhlbiByZXR1cm4gXHJcblx0XHRtb3ZlID0gZ2xvYmFsLm1vdmVzW2dsb2JhbC5pbmRleC0xXVxyXG5cdFx0Z2xvYmFsLnN1cGVySW5kZXggPSAwXHJcblx0XHRpZiBtb3ZlLnN1cGVyaW9ycy5sZW5ndGggPT0gMFxyXG5cdFx0XHRhcnJTQU4gPSBbbW92ZS5zYW5dXHJcblx0XHRcdGFyclNjb3JlID0gW21vdmUuc2NvcmVdXHJcblx0XHRlbHNlIFxyXG5cdFx0XHRhcnJTQU4gPSBtb3ZlLnN1cGVyaW9yc1Nhbi5jb25jYXQgW21vdmUuc2FuXVxyXG5cdFx0XHRhcnJTY29yZSA9IG1vdmUuc2NvcmVzLmNvbmNhdCBbbW92ZS5zY29yZV1cclxuXHJcblx0XHRmb3IgaSBpbiByYW5nZSBtaW4gMTMsIGFyclNBTi5sZW5ndGhcclxuXHRcdFx0ZG8gKGkpID0+XHJcblx0XHRcdFx0eCA9IDkuNCpnbG9iYWwuU0laRVxyXG5cdFx0XHRcdHkgPSAwLjgqZ2xvYmFsLlNJWkUqKGkrMS4xKVxyXG5cdFx0XHRcdGJ1dHRvbiA9IG5ldyBCdXR0b24geCx5LCBhcnJTQU5baV0sICgpID0+IGNsaWNrIGlcclxuXHRcdFx0XHRidXR0b24uYmcgPSBbJ2JsYWNrJywnd2hpdGUnXVtnbG9iYWwuaW5kZXglMl1cclxuXHRcdFx0XHRidXR0b24uZmcgPSBbJ3doaXRlJywnYmxhY2snXVtnbG9iYWwuaW5kZXglMl1cclxuXHRcdFx0XHRidXR0b24uYWxpZ24gPSBMRUZUXHJcblx0XHRcdFx0YnV0dG9uLmJhciA9IGYgYXJyU2NvcmUsIGFyclNjb3JlW2ldXHJcblx0XHRcdFx0Z2xvYmFsLmJ1dHRvbnMucHVzaCBidXR0b25cclxuXHRcdGdsb2JhbC5idXR0b25zWzBdLmRyYXdTdGFyID0gdHJ1ZVxyXG5cclxuZXhwb3J0IGNsaWNrID0gKGtleSkgPT5cclxuXHRpZiBrZXkgPT0gJ2ZsaXAnIHRoZW4gZ2xvYmFsLmJvYXJkLmZsaXAoKVxyXG5cdGVsc2UgaWYga2V5ID09ICdmaXJzdCcgdGhlbiBzZXRJbmRleCAwXHJcblx0ZWxzZSBpZiBrZXkgPT0gJ2xhc3QnIHRoZW4gc2V0SW5kZXggZ2xvYmFsLm1vdmVzLmxlbmd0aFxyXG5cdGVsc2UgaWYga2V5ID09ICdwcmV2JyB0aGVuIHNldEluZGV4IGdsb2JhbC5pbmRleC0xXHJcblx0ZWxzZSBpZiBrZXkgPT0gJ25leHQnIHRoZW4gc2V0SW5kZXggZ2xvYmFsLmluZGV4KzFcclxuXHRlbHNlIGlmIGtleSA9PSAnbGluaycgdGhlbiB3aW5kb3cub3BlbiBkYXRhLmxpbmssICdfYmxhbmsnXHJcblx0ZWxzZSBpZiBrZXkgPT0gJ3VwJyAgIHRoZW4gZml4U3VwZXIgLTFcclxuXHRlbHNlIGlmIGtleSA9PSAnZG93bicgdGhlbiBmaXhTdXBlciAxXHJcblx0ZWxzZSBpZiBrZXkgPT0gJ3BndXAnIHRoZW4gcGd1cCgpXHJcblx0ZWxzZSBpZiBrZXkgPT0gJ3BnZG4nIHRoZW4gcGdkbigpXHJcblx0ZWxzZVxyXG5cdFx0c2V0SW5kZXggZ2xvYmFsLmluZGV4XHJcblx0XHRnbG9iYWwuYm9hcmQubW92ZSBrZXlcclxuXHJcbmV4cG9ydCBmaXhTdXBlciA9ICh2YWx1ZSkgPT5cclxuXHRnbG9iYWwuc3VwZXJJbmRleCA9IChnbG9iYWwuc3VwZXJJbmRleCt2YWx1ZSkgJSUgKGdldE1vdmUoZ2xvYmFsLmluZGV4LTEpLnN1cGVyaW9ycy5sZW5ndGgrMSlcclxuXHRpZiBnbG9iYWwuc3VwZXJJbmRleCA9PSAwIHRoZW4gdWNpID0gZ2V0TW92ZShnbG9iYWwuaW5kZXgtMSkudWNpXHJcblx0ZWxzZSB1Y2kgPSBnZXRNb3ZlKGdsb2JhbC5pbmRleC0xKS5zdXBlcmlvcnNbZ2xvYmFsLnN1cGVySW5kZXgtMV1cclxuXHRnbG9iYWwuYm9hcmQucGllY2VzID0gbWFrZU1vdmUgdWNpLGdsb2JhbC5waWVjZXNzW2dsb2JhbC5pbmRleC0xXVxyXG5cclxuZXhwb3J0IGdldE1vdmUgPSAoaW5kZXgpID0+XHJcblx0aWYgaW5kZXg9PS0xXHJcblx0XHR7c2NvcmU6JycsIHVjaTonJywgc2FuOicnLCBzdXBlcmlvcnM6W10sIHN1cGVyaW9yc1NhbjpbXX1cclxuXHRlbHNlXHJcblx0XHRnbG9iYWwubW92ZXNbaW5kZXhdXHJcbiJdfQ==
//# sourceURL=c:\github\2023-018-Python-Chess_Evaluate\coffee\globals.coffee