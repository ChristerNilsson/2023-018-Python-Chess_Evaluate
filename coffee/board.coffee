import {ass,lerp,param,range} from '../js/utils.js'
import {Square} from '../js/square.js'
import {Button} from '../js/button.js'
import {makeMove,clickString,getMove,global, loadGame, fixSuper} from '../js/globals.js'

SIZE = global.SIZE

export class Board
	constructor: ->
		@squares = []
		@pieces = ""
		@flipped = false
		for i in range 64
			@squares.push new Square i
		@start()

		@buttons = []
		x0 = 1.5
		x1 = 3.5
		x2 = 5.5
		x3 = 7.5
		@buttons.push new Button x0*SIZE, 9.5*SIZE, 'first',    => clickString 'first'
		@buttons.push new Button x1*SIZE, 9.5*SIZE, 'move -1',  => clickString 'prev'
		@buttons.push new Button x2*SIZE, 9.5*SIZE, 'move +1',  => clickString 'next'
		@buttons.push new Button x3*SIZE, 9.5*SIZE, 'last',     => clickString 'last'

		@buttons.push new Button x0*SIZE, 10.5*SIZE, 'flip',    => clickString 'flip'
		@buttons.push new Button x1*SIZE, 10.5*SIZE, 'game -1', => clickString 'pgup'
		@buttons.push new Button x2*SIZE, 10.5*SIZE, 'game +1', => clickString 'pgdn'
		@buttons.push new Button x3*SIZE, 10.5*SIZE, 'link',    => clickString 'link'
	start : =>
		@pieces = "RNBQKBNRPPPPPPPP33333333444444445555555566666666pppppppprnbqkbnr"

	move : (i) =>
		param.Integer i
		console.log 'move',i
		m = global.moves[global.index-1]
		if i==0 then key = m.uci else key = m.superiors[i-1]
		@pieces = makeMove key, global.piecess[global.index-1]
		global.superIndex = i+1
		fixSuper 0

	draw : =>

		for button in @buttons
			button.draw()

		if not global.data then return

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

		@littera()

		push()
		textAlign CENTER,CENTER
		if global.index > 0
			text 'move: ' + (1+global.index//2) + "BW"[global.index%2]+ " of "+ (1+global.moves.length//2), 4.5*SIZE, 10*SIZE
		if global.index==0
			score = '0'
		else 
			if global.superIndex == 0
				score = global.moves[global.index-1].score
			else 
				score = global.moves[global.index-1].scores[global.superIndex-1]

		text 'depth: '+global.data.depth, 1.5*SIZE, 10*SIZE
		text global.version, 7.5*SIZE, 10*SIZE
		textAlign RIGHT,CENTER
		fill 'white'
		text score, 10.1*SIZE, 0.3*SIZE

		pop()
		@drawBars score

	littera : =>
		noStroke()
		fill 'black'
		textSize SIZE*0.3
		letters = if @flipped then "hgfedcba" else "abcdefgh"
		digits = if @flipped then "87654321" else "12345678" 

		for i in range 8
			text letters[i],SIZE*(i+1),SIZE*8.8
			text digits[i],SIZE*0.15,SIZE*(i+1)

	flip : => @flipped = not @flipped

	drawBars : (score) ->
		param.String score
		stroke 'black' 
		h = calcBar score
		push()
		if @flipped
			translate 0, SIZE*9
			scale 1, -1
		rectMode CORNER
		noStroke()
		x = 0.35 * SIZE
		w = 0.10 * SIZE
		fill 'black'
		rect x, 0.5*SIZE, w, SIZE * 4
		fill 'white'
		rect x, 4.5*SIZE, w, SIZE * 4
		if h > 0
			fill 'white'
			rect x, 4.5*SIZE - h, w, h
		else
			fill 'black'
			rect x, 4.5*SIZE, w, -h
		pop()

	calcBar = (score) =>
		param.String score
		LIMIT = 2000
		if score[0]=='#' then d = LIMIT
		else d = Math.abs score
		if d>LIMIT then d = LIMIT
		res = lerp 0, 4*SIZE, d/LIMIT
		if "-" in score then res = -res
		param.Integer Math.round res
	ass 4*SIZE,calcBar "2100"
	ass 4*SIZE,calcBar "2000"
	ass 2*SIZE,calcBar "1000"
	ass SIZE,calcBar "500"
	ass 0,calcBar "1"
	ass -SIZE,calcBar "-500"
	ass -4*SIZE,calcBar "#-1"
