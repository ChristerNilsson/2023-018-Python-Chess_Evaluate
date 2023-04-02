import _           from 'https://cdn.skypack.dev/lodash'
import {log,range} from '../js/utils.js'

#filename = 'lichess_pgn_2023.03.30_ChristerNilsson_vs_assman69420.HaBJHriw.json'
#filename = 'JanChristerNilsson_vs_dn1023_2023.03.29.json'
#filename = "lichess_pgn_2023.03.31_Onur1907-06_vs_ChristerNilsson.BFUYknEp.json"
#filename = "lichess_pgn_2023.03.31_ChristerNilsson_vs_arapop.kElIgV5u.json"
filename ="lichess_pgn_2023.04.01_MohamedFadel123_vs_ChristerNilsson-D15.MyJVoc2Y.json"
filename ="lichess_pgn_2023.04.01_king1971_vs_ChristerNilsson.7aPwVw9A.json"

data = null
index = -1

SIZE = 100
EMPTY = '.'

pics = {}
piecess = []
buttons = []
board = null
moves = []

class Board
	constructor: ->
		@squares = []
		@pieces = ""
		@flipped = false
		for i in range 64
			@squares.push new Square i
		@start()

		buttons.push new Button 1.0*SIZE, 9.5*SIZE, 'first', () => click 'first'
		buttons.push new Button 2.7*SIZE, 9.5*SIZE, 'prev', () => click 'prev'
		# buttons.push new Button 4.4*SIZE, 9.5*SIZE, 'up', () => click 'up'
		# buttons.push new Button 4.4*SIZE, 10.5*SIZE, 'down', () => click 'down'
		buttons.push new Button 4.4*SIZE, 9.5*SIZE, 'next', () => click 'next'
		buttons.push new Button 6.1*SIZE, 9.5*SIZE, 'last', () => click 'last'
		buttons.push new Button 1.0*SIZE, 10.5*SIZE, 'flip', () => click 'flip'
		buttons.push new Button 2.7*SIZE, 10.5*SIZE, 'link', () => click 'link'

	start : =>
		@pieces = ""
		@pieces += "RNBQKBNR"
		@pieces += "PPPPPPPP"
		@pieces += "........"
		@pieces += "........"
		@pieces += "........"
		@pieces += "........"
		@pieces += "pppppppp"
		@pieces += "rnbqkbnr"

	draw : =>
		fill 'white'
		textSize SIZE*0.3
		push()
		textAlign LEFT,CENTER
		text filename,0.05*SIZE, 0.3*SIZE
		pop()
		for i in range 64
			@squares[i].draw @pieces[i],@flipped
		stroke 'black'
		noFill()
		rect SIZE*4.5,SIZE*4.5,SIZE*8,SIZE*8
		@littera()

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

	flip : () => @flipped = not @flipped

	move : (uci) =>

class Square
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

class Button
	constructor: (@x,@y,@text,@onclick) ->
		@w = 1.5* SIZE
		@h = 0.7*SIZE
	draw : =>
		fill 'white'
		rect @x,@y,@w,@h
		fill 'black'
		textSize SIZE/2
		text @text, @x,@y+0.05*SIZE
	inside : (x,y) => @x-@w/2 < x < @x+@w/2 and @y-@h/2 < y < @y+@h/2
coords = (uci) =>
	c0 ="abcdefgh".indexOf uci[0]
	r0 ="12345678".indexOf uci[1]
	c1 ="abcdefgh".indexOf uci[2]
	r1 ="12345678".indexOf uci[3]
	[c0+8*r0, c1+8*r1]
window.preload = =>
	data = loadJSON '../data/' + filename
	for letter in "rnbqkp"
		pics[letter] = loadImage 'images/b' + letter + '.png'
	for letter in "RNBQKP"
		pics[letter] = loadImage 'images/w' + letter + '.png'

