function flipTile(id){
  var tiles = [];
  if (id == "1") {
    tiles = ["1","2","4"];
  }
  else if (id == "2"){
    tiles = ["1","2","3"];
  }
  else if (id == "3"){
    tiles = ["2", "3", "5"];
  }
  else if (id == "4"){
    tiles = ["1", "4", "6"];
  }
  else if (id == "5"){
    tiles = ["3", "5", "8"];
  }
  else if (id == "6"){
    tiles = ["4", "6", "7"];
  }
  else if (id == "7"){
    tiles = ["6", "7", "8"];
  }
  else if (id == "8"){
    tiles = ["5", "7", "8"];
  }

  for (const index in tiles) {
    var tileId = tiles[index]
    var TILE = document.getElementById(tileId);
    var currentClass = TILE.className;
    var SOLVE = document.getElementById("solve");

    if (id == tileId){
      if (currentClass == "unlitTile highlight") {
        TILE.className = "litTile";
      } else if (currentClass == "unlitTile") {
        if (SOLVE.checked) {
          TILE.className = "litTile highlight"
        } else{
          TILE.className = "litTile"
        }
      } else if (currentClass == "litTile") {
        if (SOLVE.checked) {
          TILE.className = "unlitTile highlight"
        } else{
          TILE.className = "unlitTile"
        }
      } else {
        TILE.className = "unlitTile";
      }
    } 
    else {
      if (currentClass == "unlitTile") {
        TILE.className = "litTile";
      } else if (currentClass == "litTile") {
        TILE.className = "unlitTile";
      }
      else if (currentClass == "unlitTile highlight") {
        TILE.className = "litTile highlight";
      } else if (currentClass == "litTile highlight") {
        TILE.className = "unlitTile highlight";
      }
    }
  }
}

function setTile(id) {
  var TILE = document.getElementById(id);
  var currentClass = TILE.className;

  if (currentClass == "unlitTile") {
    TILE.className = "litTile";
  } else {
    TILE.className = "unlitTile";
  }
  
}

function highlightTile(id){
  var TILE = document.getElementById(id);
  var currentClass = TILE.className;

  if (currentClass == "unlitTile") {
    TILE.className = "unlitTile highlight";
  } else if (currentClass == "litTile") {
    TILE.className = "litTile highlight";
  }
}

function wipePuzzle(){
  for (var id = 1; id < 9; id ++){
    var TILE = document.getElementById(id);
    TILE.className = "unlitTile";
  }
}

function randomStart(){
  wipePuzzle()
  const puzzleIndex = Math.floor(Math.random()*255) + 1;
  setPuzzle(puzzleIndex, "random")
}

function chooseStart() {
  wipePuzzle()
  const puzzleStr = document.getElementById("startState").value
  setPuzzle(puzzleStr, "chosen")
}

function setPuzzle(puzzleIndex, style){
  fetch("../puzzleSolutions.json")
    .then(response => response.json())
    .then(data => {
      var puzzle;
      var solution;
      if (style == "random") {
        puzzle = Object.keys(data)[puzzleIndex]
        solution = Object.values(data)[puzzleIndex]
      } else if (style == "chosen"){
        puzzle = Object.keys(data).find(key => key == puzzleIndex)
        solution = data[puzzleIndex]
      }
      console.log("%s solved by %s", puzzle, solution)
      
      const puzzleStartTiles = puzzle.split("")
      for (const startTileIndex in puzzleStartTiles) {
        if (puzzleStartTiles[startTileIndex] == "1"){
          const index = parseInt(startTileIndex) + 1;
          const tileIndex = index.toString();
          setTile(tileIndex);
        }
      }
      
      var SOLVE = document.getElementById("solve");
      if (SOLVE.checked) {
        for (const tileIndex in solution) {
          console.log(solution[tileIndex])
          const tile = solution[tileIndex]
          highlightTile(tile);
        }
      }

      var GUIDE = document.getElementById("guide");
      GUIDE.innerHTML = `To solve, click the following tiles: ${solution}`;
      })
    .catch(error => console.log(error));
}

