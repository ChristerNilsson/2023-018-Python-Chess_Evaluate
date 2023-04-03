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
	buttons:[]
}

import {ass,log,range} from '../js/utils.js'
import {Button} from '../js/button.js'

export coords = (uci) =>
	c0 = "abcdefgh".indexOf uci[0]
	r0 = "12345678".indexOf uci[1]
	c1 = "abcdefgh".indexOf uci[2]
	r1 = "12345678".indexOf uci[3]
	[c0+8*r0, c1+8*r1]
ass [8,24], coords "a2a4"

export empty = (n) => (1+n//8).toString()

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
			tempSAN = [move.san]
			tempUCI = [move.uci]
		else
			tempSAN = [move.san].concat move.superiorsSan
			tempUCI = [move.uci].concat move.superiors

		for i in range min 13, tempSAN.length
			do (i) =>
				x = 9.4*global.SIZE
				y = 0.8*global.SIZE*(i+1.1)
				san = tempSAN[i]
				uci = tempUCI[i]
				button = new Button x,y, san, () => click i
				button.bg = ['black','white'][global.index%2]
				button.fg = ['white','black'][global.index%2]
				button.align = LEFT
				global.buttons.push button
		if global.buttons.length == 1 then i = 0 else i = 1
		global.buttons[i].drawStar = true

export click = (key) =>
	if key == 'flip' then global.board.flip()
	else if key == 'first' then setIndex 0
	else if key == 'last' then setIndex global.moves.length
	else if key == 'prev' then setIndex global.index-1
	else if key == 'next' then setIndex global.index+1
	else if key == 'link' then window.open data.link, '_blank'
	else if key == 'up'   then fixSuper -1
	else if key == 'down' then fixSuper 1
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
