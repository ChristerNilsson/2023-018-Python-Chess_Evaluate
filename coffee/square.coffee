import {global} from '../js/globals.js'

SIZE = global.SIZE
pics = global.pics
width = global.width

export class Square
	constructor: (@i,@col) ->
		@x = @i%8
		@y = 7 - @i//8
		@w = SIZE
		@h = SIZE
		@col = 'white'
	draw : (piece,flipped) =>
		if (@x+@y) % 2 == 1 then fill 'gray' else fill 'lightgray'
		[x,y] = if flipped then [7-@x,7-@y] else [@x,@y]
		noStroke()
		rect SIZE*(x+1),SIZE*(y+1),SIZE,SIZE
		if piece in 'rnbqkpRNBQKP'
			image pics[piece],SIZE*(x+0.5),SIZE*(y+0.5),SIZE,SIZE
