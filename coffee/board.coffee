import {range} from '../js/utils.js'
import {Square} from '../js/square.js'
import {Button} from '../js/button.js'
import {click,getMove,global} from '../js/globals.js'

SIZE = global.SIZE

export class Board
	constructor: ->
		@squares = []
		@pieces = ""
		@flipped = false
		for i in range 64
			@squares.push new Square i
		@start()

		@buttons =[]
		@buttons.push new Button 1.0*SIZE, 9.5*SIZE, 'first', () => click 'first'
		@buttons.push new Button 2.7*SIZE, 9.5*SIZE, 'prev', () => click 'prev'
		@buttons.push new Button 4.4*SIZE, 9.5*SIZE, 'next', () => click 'next'
		@buttons.push new Button 6.1*SIZE, 9.5*SIZE, 'last', () => click 'last'
		@buttons.push new Button 1.0*SIZE, 10.5*SIZE, 'flip', () => click 'flip'
		@buttons.push new Button 2.7*SIZE, 10.5*SIZE, 'link', () => click 'link'

	start : =>
		@pieces = "RNBQKBNRPPPPPPPP33333333444444445555555566666666pppppppprnbqkbnr"

	draw : =>
		fill 'white'
		textSize SIZE*0.3
		push()
		textAlign LEFT,CENTER
		text global.filename,0.05*SIZE, 0.3*SIZE
		pop()
		for i in range 64
			@squares[i].draw @pieces[i],@flipped
		stroke 'black'
		noFill()
		rect SIZE*4.5,SIZE*4.5,SIZE*8,SIZE*8
		noStroke()
		@littera()
		text global.index + " of "+ global.moves.length, 5*SIZE, 10.5*SIZE
		text global.data.depth, 10*SIZE, 0.3*SIZE

		txt0=""
		txt1=""
		if global.superIndex == 0 then txt0 = "actual move"
		if global.superIndex == getMove(global.index-1).superiorsSan.length then txt1 = "strongest"
		if txt0!="" and txt1!="" then txt = txt0 + " == " + txt1
		else txt = txt0 + txt1
		text txt, 8*SIZE, 10.5*SIZE
		for button in @buttons
			button.draw()

	littera : =>
		fill 'black'
		textSize SIZE*0.3
		for i in range 8
			if @flipped
				text "hgfedcba"[i],SIZE*(i+1),SIZE*8.8
				text "12345678"[i],SIZE*0.25,SIZE*(i+1)
			else
				text "abcdefgh"[i],SIZE*(i+1),SIZE*8.8
				text "87654321"[i],SIZE*0.25,SIZE*(i+1)

	flip : => @flipped = not @flipped
