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

GameManager.prototype.move = function(direction){
    //0:up, 1:right, 2:down 3:left
    
}


GameManager.prototype.actuate = function(){
    this.actuator.actuate(this.grid)
}