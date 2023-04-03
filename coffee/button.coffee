import {getMove,global} from '../js/globals.js'

export class Button
	constructor: (@x,@y,@text,@onclick) ->
		@w = 1.5 * global.SIZE
		@h = 0.7 * global.SIZE
		@bg = 'lightgray'
		@fg = 'black'
	draw : =>
		move = getMove global.index
		console.log move
		if global.superIndex == 0
			txt = move.san
		else
			txt = move.superiorsSan[global.superIndex]
		fill @bg
		rect @x,@y,@w,@h
		console.log @text,txt
		if @text == txt then fill 'red' else fill @fg
		textSize global.SIZE/2
		text @text, @x,@y+0.05*global.SIZE
	inside : (x,y) => @x-@w/2 < x < @x+@w/2 and @y-@h/2 < y < @y+@h/2