window.setup = =>
	createCanvas SIZE*10.3, SIZE*11

	textAlign CENTER,CENTER
	rectMode CENTER

	board = new Board()

	moves = data.plies # [score,san,uci]
	res = []
	for move in moves
		score = move[0]
		superiorsSan = move[1].split " "
		superiors = move[2].split " "
		san = superiorsSan[0]
		uci = superiors[0]
		board.move uci
		res.push {score, uci, san, superiors, superiorsSan}
	moves = res
	log moves

	piecess.push board.pieces

	swap = (a,b,c,d) ->
		[pieces[a],pieces[b],pieces[c],pieces[d]] = [pieces[b],pieces[a],pieces[d],pieces[c]]

	promote = (from,to) ->
		newPiece = move.uci[4]
		if to in range 48,56 then newPiece = newPiece.toUpperCase()
		pieces[to] = newPiece
		pieces[from] = EMPTY

	enPassantTrue = (from,to) -> # Denna funktion skapades av CoPilot. Nästan korrekt.
		if pieces[from] in 'pP' and pieces[to] == EMPTY
			if pieces[from] == 'p' and pieces[to+8]=='P' and from - to in [7,9] then return true # black takes white pawn
			if pieces[from] == 'P' and pieces[to-8]=='p' and to - from in [7,9] then return true # white takes black pawn
		return false

	enPassant = (from,to) ->
		if pieces[from] == 'p' then pieces[to+8] = EMPTY
		if pieces[from] == 'P' then pieces[to-8] = EMPTY
		pieces[to] = pieces[from]
		pieces[from] = EMPTY

	normalMove = (from,to) ->
		pieces[to] = pieces[from]
		pieces[from] = EMPTY

	for i in range moves.length
		move = moves[i]
		pieces = _.clone _.last piecess
		pieces = pieces.split ""

		[from,to] = coords move.uci
		if move.uci=='e1g1' then swap 4,6,5,7 # castlings
		else if move.uci=='e1c1' then swap 4,2,0,3
		else if move.uci=='e8g8' then swap 60,62,61,63
		else if move.uci=='e8c8' then swap 56,59,58,60
		else if move.uci.length == 5 then promote from,to
		else if enPassantTrue from,to then enPassant from,to
		else	normalMove from,to 

		pieces = pieces.join ""
		piecess.push pieces

	xdraw()

xdraw = =>
	background 'gray'
	textSize SIZE
	board.draw()
	for button in buttons
		button.draw()

setIndex =(value) =>
	log 'setIndex',value,'/',moves.length-1
	if value < -1 or value > moves.length-1 then return
	if value == -1 then board.start()
	else
		index = value
		board.pieces = piecess[index]
		if index<=0 then return 
		buttons = buttons.slice 0,6
		move = moves[index-1]
		for i in range min 12, move.superiorsSan.length
			do (i) =>
				x = 9.4*SIZE
				y = 0.8*SIZE*(i+1.1)
				san = move.superiorsSan[i]
				uci = move.superiors[i]
				buttons.push new Button x,y, san, () => click uci

	# xdraw()
getMove = (index) =>
	if index==-1
		return {score:'',uci:'',san:'',superiors:[],superiorsSan:[]}
	else
		return moves[index]
window.keyPressed = () =>
	if key == 'ArrowRight'  then click 'next'
	if key == 'ArrowLeft' then click 'prev'
	if key == ' ' then click 'flip'
	if key == 'Home' then click 'first'
	if key == 'End' then click 'last'
	xdraw()

click = (key) =>
	if key == 'flip' then board.flip()
	else if key == 'first' then setIndex -1
	else if key == 'last' then setIndex moves.length-2
	else if key == 'prev' then setIndex index-1
	else if key == 'next' then setIndex index+1
	else if key == 'link' then window.open data.link, '_blank'
	else
		log key
		#setIndex index
		#board.move key

showSan = (index) =>
	if index < 0 or index >= moves.length-1 then return ''
	if index%2 == 0 then dots = '. ' else dots = '. ... '
	div {}, (index+2)//2 + dots + getMove(index).san

window.mousePressed = () =>
	for button in buttons
		if button.inside mouseX,mouseY
			log "mousePressed"
			button.onclick()
			xdraw()
