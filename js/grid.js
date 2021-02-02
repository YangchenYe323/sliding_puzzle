/**
 * Grid represents the whole tile {size} * {size} tile board,
 * it maintains a {size} by {size} 2d array of tiles
 * @param {*} size 
 * @param {*} previousState deserialized state from persistent storage
 * @param {*} dir source directory containing the images
 */
function Grid(size, previousState, dir){
    this.size = size;
    this.tileBoard = previousState? this.fromPreviousState(previousState) : this.defaultState(dir);   
}

Grid.prototype.defaultState = function(dir){
    var tileBoard = [];
    for (var x = 0; x < this.size; ++x){
        tileBoard[x] = [];
        for (var y = 0; y < this.size; ++y){
            var tile = new Tile({'x': x, 'y': y}, dir);
            tileBoard[x].push(tile);
        }
    }
    return tileBoard;
}

Grid.prototype.fromPreviousState = function(previousState){

}