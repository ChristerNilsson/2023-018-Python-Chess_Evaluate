import _           from 'https://cdn.skypack.dev/lodash'
import {ass,log,range} from '../js/utils.js'
import {Board} from '../js/board.js'
import {Button} from '../js/button.js'
import {Square} from '../js/square.js'
import {makeMove,setIndex,click,fixSuper,global,loadGame} from '../js/globals.js'

SIZE = global.SIZE
released = true # used in mousePressed/mouseReleased

window.preload = =>
	global.partier = loadJSON './data/partier.json' # , init
	for letter in "rnbqkp"
		global.pics[letter] = loadImage './images/b' + letter + '.png'
	for letter in "RNBQKP"
		global.pics[letter] = loadImage './images/w' + letter.toLowerCase() + '.png'

window.setup = =>
	createCanvas SIZE*10.3, SIZE*11

	textAlign CENTER,CENTER
	rectMode CENTER

	global.board = new Board()
	loadGame 0

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
	if key == 'PageUp' then click 'pgup'
	if key == 'PageDown' then click 'pgdn'
	xdraw()
	return false

window.mousePressed = =>
	if not released then return
	released =false
	for button in global.buttons.concat global.board.buttons
		if button.inside mouseX,mouseY
			button.onclick()
			xdraw()
			return false
	false

window.mouseReleased = =>
	released = true
	false