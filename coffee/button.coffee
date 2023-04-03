import {getMove,global} from '../js/globals.js'
import {range} from '../js/utils.js'

export class Button
	constructor: (@x,@y,@text,@onclick) ->
		@w = 1.5 * global.SIZE
		@h = 0.7 * global.SIZE
		@bg = 'lightgray'
		@fg = 'black'
		@align = CENTER
		@drawStar = false

	star : (c1, c2, x, y, r2, n) =>
		r1 = 0.385*r2
		fill c2
		ellipse x,y,2*r2
		fill c1
		angleMode DEGREES
		a = 180 / n
		beginShape()
		for i in range 2*n
			if i%2==0 then r=r1 else r=r2
			sx = x + r * cos i*a+90
			sy = y + r * sin i*a+90
			vertex sx, sy
		endShape CLOSE

	draw : =>
		move = getMove global.index-1
		if global.superIndex == 0
			txt = move.san
		else
			txt = move.superiorsSan[global.superIndex-1]
		fill @bg
		rect @x,@y,@w,@h

		if @align==LEFT then x=@x-@w/2 else x=@x
		if @text == txt then fill 'red' else fill @fg
		push()
		textSize global.SIZE/2
		textAlign @align
		noStroke()
		text @text, x,@y+0.05*global.SIZE
		pop()
		if @drawStar
			@star "green","white", @x+0.5*global.SIZE, @y, 0.2*global.SIZE, 5

	inside : (x,y) => @x-@w/2 < x < @x+@w/2 and @y-@h/2 < y < @y+@h/2
