from vars import startingStates, solveOrders
from puzzle import Puzzle
import json
import copy

puzzles = []
for state in startingStates:
    puzzles.append(Puzzle(state))

def allPermutationsPerPuzzle(puzzle, solveOrder):
    successfulOrders = set()
    # print(f"{puzzle}")
    for order in solveOrder:
        default = copy.deepcopy(puzzle)
        for i, step in enumerate(order):
            default.flipTile(step)
            if default.complete:
                successfulOrders.add(order[:i+1])
                break

    return min(successfulOrders, key = lambda i: len(i))

puzzleSolves = {}
for p in puzzles:
    solve = allPermutationsPerPuzzle(p, solveOrders)
    puzzleSolves[p.key] = solve
    print(f"{p.key} -> {solve}")

with open('puzzleSolutions.json', 'w') as fp:
    json.dump(puzzleSolves, fp)
