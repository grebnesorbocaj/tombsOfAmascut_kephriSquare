class Puzzle:
    def __init__(self, startingOrder):
        self.order = startingOrder

            
    def __repr__(self):
        o = self.order
        return f"""
        {o[0]}\t{o[1]}\t{o[2]}

        {o[3]}\t\t{o[4]}

        {o[5]}\t{o[6]}\t{o[7]}
        """
    
    @property
    def complete(self):
        return all(self.order)

    @property
    def key(self):
        res = ""
        for t in self.order:
            res += str(t)
        return res
    
    def flipTile(self, tile):
        tile -= 1
        flip = {0: 1, 1: 0}
        if tile == 0:
            tiles = [0,1,3]
        elif tile == 1:
            tiles = [0,1,2]
        elif tile == 2:
            tiles = [1,2,4]
        elif tile == 3:
            tiles = [0,3,5]
        elif tile == 4:
            tiles = [2,4,7]
        elif tile == 5:
            tiles = [3,5,6]
        elif tile == 6:
            tiles = [5,6,7]
        elif tile == 7:
            tiles = [4,6,7]
        
        try:
            for i in tiles:
                self.order[i] = flip[self.order[i]]
        except:
            print(tile)