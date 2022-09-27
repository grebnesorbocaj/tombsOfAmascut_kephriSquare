from itertools import permutations as perms
from itertools import combinations as combs



def getVars():
    squares = [1, 2, 3, 4, 5, 6, 7 , 8]

    startingStatesTmp = []
    for i in range(8):
        startingStatesTmp.extend(list(combs(squares, i)))

    startingStates = [[0] * 8 for _ in range(len(startingStatesTmp))]

    for i in range(len(startingStatesTmp)):
        for active in startingStatesTmp[i]:
            index = active - 1
            startingStates[i][index] = 1

    solveOrders = list(perms(squares, 8))

    return startingStates, solveOrders

startingStates, solveOrders = getVars()