import _           from 'https://cdn.skypack.dev/lodash'
import {ass,log,range} from '../js/utils.js'
import {Board} from '../js/board.js'
import {Button} from '../js/button.js'
import {Square} from '../js/square.js'
import {makeMove,setIndex,click,fixSuper,global} from '../js/globals.js'

SIZE = global.SIZE

#global.filename = 'lichess_pgn_2023.03.30_ChristerNilsson_vs_assman69420.HaBJHriw.json'
#global.filename = 'JanChristerNilsson_vs_dn1023_2023.03.29.json'
#global.filename = "lichess_pgn_2023.03.31_Onur1907-06_vs_ChristerNilsson.BFUYknEp.json"
#global.filename = "lichess_pgn_2023.03.31_ChristerNilsson_vs_arapop.kElIgV5u.json"
global.filename ="lichess_pgn_2023.04.01_MohamedFadel123_vs_ChristerNilsson-D15.MyJVoc2Y.json"
global.filename ="lichess_pgn_2023.04.01_king1971_vs_ChristerNilsson.7aPwVw9A.json"

window.preload = =>
	global.data = loadJSON '../data/' + global.filename
	for letter in "rnbqkp"
		global.pics[letter] = loadImage 'images/b' + letter + '.png'
	for letter in "RNBQKP"
		global.pics[letter] = loadImage 'images/w' + letter + '.png'

# there is a bug in split
split = (s)	-> if s=="" then return [] else return s.split " "

window.setup = =>
	createCanvas SIZE*10.3, SIZE*11

	textAlign CENTER,CENTER
	rectMode CENTER

	console.log lerp 10,20,0.5
	global.lerp = lerp

	global.board = new Board()

	# [1, 35, "e5", "c5 d5 c6 Nc6", "e7e5", "c7c5 d7d5 c7c6 b8c6"],

	global.moves = global.data.plies
	global.moves = _.map global.moves, (move) =>
		score = move[1]
		san = move[2]
		superiorsSan = split move[3]
		uci = move[4]
		superiors = split move[5]
		superiorsSan = superiorsSan.slice 0,12
		superiors = superiors.slice 0,12
		scores = split move[6]
		{score, uci, san, superiors, superiorsSan, scores}
	global.piecess.push global.board.pieces

	for move in global.moves
		global.board.pieces = makeMove move.uci, _.last global.piecess
		global.piecess.push global.board.pieces

	setIndex 0 # tomt bräde

	xdraw()

xdraw = =>
	background 'gray'
	textSize SIZE
	global.board.draw()
	for button in global.buttons
		button.draw()

window.keyPressed = =>
	if key == 'ArrowRight'  then click 'next'
	if key == 'ArrowLeft' then click 'prev'
	if key == 'ArrowUp'  then click 'up'
	if key == 'ArrowDown' then click 'down'
	if key == ' ' then click 'flip'
	if key == 'Home' then click 'first'
	if key == 'End' then click 'last'
	xdraw()

window.mousePressed = =>
	for button in global.buttons.concat global.board.buttons
		if button.inside mouseX,mouseY
			button.onclick()
			xdraw()
			return
