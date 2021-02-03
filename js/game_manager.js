/**
 * GameManager bootstraps the game.
 * It maintains the game state in a grid object and other metadatas of the game.
 * It provides the InputManager with the callback functions to handle keyboard event,
 * which modifies the grid object and metadatas;
 * and it then delegates the game state to the actuator to modify the DOM
 */
function GameManager(size, InputManager, Actuator, dir){
    //reference to the moduled managers
    this.size = size;
    this.dir = dir;
    this.inputManager = new InputManager();
    this.actuator = new Actuator();

    //bind callback functions to input manager
    this.inputManager.on('move', this.move.bind(this));

    //initialize game state
    this.setUp();
}

GameManager.prototype.setUp = function(){
    //
    var previousState = null;

    if(previousState){

    }else{
        //initialize new gameboard
        this.grid = new Grid(this.size, previousState, this.dir);
    }

    //render
    this.actuate();
}

/**
 * This function handles move operation. 
 * @param {} direction 0:up, 1:right, 2:down 3:left
 */
GameManager.prototype.move = function(direction){
    console.log(direction);
    console.log(this);

    this.grid.tileBoard.forEach(column => {
        column.forEach(tile => {
            tile.toMove = false;
        });
    });

    var vector = this.getVector(direction);
    for (var x = 0; x < this.size; ++x){
        for (var y = 0; y < this.size; ++y){
            var tile = this.grid.tileBoard[x][y];
            var newX = x + vector.x;
            var newY = y + vector.y;
            if (newX >= 0 && newX < this.size && newY >= 0 && newY < this.size){
                var neighbor = this.grid.tileBoard[newX][newY];
                if (neighbor.imgSrc == null){
                    tile.toMove = true;
                    this.swapPosition(tile, neighbor);
                    this.actuate();
                    return;
                }
            }
        }
    }
}

GameManager.prototype.swapPosition = function(tile, neighbor){
    tile.savePosition();
    neighbor.savePosition();
    var tileNewPos = {x: neighbor.x, y:neighbor.y};
    neighbor.updatePosition({x: tile.x, y: tile.y});
    tile.updatePosition(tileNewPos);

    console.log(tile);
    console.log(neighbor);

    this.grid.tileBoard[tile.x][tile.y] = tile;
    this.grid.tileBoard[neighbor.x][neighbor.y] = neighbor;

}

GameManager.prototype.getVector = function(direction){
    var map = {
        0: {x: 0, y: -1},
        1: {x: 1, y: 0},
        2: {x: 0, y: 1},
        3: {x: -1, y:0}
    };

    return map[direction];

}


GameManager.prototype.actuate = function(){
    this.actuator.actuate(this.grid)
}