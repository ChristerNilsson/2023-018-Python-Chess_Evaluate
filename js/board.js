// Generated by CoffeeScript 2.5.1
var SIZE,
  indexOf = [].indexOf;

import {
  ass,
  lerp,
  range
} from '../js/utils.js';

import {
  Square
} from '../js/square.js';

import {
  Button
} from '../js/button.js';

import {
  makeMove,
  click,
  getMove,
  global
} from '../js/globals.js';

SIZE = global.SIZE;

export var Board = (function() {
  var calcBar;

  class Board {
    constructor() {
      var i, j, len, ref;
      this.start = this.start.bind(this);
      this.move = this.move.bind(this);
      this.draw = this.draw.bind(this);
      this.littera = this.littera.bind(this);
      this.flip = this.flip.bind(this);
      this.squares = [];
      this.pieces = "";
      this.flipped = false;
      ref = range(64);
      for (j = 0, len = ref.length; j < len; j++) {
        i = ref[j];
        this.squares.push(new Square(i));
      }
      this.start();
      this.buttons = [];
      this.buttons.push(new Button(1.0 * SIZE, 9.5 * SIZE, 'first', () => {
        return click('first');
      }));
      this.buttons.push(new Button(2.7 * SIZE, 9.5 * SIZE, 'prev', () => {
        return click('prev');
      }));
      this.buttons.push(new Button(4.4 * SIZE, 9.5 * SIZE, 'next', () => {
        return click('next');
      }));
      this.buttons.push(new Button(6.1 * SIZE, 9.5 * SIZE, 'last', () => {
        return click('last');
      }));
      this.buttons.push(new Button(1.0 * SIZE, 10.5 * SIZE, 'flip', () => {
        return click('flip');
      }));
      this.buttons.push(new Button(2.7 * SIZE, 10.5 * SIZE, 'link', () => {
        return click('link');
      }));
    }

    start() {
      return this.pieces = "RNBQKBNRPPPPPPPP33333333444444445555555566666666pppppppprnbqkbnr";
    }

    move(i) {
      var key, m;
      m = global.moves[global.index - 1];
      if (i === 0) {
        key = m.uci;
      } else {
        key = m.superiors[i - 1];
      }
      this.pieces = makeMove(key, global.piecess[global.index - 1]);
      return global.superIndex = i;
    }

    draw() {
      var button, i, j, k, len, len1, ref, ref1, results, score;
      fill('white');
      textSize(SIZE * 0.3);
      push();
      textAlign(LEFT, CENTER);
      text(global.filename, 0.05 * SIZE, 0.3 * SIZE);
      pop();
      ref = range(64);
      for (j = 0, len = ref.length; j < len; j++) {
        i = ref[j];
        this.squares[i].draw(this.pieces[i], this.flipped);
      }
      stroke('black');
      noFill();
      rect(SIZE * 4.5, SIZE * 4.5, SIZE * 8, SIZE * 8);
      this.littera();
      push();
      textAlign(LEFT, CENTER);
      text('move: ' + global.index / 2 + " of " + global.moves.length / 2, 4 * SIZE, 10.5 * SIZE);
      if (global.index === 0) {
        score = 0;
      } else {
        if (global.superIndex === 0) {
          score = global.moves[global.index - 1].score;
        } else {
          score = global.moves[global.index - 1].scores[global.superIndex - 1];
        }
      }
      text('score: ' + score, 7 * SIZE, 9.5 * SIZE);
      text('ver: 2023-04-05 11:33', 7 * SIZE, 10.0 * SIZE);
      text('depth: ' + global.data.depth, 7 * SIZE, 10.5 * SIZE);
      pop();
      this.drawBars(score);
      ref1 = this.buttons;
      results = [];
      for (k = 0, len1 = ref1.length; k < len1; k++) {
        button = ref1[k];
        results.push(button.draw());
      }
      return results;
    }

    littera() {
      var i, j, len, ref, results;
      noStroke();
      fill('black');
      textSize(SIZE * 0.3);
      ref = range(8);
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        i = ref[j];
        if (this.flipped) {
          text("hgfedcba"[i], SIZE * (i + 1), SIZE * 8.8);
          results.push(text("12345678"[i], SIZE * 0.1, SIZE * (i + 1)));
        } else {
          text("abcdefgh"[i], SIZE * (i + 1), SIZE * 8.8);
          results.push(text("87654321"[i], SIZE * 0.1, SIZE * (i + 1)));
        }
      }
      return results;
    }

    flip() {
      return this.flipped = !this.flipped;
    }

    drawBars(score) {
      var h;
      stroke('black');
      h = calcBar(score);
      push();
      rectMode(CORNER);
      noStroke();
      fill('black');
      rect(0.25 * SIZE, 0.5 * SIZE, SIZE * 0.2, SIZE * 4);
      fill('white');
      rect(0.25 * SIZE, 4.5 * SIZE, SIZE * 0.2, SIZE * 4);
      if (h > 0) {
        fill('white');
        rect(0.25 * SIZE, 4.5 * SIZE - h, SIZE * 0.2, h);
      } else {
        fill('black');
        rect(0.25 * SIZE, 4.5 * SIZE, SIZE * 0.2, -h);
      }
      return pop();
    }

  };

  calcBar = (score) => {
    var LIMIT, d, res;
    LIMIT = 2000;
    if (score[0] === '#') {
      d = LIMIT;
    } else {
      d = Math.abs(score);
    }
    if (d > LIMIT) {
      d = LIMIT;
    }
    res = lerp(0, 4 * SIZE, d / LIMIT);
    if (indexOf.call(score, "-") >= 0) {
      res = -res;
    }
    return Math.round(res);
  };

  ass(4 * SIZE, calcBar("2100"));

  ass(4 * SIZE, calcBar("2000"));

  ass(2 * SIZE, calcBar("1000"));

  ass(SIZE, calcBar("500"));

  ass(0, calcBar("1"));

  ass(-SIZE, calcBar("-500"));

  ass(-4 * SIZE, calcBar("#-1"));

  return Board;

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9hcmQuanMiLCJzb3VyY2VSb290IjoiLi4iLCJzb3VyY2VzIjpbImNvZmZlZVxcYm9hcmQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFBLElBQUE7RUFBQTs7QUFBQSxPQUFBO0VBQVEsR0FBUjtFQUFZLElBQVo7RUFBaUIsS0FBakI7Q0FBQSxNQUFBOztBQUNBLE9BQUE7RUFBUSxNQUFSO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVEsTUFBUjtDQUFBLE1BQUE7O0FBQ0EsT0FBQTtFQUFRLFFBQVI7RUFBaUIsS0FBakI7RUFBdUIsT0FBdkI7RUFBK0IsTUFBL0I7Q0FBQSxNQUFBOztBQUVBLElBQUEsR0FBTyxNQUFNLENBQUM7O0FBRWQsT0FBQSxJQUFhOzs7RUFBTixNQUFBLE1BQUE7SUFDTixXQUFhLENBQUEsQ0FBQTtBQUNkLFVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxHQUFBLEVBQUE7VUFjQyxDQUFBLFlBQUEsQ0FBQTtVQUdBLENBQUEsV0FBQSxDQUFBO1VBTUEsQ0FBQSxXQUFBLENBQUE7VUFxQ0EsQ0FBQSxjQUFBLENBQUE7VUFZQSxDQUFBLFdBQUEsQ0FBQTtNQXhFQyxJQUFDLENBQUEsT0FBRCxHQUFXO01BQ1gsSUFBQyxDQUFBLE1BQUQsR0FBVTtNQUNWLElBQUMsQ0FBQSxPQUFELEdBQVc7QUFDWDtNQUFBLEtBQUEscUNBQUE7O1FBQ0MsSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUFULENBQWMsSUFBSSxNQUFKLENBQVcsQ0FBWCxDQUFkO01BREQ7TUFFQSxJQUFDLENBQUEsS0FBRCxDQUFBO01BRUEsSUFBQyxDQUFBLE9BQUQsR0FBVTtNQUNWLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBVCxDQUFjLElBQUksTUFBSixDQUFXLEdBQUEsR0FBSSxJQUFmLEVBQXFCLEdBQUEsR0FBSSxJQUF6QixFQUErQixPQUEvQixFQUF3QyxDQUFBLENBQUEsR0FBQTtlQUFHLEtBQUEsQ0FBTSxPQUFOO01BQUgsQ0FBeEMsQ0FBZDtNQUNBLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBVCxDQUFjLElBQUksTUFBSixDQUFXLEdBQUEsR0FBSSxJQUFmLEVBQXFCLEdBQUEsR0FBSSxJQUF6QixFQUErQixNQUEvQixFQUF1QyxDQUFBLENBQUEsR0FBQTtlQUFHLEtBQUEsQ0FBTSxNQUFOO01BQUgsQ0FBdkMsQ0FBZDtNQUNBLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBVCxDQUFjLElBQUksTUFBSixDQUFXLEdBQUEsR0FBSSxJQUFmLEVBQXFCLEdBQUEsR0FBSSxJQUF6QixFQUErQixNQUEvQixFQUF1QyxDQUFBLENBQUEsR0FBQTtlQUFHLEtBQUEsQ0FBTSxNQUFOO01BQUgsQ0FBdkMsQ0FBZDtNQUNBLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBVCxDQUFjLElBQUksTUFBSixDQUFXLEdBQUEsR0FBSSxJQUFmLEVBQXFCLEdBQUEsR0FBSSxJQUF6QixFQUErQixNQUEvQixFQUF1QyxDQUFBLENBQUEsR0FBQTtlQUFHLEtBQUEsQ0FBTSxNQUFOO01BQUgsQ0FBdkMsQ0FBZDtNQUNBLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBVCxDQUFjLElBQUksTUFBSixDQUFXLEdBQUEsR0FBSSxJQUFmLEVBQXFCLElBQUEsR0FBSyxJQUExQixFQUFnQyxNQUFoQyxFQUF3QyxDQUFBLENBQUEsR0FBQTtlQUFHLEtBQUEsQ0FBTSxNQUFOO01BQUgsQ0FBeEMsQ0FBZDtNQUNBLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBVCxDQUFjLElBQUksTUFBSixDQUFXLEdBQUEsR0FBSSxJQUFmLEVBQXFCLElBQUEsR0FBSyxJQUExQixFQUFnQyxNQUFoQyxFQUF3QyxDQUFBLENBQUEsR0FBQTtlQUFHLEtBQUEsQ0FBTSxNQUFOO01BQUgsQ0FBeEMsQ0FBZDtJQWRZOztJQWViLEtBQVEsQ0FBQSxDQUFBO2FBQ1AsSUFBQyxDQUFBLE1BQUQsR0FBVTtJQURIOztJQUdSLElBQU8sQ0FBQyxDQUFELENBQUE7QUFDUixVQUFBLEdBQUEsRUFBQTtNQUFFLENBQUEsR0FBSSxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFQLEdBQWEsQ0FBZDtNQUNoQixJQUFHLENBQUEsS0FBRyxDQUFOO1FBQWEsR0FBQSxHQUFNLENBQUMsQ0FBQyxJQUFyQjtPQUFBLE1BQUE7UUFBOEIsR0FBQSxHQUFNLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQSxHQUFFLENBQUgsRUFBL0M7O01BQ0EsSUFBQyxDQUFBLE1BQUQsR0FBVSxRQUFBLENBQVMsR0FBVCxFQUFjLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQVAsR0FBYSxDQUFkLENBQTVCO2FBQ1YsTUFBTSxDQUFDLFVBQVAsR0FBb0I7SUFKZDs7SUFNUCxJQUFPLENBQUEsQ0FBQTtBQUNSLFVBQUEsTUFBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQSxJQUFBLEVBQUEsR0FBQSxFQUFBLElBQUEsRUFBQSxPQUFBLEVBQUE7TUFBRSxJQUFBLENBQUssT0FBTDtNQUNBLFFBQUEsQ0FBUyxJQUFBLEdBQUssR0FBZDtNQUVBLElBQUEsQ0FBQTtNQUNBLFNBQUEsQ0FBVSxJQUFWLEVBQWUsTUFBZjtNQUNBLElBQUEsQ0FBSyxNQUFNLENBQUMsUUFBWixFQUFxQixJQUFBLEdBQUssSUFBMUIsRUFBZ0MsR0FBQSxHQUFJLElBQXBDO01BQ0EsR0FBQSxDQUFBO0FBRUE7TUFBQSxLQUFBLHFDQUFBOztRQUNDLElBQUMsQ0FBQSxPQUFPLENBQUMsQ0FBRCxDQUFHLENBQUMsSUFBWixDQUFpQixJQUFDLENBQUEsTUFBTSxDQUFDLENBQUQsQ0FBeEIsRUFBNEIsSUFBQyxDQUFBLE9BQTdCO01BREQ7TUFFQSxNQUFBLENBQU8sT0FBUDtNQUNBLE1BQUEsQ0FBQTtNQUNBLElBQUEsQ0FBSyxJQUFBLEdBQUssR0FBVixFQUFjLElBQUEsR0FBSyxHQUFuQixFQUF1QixJQUFBLEdBQUssQ0FBNUIsRUFBOEIsSUFBQSxHQUFLLENBQW5DO01BRUEsSUFBQyxDQUFBLE9BQUQsQ0FBQTtNQUVBLElBQUEsQ0FBQTtNQUNBLFNBQUEsQ0FBVSxJQUFWLEVBQWUsTUFBZjtNQUNBLElBQUEsQ0FBSyxRQUFBLEdBQVMsTUFBTSxDQUFDLEtBQVAsR0FBYSxDQUF0QixHQUEwQixNQUExQixHQUFrQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQWIsR0FBb0IsQ0FBM0QsRUFBOEQsQ0FBQSxHQUFFLElBQWhFLEVBQXNFLElBQUEsR0FBSyxJQUEzRTtNQUNBLElBQUcsTUFBTSxDQUFDLEtBQVAsS0FBYyxDQUFqQjtRQUNDLEtBQUEsR0FBUSxFQURUO09BQUEsTUFBQTtRQUdDLElBQUcsTUFBTSxDQUFDLFVBQVAsS0FBcUIsQ0FBeEI7VUFDQyxLQUFBLEdBQVEsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBUCxHQUFhLENBQWQsQ0FBZ0IsQ0FBQyxNQUR0QztTQUFBLE1BQUE7VUFHQyxLQUFBLEdBQVEsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBUCxHQUFhLENBQWQsQ0FBZ0IsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVAsR0FBa0IsQ0FBbkIsRUFINUM7U0FIRDs7TUFRQSxJQUFBLENBQUssU0FBQSxHQUFVLEtBQWYsRUFBc0IsQ0FBQSxHQUFFLElBQXhCLEVBQThCLEdBQUEsR0FBSSxJQUFsQztNQUNBLElBQUEsQ0FBSyx1QkFBTCxFQUE4QixDQUFBLEdBQUUsSUFBaEMsRUFBc0MsSUFBQSxHQUFLLElBQTNDO01BQ0EsSUFBQSxDQUFLLFNBQUEsR0FBVSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQTNCLEVBQWtDLENBQUEsR0FBRSxJQUFwQyxFQUEwQyxJQUFBLEdBQUssSUFBL0M7TUFDQSxHQUFBLENBQUE7TUFDQSxJQUFDLENBQUEsUUFBRCxDQUFVLEtBQVY7QUFFQTtBQUFBO01BQUEsS0FBQSx3Q0FBQTs7cUJBQ0MsTUFBTSxDQUFDLElBQVAsQ0FBQTtNQURELENBQUE7O0lBbENNOztJQXFDUCxPQUFVLENBQUEsQ0FBQTtBQUNYLFVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxHQUFBLEVBQUEsR0FBQSxFQUFBO01BQUUsUUFBQSxDQUFBO01BQ0EsSUFBQSxDQUFLLE9BQUw7TUFDQSxRQUFBLENBQVMsSUFBQSxHQUFLLEdBQWQ7QUFDQTtBQUFBO01BQUEsS0FBQSxxQ0FBQTs7UUFDQyxJQUFHLElBQUMsQ0FBQSxPQUFKO1VBQ0MsSUFBQSxDQUFLLFVBQVUsQ0FBQyxDQUFELENBQWYsRUFBbUIsSUFBQSxHQUFLLENBQUMsQ0FBQSxHQUFFLENBQUgsQ0FBeEIsRUFBOEIsSUFBQSxHQUFLLEdBQW5DO3VCQUNBLElBQUEsQ0FBSyxVQUFVLENBQUMsQ0FBRCxDQUFmLEVBQW1CLElBQUEsR0FBSyxHQUF4QixFQUE0QixJQUFBLEdBQUssQ0FBQyxDQUFBLEdBQUUsQ0FBSCxDQUFqQyxHQUZEO1NBQUEsTUFBQTtVQUlDLElBQUEsQ0FBSyxVQUFVLENBQUMsQ0FBRCxDQUFmLEVBQW1CLElBQUEsR0FBSyxDQUFDLENBQUEsR0FBRSxDQUFILENBQXhCLEVBQThCLElBQUEsR0FBSyxHQUFuQzt1QkFDQSxJQUFBLENBQUssVUFBVSxDQUFDLENBQUQsQ0FBZixFQUFtQixJQUFBLEdBQUssR0FBeEIsRUFBNEIsSUFBQSxHQUFLLENBQUMsQ0FBQSxHQUFFLENBQUgsQ0FBakMsR0FMRDs7TUFERCxDQUFBOztJQUpTOztJQVlWLElBQU8sQ0FBQSxDQUFBO2FBQUcsSUFBQyxDQUFBLE9BQUQsR0FBVyxDQUFJLElBQUMsQ0FBQTtJQUFuQjs7SUFFUCxRQUFXLENBQUMsS0FBRCxDQUFBO0FBQ1osVUFBQTtNQUFFLE1BQUEsQ0FBTyxPQUFQO01BQ0EsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxLQUFSO01BRUosSUFBQSxDQUFBO01BQ0EsUUFBQSxDQUFTLE1BQVQ7TUFDQSxRQUFBLENBQUE7TUFDQSxJQUFBLENBQUssT0FBTDtNQUNBLElBQUEsQ0FBSyxJQUFBLEdBQUssSUFBVixFQUFnQixHQUFBLEdBQUksSUFBcEIsRUFBMEIsSUFBQSxHQUFLLEdBQS9CLEVBQW9DLElBQUEsR0FBTyxDQUEzQztNQUNBLElBQUEsQ0FBSyxPQUFMO01BQ0EsSUFBQSxDQUFLLElBQUEsR0FBSyxJQUFWLEVBQWdCLEdBQUEsR0FBSSxJQUFwQixFQUEwQixJQUFBLEdBQUssR0FBL0IsRUFBb0MsSUFBQSxHQUFPLENBQTNDO01BQ0EsSUFBRyxDQUFBLEdBQUksQ0FBUDtRQUNDLElBQUEsQ0FBSyxPQUFMO1FBQ0EsSUFBQSxDQUFLLElBQUEsR0FBSyxJQUFWLEVBQWdCLEdBQUEsR0FBSSxJQUFKLEdBQVcsQ0FBM0IsRUFBOEIsSUFBQSxHQUFLLEdBQW5DLEVBQXdDLENBQXhDLEVBRkQ7T0FBQSxNQUFBO1FBSUMsSUFBQSxDQUFLLE9BQUw7UUFDQSxJQUFBLENBQUssSUFBQSxHQUFLLElBQVYsRUFBZ0IsR0FBQSxHQUFJLElBQXBCLEVBQTBCLElBQUEsR0FBSyxHQUEvQixFQUFvQyxDQUFDLENBQXJDLEVBTEQ7O2FBTUEsR0FBQSxDQUFBO0lBakJVOztFQTVFTDs7RUErRk4sT0FBQSxHQUFVLENBQUMsS0FBRCxDQUFBLEdBQUE7QUFDWCxRQUFBLEtBQUEsRUFBQSxDQUFBLEVBQUE7SUFBRSxLQUFBLEdBQVE7SUFDUixJQUFHLEtBQUssQ0FBQyxDQUFELENBQUwsS0FBVSxHQUFiO01BQXNCLENBQUEsR0FBSSxNQUExQjtLQUFBLE1BQUE7TUFDSyxDQUFBLEdBQUksSUFBSSxDQUFDLEdBQUwsQ0FBUyxLQUFULEVBRFQ7O0lBRUEsSUFBRyxDQUFBLEdBQUUsS0FBTDtNQUFnQixDQUFBLEdBQUksTUFBcEI7O0lBQ0EsR0FBQSxHQUFNLElBQUEsQ0FBSyxDQUFMLEVBQVEsQ0FBQSxHQUFFLElBQVYsRUFBZ0IsQ0FBQSxHQUFFLEtBQWxCO0lBQ04saUJBQVUsT0FBUCxTQUFIO01BQXFCLEdBQUEsR0FBTSxDQUFDLElBQTVCOztXQUNBLElBQUksQ0FBQyxLQUFMLENBQVcsR0FBWDtFQVBTOztFQVFWLEdBQUEsQ0FBSSxDQUFBLEdBQUUsSUFBTixFQUFXLE9BQUEsQ0FBUSxNQUFSLENBQVg7O0VBQ0EsR0FBQSxDQUFJLENBQUEsR0FBRSxJQUFOLEVBQVcsT0FBQSxDQUFRLE1BQVIsQ0FBWDs7RUFDQSxHQUFBLENBQUksQ0FBQSxHQUFFLElBQU4sRUFBVyxPQUFBLENBQVEsTUFBUixDQUFYOztFQUNBLEdBQUEsQ0FBSSxJQUFKLEVBQVMsT0FBQSxDQUFRLEtBQVIsQ0FBVDs7RUFDQSxHQUFBLENBQUksQ0FBSixFQUFNLE9BQUEsQ0FBUSxHQUFSLENBQU47O0VBQ0EsR0FBQSxDQUFJLENBQUMsSUFBTCxFQUFVLE9BQUEsQ0FBUSxNQUFSLENBQVY7O0VBQ0EsR0FBQSxDQUFJLENBQUMsQ0FBRCxHQUFHLElBQVAsRUFBWSxPQUFBLENBQVEsS0FBUixDQUFaIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHthc3MsbGVycCxyYW5nZX0gZnJvbSAnLi4vanMvdXRpbHMuanMnXHJcbmltcG9ydCB7U3F1YXJlfSBmcm9tICcuLi9qcy9zcXVhcmUuanMnXHJcbmltcG9ydCB7QnV0dG9ufSBmcm9tICcuLi9qcy9idXR0b24uanMnXHJcbmltcG9ydCB7bWFrZU1vdmUsY2xpY2ssZ2V0TW92ZSxnbG9iYWx9IGZyb20gJy4uL2pzL2dsb2JhbHMuanMnXHJcblxyXG5TSVpFID0gZ2xvYmFsLlNJWkVcclxuXHJcbmV4cG9ydCBjbGFzcyBCb2FyZFxyXG5cdGNvbnN0cnVjdG9yOiAtPlxyXG5cdFx0QHNxdWFyZXMgPSBbXVxyXG5cdFx0QHBpZWNlcyA9IFwiXCJcclxuXHRcdEBmbGlwcGVkID0gZmFsc2VcclxuXHRcdGZvciBpIGluIHJhbmdlIDY0XHJcblx0XHRcdEBzcXVhcmVzLnB1c2ggbmV3IFNxdWFyZSBpXHJcblx0XHRAc3RhcnQoKVxyXG5cclxuXHRcdEBidXR0b25zID1bXVxyXG5cdFx0QGJ1dHRvbnMucHVzaCBuZXcgQnV0dG9uIDEuMCpTSVpFLCA5LjUqU0laRSwgJ2ZpcnN0JywgPT4gY2xpY2sgJ2ZpcnN0J1xyXG5cdFx0QGJ1dHRvbnMucHVzaCBuZXcgQnV0dG9uIDIuNypTSVpFLCA5LjUqU0laRSwgJ3ByZXYnLCA9PiBjbGljayAncHJldidcclxuXHRcdEBidXR0b25zLnB1c2ggbmV3IEJ1dHRvbiA0LjQqU0laRSwgOS41KlNJWkUsICduZXh0JywgPT4gY2xpY2sgJ25leHQnXHJcblx0XHRAYnV0dG9ucy5wdXNoIG5ldyBCdXR0b24gNi4xKlNJWkUsIDkuNSpTSVpFLCAnbGFzdCcsID0+IGNsaWNrICdsYXN0J1xyXG5cdFx0QGJ1dHRvbnMucHVzaCBuZXcgQnV0dG9uIDEuMCpTSVpFLCAxMC41KlNJWkUsICdmbGlwJywgPT4gY2xpY2sgJ2ZsaXAnXHJcblx0XHRAYnV0dG9ucy5wdXNoIG5ldyBCdXR0b24gMi43KlNJWkUsIDEwLjUqU0laRSwgJ2xpbmsnLCA9PiBjbGljayAnbGluaydcclxuXHRzdGFydCA6ID0+XHJcblx0XHRAcGllY2VzID0gXCJSTkJRS0JOUlBQUFBQUFBQMzMzMzMzMzM0NDQ0NDQ0NDU1NTU1NTU1NjY2NjY2NjZwcHBwcHBwcHJuYnFrYm5yXCJcclxuXHJcblx0bW92ZSA6IChpKSA9PlxyXG5cdFx0bSA9IGdsb2JhbC5tb3Zlc1tnbG9iYWwuaW5kZXgtMV1cclxuXHRcdGlmIGk9PTAgdGhlbiBrZXkgPSBtLnVjaSBlbHNlIGtleSA9IG0uc3VwZXJpb3JzW2ktMV1cclxuXHRcdEBwaWVjZXMgPSBtYWtlTW92ZSBrZXksIGdsb2JhbC5waWVjZXNzW2dsb2JhbC5pbmRleC0xXVxyXG5cdFx0Z2xvYmFsLnN1cGVySW5kZXggPSBpXHJcblxyXG5cdGRyYXcgOiA9Plx0XHRcclxuXHRcdGZpbGwgJ3doaXRlJ1xyXG5cdFx0dGV4dFNpemUgU0laRSowLjNcclxuXHJcblx0XHRwdXNoKClcclxuXHRcdHRleHRBbGlnbiBMRUZULENFTlRFUlxyXG5cdFx0dGV4dCBnbG9iYWwuZmlsZW5hbWUsMC4wNSpTSVpFLCAwLjMqU0laRVxyXG5cdFx0cG9wKClcclxuXHJcblx0XHRmb3IgaSBpbiByYW5nZSA2NFxyXG5cdFx0XHRAc3F1YXJlc1tpXS5kcmF3IEBwaWVjZXNbaV0sQGZsaXBwZWRcclxuXHRcdHN0cm9rZSAnYmxhY2snXHJcblx0XHRub0ZpbGwoKVxyXG5cdFx0cmVjdCBTSVpFKjQuNSxTSVpFKjQuNSxTSVpFKjgsU0laRSo4XHJcblxyXG5cdFx0QGxpdHRlcmEoKVxyXG5cclxuXHRcdHB1c2goKVxyXG5cdFx0dGV4dEFsaWduIExFRlQsQ0VOVEVSXHJcblx0XHR0ZXh0ICdtb3ZlOiAnK2dsb2JhbC5pbmRleC8yICsgXCIgb2YgXCIrIGdsb2JhbC5tb3Zlcy5sZW5ndGgvMiwgNCpTSVpFLCAxMC41KlNJWkVcclxuXHRcdGlmIGdsb2JhbC5pbmRleD09MFxyXG5cdFx0XHRzY29yZSA9IDAgXHJcblx0XHRlbHNlIFxyXG5cdFx0XHRpZiBnbG9iYWwuc3VwZXJJbmRleCA9PSAwXHJcblx0XHRcdFx0c2NvcmUgPSBnbG9iYWwubW92ZXNbZ2xvYmFsLmluZGV4LTFdLnNjb3JlXHJcblx0XHRcdGVsc2UgXHJcblx0XHRcdFx0c2NvcmUgPSBnbG9iYWwubW92ZXNbZ2xvYmFsLmluZGV4LTFdLnNjb3Jlc1tnbG9iYWwuc3VwZXJJbmRleC0xXVxyXG5cclxuXHRcdHRleHQgJ3Njb3JlOiAnK3Njb3JlLCA3KlNJWkUsIDkuNSpTSVpFXHJcblx0XHR0ZXh0ICd2ZXI6IDIwMjMtMDQtMDUgMTE6MzMnLCA3KlNJWkUsIDEwLjAqU0laRVxyXG5cdFx0dGV4dCAnZGVwdGg6ICcrZ2xvYmFsLmRhdGEuZGVwdGgsIDcqU0laRSwgMTAuNSpTSVpFXHJcblx0XHRwb3AoKVxyXG5cdFx0QGRyYXdCYXJzIHNjb3JlXHJcblxyXG5cdFx0Zm9yIGJ1dHRvbiBpbiBAYnV0dG9uc1xyXG5cdFx0XHRidXR0b24uZHJhdygpXHJcblxyXG5cdGxpdHRlcmEgOiA9PlxyXG5cdFx0bm9TdHJva2UoKVxyXG5cdFx0ZmlsbCAnYmxhY2snXHJcblx0XHR0ZXh0U2l6ZSBTSVpFKjAuM1xyXG5cdFx0Zm9yIGkgaW4gcmFuZ2UgOFxyXG5cdFx0XHRpZiBAZmxpcHBlZFxyXG5cdFx0XHRcdHRleHQgXCJoZ2ZlZGNiYVwiW2ldLFNJWkUqKGkrMSksU0laRSo4LjhcclxuXHRcdFx0XHR0ZXh0IFwiMTIzNDU2NzhcIltpXSxTSVpFKjAuMSxTSVpFKihpKzEpXHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHR0ZXh0IFwiYWJjZGVmZ2hcIltpXSxTSVpFKihpKzEpLFNJWkUqOC44XHJcblx0XHRcdFx0dGV4dCBcIjg3NjU0MzIxXCJbaV0sU0laRSowLjEsU0laRSooaSsxKVxyXG5cclxuXHRmbGlwIDogPT4gQGZsaXBwZWQgPSBub3QgQGZsaXBwZWRcclxuXHJcblx0ZHJhd0JhcnMgOiAoc2NvcmUpIC0+XHJcblx0XHRzdHJva2UgJ2JsYWNrJ1xyXG5cdFx0aCA9IGNhbGNCYXIgc2NvcmVcclxuXHJcblx0XHRwdXNoKClcclxuXHRcdHJlY3RNb2RlIENPUk5FUlxyXG5cdFx0bm9TdHJva2UoKVxyXG5cdFx0ZmlsbCAnYmxhY2snXHJcblx0XHRyZWN0IDAuMjUqU0laRSwgMC41KlNJWkUsIFNJWkUqMC4yLCBTSVpFICogNFxyXG5cdFx0ZmlsbCAnd2hpdGUnXHJcblx0XHRyZWN0IDAuMjUqU0laRSwgNC41KlNJWkUsIFNJWkUqMC4yLCBTSVpFICogNFxyXG5cdFx0aWYgaCA+IDBcclxuXHRcdFx0ZmlsbCAnd2hpdGUnXHJcblx0XHRcdHJlY3QgMC4yNSpTSVpFLCA0LjUqU0laRSAtIGgsIFNJWkUqMC4yLCBoXHJcblx0XHRlbHNlXHJcblx0XHRcdGZpbGwgJ2JsYWNrJ1xyXG5cdFx0XHRyZWN0IDAuMjUqU0laRSwgNC41KlNJWkUsIFNJWkUqMC4yLCAtaFxyXG5cdFx0cG9wKClcclxuXHJcblx0Y2FsY0JhciA9IChzY29yZSkgPT5cclxuXHRcdExJTUlUID0gMjAwMFxyXG5cdFx0aWYgc2NvcmVbMF09PScjJyB0aGVuIGQgPSBMSU1JVFxyXG5cdFx0ZWxzZSBkID0gTWF0aC5hYnMgc2NvcmVcclxuXHRcdGlmIGQ+TElNSVQgdGhlbiBkID0gTElNSVRcclxuXHRcdHJlcyA9IGxlcnAgMCwgNCpTSVpFLCBkL0xJTUlUXHJcblx0XHRpZiBcIi1cIiBpbiBzY29yZSB0aGVuIHJlcyA9IC1yZXNcclxuXHRcdE1hdGgucm91bmQgcmVzXHJcblx0YXNzIDQqU0laRSxjYWxjQmFyIFwiMjEwMFwiXHJcblx0YXNzIDQqU0laRSxjYWxjQmFyIFwiMjAwMFwiXHJcblx0YXNzIDIqU0laRSxjYWxjQmFyIFwiMTAwMFwiXHJcblx0YXNzIFNJWkUsY2FsY0JhciBcIjUwMFwiXHJcblx0YXNzIDAsY2FsY0JhciBcIjFcIlxyXG5cdGFzcyAtU0laRSxjYWxjQmFyIFwiLTUwMFwiXHJcblx0YXNzIC00KlNJWkUsY2FsY0JhciBcIiMtMVwiXHJcblxyXG4iXX0=
//# sourceURL=c:\github\2023-018-Python-Chess_Evaluate\coffee\board.coffee