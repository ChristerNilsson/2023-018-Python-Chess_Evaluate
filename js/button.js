// Generated by CoffeeScript 2.5.1
import {
  getMove,
  global
} from '../js/globals.js';

import {
  param,
  range
} from '../js/utils.js';

export var Button = class Button {
  constructor(x1, y1, text1, onclick) {
    this.star = this.star.bind(this);
    this.draw = this.draw.bind(this);
    this.drawBar = this.drawBar.bind(this);
    this.inside = this.inside.bind(this);
    this.x = x1;
    this.y = y1;
    this.text = text1;
    this.onclick = onclick;
    param.Compact("NNSF", arguments);
    // param.Number @x
    // param.Number @y
    // param.String @text
    // param.Function @onclick
    this.w = 1.7 * global.SIZE;
    this.h = 0.7 * global.SIZE;
    this.bg = 'lightgray';
    this.fg = 'black';
    this.align = CENTER;
    this.drawStar = false;
    this.bar = null;
  }

  star(c1, c2, x, y, r2, n) {
    var a, i, j, len, r, r1, ref, sx, sy;
    param.String(c1);
    param.String(c2);
    param.Number(x);
    param.Number(y);
    param.Number(r2);
    param.Integer(n);
    r1 = 0.385 * r2;
    fill(c2);
    ellipse(x, y, 2 * r2);
    fill(c1);
    angleMode(DEGREES);
    a = 180 / n;
    beginShape();
    ref = range(2 * n);
    for (j = 0, len = ref.length; j < len; j++) {
      i = ref[j];
      if (i % 2 === 0) {
        r = r1;
      } else {
        r = r2;
      }
      sx = x + r * cos(i * a + 90);
      sy = y + r * sin(i * a + 90);
      vertex(sx, sy);
    }
    return endShape(CLOSE);
  }

  draw() {
    var move, txt, x;
    move = getMove(global.index - 1);
    if (global.superIndex === 0) {
      txt = move.san;
    } else {
      txt = move.superiorsSan[global.superIndex - 1];
    }
    noStroke();
    fill(this.bg);
    rect(this.x, this.y, this.w, this.h * 0.65);
    if (this.align === LEFT) {
      x = this.x - 0.45 * this.w;
    } else {
      x = this.x;
    }
    if (this.text === txt) {
      fill('red');
    } else {
      fill(this.fg);
    }
    push();
    textSize(0.4 * global.SIZE);
    textAlign(this.align);
    noStroke();
    text(this.text, x, this.y + 0.05 * global.SIZE);
    pop();
    if (this.drawStar) {
      this.star("white", "green", this.x + 0.5 * global.SIZE, this.y, 0.15 * global.SIZE, 5);
    }
    if (this.bar !== null) {
      return this.drawBar();
    }
  }

  drawBar() {
    push();
    rectMode(CORNER);
    noStroke();
    fill('black');
    rect(this.x - this.w / 2, this.y + 0.35 * this.h, this.w, 0.1 * this.h);
    fill('white');
    rect(this.x - this.w / 2, this.y + 0.35 * this.h, this.w * this.bar, 0.1 * this.h);
    return pop();
  }

  inside(x, y) {
    param.Number(x);
    param.Number(y);
    return param.Boolean((this.x - this.w / 2 < x && x < this.x + this.w / 2) && (this.y - this.h / 2 < y && y < this.y + this.h / 2));
  }

};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmpzIiwic291cmNlUm9vdCI6Ii4uIiwic291cmNlcyI6WyJjb2ZmZWVcXGJ1dHRvbi5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQUE7RUFBUSxPQUFSO0VBQWdCLE1BQWhCO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVEsS0FBUjtFQUFjLEtBQWQ7Q0FBQSxNQUFBOztBQUVBLE9BQUEsSUFBYSxTQUFOLE1BQUEsT0FBQTtFQUNOLFdBQWEsR0FBQSxJQUFBLE9BQUEsU0FBQSxDQUFBO1FBY2IsQ0FBQSxXQUFBLENBQUE7UUFxQkEsQ0FBQSxXQUFBLENBQUE7UUFxQkEsQ0FBQSxjQUFBLENBQUE7UUFVQSxDQUFBLGFBQUEsQ0FBQTtJQWxFYyxJQUFDLENBQUE7SUFBRSxJQUFDLENBQUE7SUFBRSxJQUFDLENBQUE7SUFBSyxJQUFDLENBQUE7SUFDMUIsS0FBSyxDQUFDLE9BQU4sQ0FBYyxNQUFkLEVBQXFCLFNBQXJCLEVBQUY7Ozs7O0lBS0UsSUFBQyxDQUFBLENBQUQsR0FBSyxHQUFBLEdBQU0sTUFBTSxDQUFDO0lBQ2xCLElBQUMsQ0FBQSxDQUFELEdBQUssR0FBQSxHQUFNLE1BQU0sQ0FBQztJQUNsQixJQUFDLENBQUEsRUFBRCxHQUFNO0lBQ04sSUFBQyxDQUFBLEVBQUQsR0FBTTtJQUNOLElBQUMsQ0FBQSxLQUFELEdBQVM7SUFDVCxJQUFDLENBQUEsUUFBRCxHQUFZO0lBQ1osSUFBQyxDQUFBLEdBQUQsR0FBTztFQVpLOztFQWNiLElBQU8sQ0FBQyxFQUFELEVBQUssRUFBTCxFQUFTLENBQVQsRUFBWSxDQUFaLEVBQWUsRUFBZixFQUFtQixDQUFuQixDQUFBO0FBQ1IsUUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxHQUFBLEVBQUEsQ0FBQSxFQUFBLEVBQUEsRUFBQSxHQUFBLEVBQUEsRUFBQSxFQUFBO0lBQUUsS0FBSyxDQUFDLE1BQU4sQ0FBYSxFQUFiO0lBQ0EsS0FBSyxDQUFDLE1BQU4sQ0FBYSxF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SUFDQSxJQUFBLENBQUssT0FBTDtJQUNBLElBQUEsQ0FBSyxJQUFDLENBQUEsQ0FBRCxHQUFHLElBQUMsQ0FBQSxDQUFELEdBQUcsQ0FBWCxFQUFhLElBQUMsQ0FBQSxDQUFELEdBQUcsSUFBQSxHQUFLLElBQUMsQ0FBQSxDQUF0QixFQUF3QixJQUFDLENBQUEsQ0FBekIsRUFBMkIsR0FBQSxHQUFJLElBQUMsQ0FBQSxDQUFoQztJQUNBLElBQUEsQ0FBSyxPQUFMO0lBQ0EsSUFBQSxDQUFLLElBQUMsQ0FBQSxDQUFELEdBQUcsSUFBQyxDQUFBLENBQUQsR0FBRyxDQUFYLEVBQWEsSUFBQyxDQUFBLENBQUQsR0FBRyxJQUFBLEdBQUssSUFBQyxDQUFBLENBQXRCLEVBQXdCLElBQUMsQ0FBQSxDQUFELEdBQUcsSUFBQyxDQUFBLEdBQTVCLEVBQWdDLEdBQUEsR0FBSSxJQUFDLENBQUEsQ0FBckM7V0FDQSxHQUFBLENBQUE7RUFSUzs7RUFVVixNQUFTLENBQUMsQ0FBRCxFQUFHLENBQUgsQ0FBQTtJQUNSLEtBQUssQ0FBQyxNQUFOLENBQWEsQ0FBYjtJQUNBLEtBQUssQ0FBQyxNQUFOLENBQWEsQ0FBYjtXQUNBLEtBQUssQ0FBQyxPQUFOLENBQWMsQ0FBQSxJQUFDLENBQUEsQ0FBRCxHQUFHLElBQUMsQ0FBQSxDQUFELEdBQUcsQ0FBTixHQUFVLENBQVYsSUFBVSxDQUFWLEdBQWMsSUFBQyxDQUFBLENBQUQsR0FBRyxJQUFDLENBQUEsQ0FBRCxHQUFHLENBQXBCLENBQUEsSUFBMEIsQ0FBQSxJQUFDLENBQUEsQ0FBRCxHQUFHLElBQUMsQ0FBQSxDQUFELEdBQUcsQ0FBTixHQUFVLENBQVYsSUFBVSxDQUFWLEdBQWMsSUFBQyxDQUFBLENBQUQsR0FBRyxJQUFDLENBQUEsQ0FBRCxHQUFHLENBQXBCLENBQXhDO0VBSFE7O0FBbkVIIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtnZXRNb3ZlLGdsb2JhbH0gZnJvbSAnLi4vanMvZ2xvYmFscy5qcydcclxuaW1wb3J0IHtwYXJhbSxyYW5nZX0gZnJvbSAnLi4vanMvdXRpbHMuanMnXHJcblxyXG5leHBvcnQgY2xhc3MgQnV0dG9uXHJcblx0Y29uc3RydWN0b3I6IChAeCxAeSxAdGV4dCxAb25jbGljaykgLT5cclxuXHRcdHBhcmFtLkNvbXBhY3QgXCJOTlNGXCIsYXJndW1lbnRzXHJcblx0XHQjIHBhcmFtLk51bWJlciBAeFxyXG5cdFx0IyBwYXJhbS5OdW1iZXIgQHlcclxuXHRcdCMgcGFyYW0uU3RyaW5nIEB0ZXh0XHJcblx0XHQjIHBhcmFtLkZ1bmN0aW9uIEBvbmNsaWNrXHJcblx0XHRAdyA9IDEuNyAqIGdsb2JhbC5TSVpFXHJcblx0XHRAaCA9IDAuNyAqIGdsb2JhbC5TSVpFXHJcblx0XHRAYmcgPSAnbGlnaHRncmF5J1xyXG5cdFx0QGZnID0gJ2JsYWNrJ1xyXG5cdFx0QGFsaWduID0gQ0VOVEVSXHJcblx0XHRAZHJhd1N0YXIgPSBmYWxzZVxyXG5cdFx0QGJhciA9IG51bGxcclxuXHJcblx0c3RhciA6IChjMSwgYzIsIHgsIHksIHIyLCBuKSA9PlxyXG5cdFx0cGFyYW0uU3RyaW5nIGMxXHJcblx0XHRwYXJhbS5TdHJpbmcgYzJcclxuXHRcdHBhcmFtLk51bWJlciB4XHJcblx0XHRwYXJhbS5OdW1iZXIgeVxyXG5cdFx0cGFyYW0uTnVtYmVyIHIyXHJcblx0XHRwYXJhbS5JbnRlZ2VyIG5cclxuXHRcdHIxID0gMC4zODUqcjJcclxuXHRcdGZpbGwgYzJcclxuXHRcdGVsbGlwc2UgeCx5LDIqcjJcclxuXHRcdGZpbGwgYzFcclxuXHRcdGFuZ2xlTW9kZSBERUdSRUVTXHJcblx0XHRhID0gMTgwIC8gblxyXG5cdFx0YmVnaW5TaGFwZSgpXHJcblx0XHRmb3IgaSBpbiByYW5nZSAyKm5cclxuXHRcdFx0aWYgaSUyPT0wIHRoZW4gcj1yMSBlbHNlIHI9cjJcclxuXHRcdFx0c3ggPSB4ICsgciAqIGNvcyBpKmErOTBcclxuXHRcdFx0c3kgPSB5ICsgciAqIHNpbiBpKmErOTBcclxuXHRcdFx0dmVydGV4IHN4LCBzeVxyXG5cdFx0ZW5kU2hhcGUgQ0xPU0VcclxuXHJcblx0ZHJhdyA6ID0+XHJcblx0XHRtb3ZlID0gZ2V0TW92ZSBnbG9iYWwuaW5kZXgtMVxyXG5cdFx0aWYgZ2xvYmFsLnN1cGVySW5kZXggPT0gMFxyXG5cdFx0XHR0eHQgPSBtb3ZlLnNhblxyXG5cdFx0ZWxzZVxyXG5cdFx0XHR0eHQgPSBtb3ZlLnN1cGVyaW9yc1NhbltnbG9iYWwuc3VwZXJJbmRleC0xXVxyXG5cdFx0bm9TdHJva2UoKVxyXG5cdFx0ZmlsbCBAYmdcclxuXHRcdHJlY3QgQHgsQHksQHcsQGgqMC42NVxyXG5cclxuXHRcdGlmIEBhbGlnbj09TEVGVCB0aGVuIHg9QHgtMC40NSpAdyBlbHNlIHg9QHhcclxuXHRcdGlmIEB0ZXh0ID09IHR4dCB0aGVuIGZpbGwgJ3JlZCcgZWxzZSBmaWxsIEBmZ1xyXG5cdFx0cHVzaCgpXHJcblx0XHR0ZXh0U2l6ZSAwLjQqZ2xvYmFsLlNJWkVcclxuXHRcdHRleHRBbGlnbiBAYWxpZ25cclxuXHRcdG5vU3Ryb2tlKClcclxuXHRcdHRleHQgQHRleHQsIHgsQHkrMC4wNSpnbG9iYWwuU0laRVxyXG5cdFx0cG9wKClcclxuXHRcdGlmIEBkcmF3U3RhciB0aGVuIEBzdGFyIFwid2hpdGVcIixcImdyZWVuXCIsIEB4KzAuNSpnbG9iYWwuU0laRSwgQHksIDAuMTUqZ2xvYmFsLlNJWkUsIDVcclxuXHRcdGlmIEBiYXIgIT0gbnVsbCB0aGVuIEBkcmF3QmFyKClcclxuXHJcblx0ZHJhd0JhciA6ID0+XHJcblx0XHRwdXNoKClcclxuXHRcdHJlY3RNb2RlIENPUk5FUlxyXG5cdFx0bm9TdHJva2UoKVxyXG5cdFx0ZmlsbCAnYmxhY2snXHJcblx0XHRyZWN0IEB4LUB3LzIsQHkrMC4zNSpAaCxAdywwLjEqQGhcclxuXHRcdGZpbGwgJ3doaXRlJ1xyXG5cdFx0cmVjdCBAeC1Ady8yLEB5KzAuMzUqQGgsQHcqQGJhciwwLjEqQGhcclxuXHRcdHBvcCgpXHJcblxyXG5cdGluc2lkZSA6ICh4LHkpID0+XHJcblx0XHRwYXJhbS5OdW1iZXIgeFxyXG5cdFx0cGFyYW0uTnVtYmVyIHlcclxuXHRcdHBhcmFtLkJvb2xlYW4gQHgtQHcvMiA8IHggPCBAeCtAdy8yIGFuZCBAeS1AaC8yIDwgeSA8IEB5K0BoLzJcclxuIl19
//# sourceURL=c:\github\2023-018-Python-Chess_Evaluate\coffee\button.coffee