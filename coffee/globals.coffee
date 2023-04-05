export global = {
	board:null,
	index:0,
	SIZE:50,
	filename:"",
	pics:{},
	moves:[],
	data:null,
	superIndex:0,
	piecess:[],
	buttons:[],
	partier: {},
	currGame:0
}

import {ass,log,range,split} from '../js/utils.js'
import {Button} from '../js/button.js'

export coords = (uci) =>
	c0 = "abcdefgh".indexOf uci[0]
	r0 = "12345678".indexOf uci[1]
	c1 = "abcdefgh".indexOf uci[2]
	r1 = "12345678".indexOf uci[3]
	[c0+8*r0, c1+8*r1]
ass [8,24], coords "a2a4"

export empty = (n) => (1+n//8).toString()

pgup = => loadGame 1
pgdn = => loadGame -1

export loadGame = (delta) =>
	global.currGame = (global.currGame+delta) %% _.size global.partier

	keys = _.keys global.partier
	global.filename = keys[global.currGame]
	global.data = global.partier[keys[global.currGame]]

	global.board.start()

	global.moves = global.data.plies
	global.piecess = []
	global.moves = _.map global.moves, (move) =>
		score = move[1]
		san = move[2]
		superiorsSan = split move[3]
		uci = move[4]
		superiors = split move[5]
		scores = split move[6]
		superiorsSan = superiorsSan.slice 0,12
		superiors = superiors.slice 0,12
		{score, uci, san, superiors, superiorsSan, scores}
	global.piecess.push global.board.pieces

	for move in global.moves
		global.board.pieces = makeMove move.uci, _.last global.piecess
		global.piecess.push global.board.pieces

	setIndex 0 # tomt bräde

export makeMove = (uci,pieces) =>

	swap = (a,b,c,d) ->
		[pieces[a],pieces[b],pieces[c],pieces[d]] = [pieces[b],pieces[a],pieces[d],pieces[c]]

	promote = (uci,from,to) ->
		newPiece = uci[4]
		if to in range 56,63 then newPiece = newPiece.toUpperCase()
		pieces[to] = newPiece
		pieces[from] = empty from

	enPassantTrue = (from,to) -> # Denna funktion skapades av CoPilot. Nästan korrekt.
		if pieces[from] in 'pP' and pieces[to] == empty to
			if pieces[from] == 'p' and pieces[to+8]=='P' and from - to in [7,9] then return true # black takes white pawn
			if pieces[from] == 'P' and pieces[to-8]=='p' and to - from in [7,9] then return true # white takes black pawn
		return false

	enPassant = (from,to) ->
		if pieces[from] == 'p' then pieces[to+8] = empty to+8
		if pieces[from] == 'P' then pieces[to-8] = empty to-8
		pieces[to] = pieces[from]
		pieces[from] = empty to

	normalMove = (from,to) ->
		pieces[to] = pieces[from]
		pieces[from] = empty from 
		pieces

	pieces = pieces.split ""

	[from,to] = coords uci
	if uci=='e1g1' then swap 4,6,5,7 # castlings
	else if uci=='e1c1' then swap 4,2,0,3
	else if uci=='e8g8' then swap 60,62,61,63
	else if uci=='e8c8' then swap 56,59,58,60
	else if uci.length == 5 then promote uci,from,to
	else if enPassantTrue from,to then enPassant from,to
	else normalMove from,to
	pieces = pieces.join ""
	pieces

ass "RNBQKBNRPPPP2PPP333333334444P4445555555566666666pppppppprnbqkbnr", makeMove 'e2e4', "RNBQKBNRPPPPPPPP33333333444444445555555566666666pppppppprnbqkbnr"
ass "R1111RK1222222223333333344444444555555556666666677777777r888k88r", makeMove 'e1g1', "R111K11R222222223333333344444444555555556666666677777777r888k88r"
ass "11KR111R222222223333333344444444555555556666666677777777r888k88r", makeMove 'e1c1', "R111K11R222222223333333344444444555555556666666677777777r888k88r"
ass "R111K11R222222223333333344444444555555556666666677777777r8888rk8", makeMove 'e8g8', "R111K11R222222223333333344444444555555556666666677777777r888k88r"
ass "R111K11R22222222333333334444444455555555666666667777777788kr888r", makeMove 'e8c8', "R111K11R222222223333333344444444555555556666666677777777r888k88r"
ass "R111K11R222222223333333344444444555555556666666677777777Q8888888", makeMove 'a7a8q',"R111K11R2222222233333333444444445555555566666666P777777788888888"
ass "1111r11122222222333333334444444455555555666666667777777788888888", makeMove 'e2e1r',"111111112222p222333333334444444455555555666666667777777788888888"
ass "11111111222222223333p3334444444455555555666666667777777788888888", makeMove 'f4e3', "11111111222222223333P33344444p4455555555666666667777777788888888"
ass 'RNBQKBNR2PPPPPPP33333333P44444445555555566666666pppppppprnbqkbnr', makeMove 'a2a4', "RNBQKBNRPPPPPPPP33333333444444445555555566666666pppppppprnbqkbnr"

g = (item) =>
	if "#-" in item then return -1000
	if "#" in item then return 1000
	parseInt item

f = (arrScore,c) =>
	arrScore = _.map arrScore, (item) => g item
	a = _.min arrScore
	b = _.max arrScore
	c = g c
	d = _.max [Math.abs(a),Math.abs(b)]
	a = -d
	(c-a)/(2*d)
ass 0, f [-100,50],-100
ass 0.75, f [-100,50],50
ass 1, f [-100,50],100

export setIndex =(value) =>
	if value < -1 or value > global.moves.length then return
	if value == -1 then global.board.start()
	else
		global.index = value
		global.buttons = []
		global.board.pieces = global.piecess[global.index]
		if global.index<=0 then return 
		move = global.moves[global.index-1]
		global.superIndex = 0
		if move.superiors.length == 0
			arrSAN = [move.san]
			arrScore = [move.score]
		else 
			arrSAN = move.superiorsSan.concat [move.san]
			arrScore = move.scores.concat [move.score]

		for i in range min 13, arrSAN.length
			do (i) =>
				x = 9.4*global.SIZE
				y = 0.8*global.SIZE*(i+1.1)
				button = new Button x,y, arrSAN[i], () => click i
				button.bg = ['black','white'][global.index%2]
				button.fg = ['white','black'][global.index%2]
				button.align = LEFT
				button.bar = f arrScore, arrScore[i]
				global.buttons.push button
		global.buttons[0].drawStar = true

export click = (key) =>
	if key == 'flip' then global.board.flip()
	else if key == 'first' then setIndex 0
	else if key == 'last' then setIndex global.moves.length
	else if key == 'prev' then setIndex global.index-1
	else if key == 'next' then setIndex global.index+1
	else if key == 'link' then window.open data.link, '_blank'
	else if key == 'up'   then fixSuper -1
	else if key == 'down' then fixSuper 1
	else if key == 'pgup' then pgup()
	else if key == 'pgdn' then pgdn()
	else
		setIndex global.index
		global.board.move key

export fixSuper = (value) =>
	global.superIndex = (global.superIndex+value) %% (getMove(global.index-1).superiors.length+1)
	if global.superIndex == 0 then uci = getMove(global.index-1).uci
	else uci = getMove(global.index-1).superiors[global.superIndex-1]
	global.board.pieces = makeMove uci,global.piecess[global.index-1]

export getMove = (index) =>
	if index==-1
		{score:'', uci:'', san:'', superiors:[], superiorsSan:[]}
	else
		global.moves[index]
