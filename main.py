from stockfish import Stockfish # https://pypi.org/project/stockfish/
import time
import json
import chess
import chess.pgn

DEPTH = 15

board = None
analys = {}
plies = []

#filename = "lichess_pgn_2023.03.30_anikulapo8_vs_ChristerNilsson.F3Rd42Im"
#filename = "lichess_pgn_2023.03.30_Heedful_vs_ChristerNilsson.7oIetHP1"
#filename = "lichess_pgn_2023.03.30_ChristerNilsson_vs_assman69420.HaBJHriw"
#filename = "JanChristerNilsson_vs_dn1023_2023.03.29"
#filename = "lichess_pgn_2023.03.31_Onur1907-06_vs_ChristerNilsson.BFUYknEp"
#filename = "lichess_pgn_2023.03.31_ChristerNilsson_vs_arapop.kElIgV5u"
#filename = "lichess_pgn_2023.04.01_MohamedFadel123_vs_ChristerNilsson.MyJVoc2Y"
#filename = "lichess_pgn_2023.04.01_king1971_vs_ChristerNilsson.7aPwVw9A"
#filename = "lichess_pgn_2023.04.03_mathewjohn1965_vs_ChristerNilsson.hwnVaJZo"
#filename = "Bobby Fischer_vs_Boris V Spassky_1992.__.__"
filename = "Hikaru_vs_______.__.__"

def dump(objs):
	print()
	for obj in objs: print(obj)

def pretty(move):
	return board.san(chess.Move.from_uci(move["Move"]))

count = 0
start = time.time()

def get_superiors(children,move):
	if move=="d8e7":
		z=99
	count = len(children)
	score = "-999999"
	for i in range(len(children)):
		child = children[i]
		if child["Move"] == move:
			count = i
			score = cp_or_mate(child)
			break
	uci = [child["Move"] for child in children[0:count]]
	san = [pretty(child) for child in children[0:count]]
	scores = [str(cp_or_mate(child)) for child in children[0:count]]
	if score == "-999999":
		score =scores[-1]
	return [uci, san, scores, score]

def cp_or_mate(child):
	if child["Centipawn"] != None: return str(child["Centipawn"])
	if child["Mate"]      != None: return "#" + str(child["Mate"])
	return 'bomb'

engine = Stockfish(path="stockfish15/stockfish-windows-2022-x86-64-modern")
engine.set_depth(DEPTH)

pgn = "data/" + filename +".pgn"
with open(pgn) as f:
	game = chess.pgn.read_game(f)
board = game.board()
moves = [str(move) for move in game.mainline_moves()]
print(len(moves)/2,'moves')

san = str(game.mainline_moves()).split(" ")
san = [item for item in san if '.' not in item]

# name = "Site" if filename.startswith("lichess_pgn") else "Link"
if 'Site' in game.headers: link = game.headers['Site']
if 'Link' in game.headers: link = game.headers['Link']

print("i score move superiors")
board = game.board()
for i in range(len(moves)):
	if i==19:
		z=99
	ply = moves[i]
	engine.set_position(moves[:i])
	children = engine.get_top_moves(20)
	[superiors, superiorsSan, scores, score] = get_superiors(children,ply)
	superiors = " ".join(superiors)
	superiorsSan = " ".join(superiorsSan)
	scores = " ".join(scores)

	if i%2==0: print()
	print(1+i//2, score, san[i], superiorsSan)

	drag = chess.Move.from_uci(ply)
	board.push(drag)
	plies.append([1+i//2, score, san[i], superiorsSan, ply, superiors, scores])
analys['depth'] = DEPTH
analys['link'] = link
analys['cpu'] = round(time.time()-start,3)
analys['plies'] = plies

with open("data/" + filename+".json","w") as f:
	s = json.dumps(analys)
	s = s.replace(', [',',\n[')
	s = s.replace('[[','[\n[')
	f.write(s)

print("cpu:",analys['cpu'])
