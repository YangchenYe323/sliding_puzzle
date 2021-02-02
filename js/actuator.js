/**
 * Actuator handles the transformation from javascript data structures to DOM renderrings, whenever user input
 * leads to game state change(which is change in internal javascript datastructures), the game manager uses an
 * actuator to update the DOM tree and make the change show in the GUI
 */
function Actuator(){
    this.tileContainer = document.querySelector(".tile-container");
}

/**
 * render the DOM tree with the grid
 * @param {} grid 
 */
Actuator.prototype.actuate = function(grid){
    var self = this;
    grid.tileBoard.forEach(column =>{
        column.forEach(tile=>{
            self.addTile(tile);
        });
    });
}

/**
 * Add a tile to the DOM Tree
 * A tile would be rendered to a
 * <div wrapper>
 *  <img/>
 * </div>
 * element where the wrapper is used to anchor its position on the board and the img's src
 * is determined by the tile's src
 */
Actuator.prototype.addTile(tile){
    var self = this;

    var wrapper = document.createElement('div');
    var inner = document.createElement('img');
    //this is the first position we will render the tile to be in
    //if a tile is moved from another position, then we will first render
    //it to the previous position and then update its position in an animation
    var firstPos = tile.previousPosition? tile.previousPosition: {x: tile.x, y: tile.y};
    var positionClasses = this.positionClass(firstPos);
    classes = ['tile', positionClasses];
    this.applyClass(wrapper, classes);
    inner.setAttribute('src', tile.imgSrc);

    //in the case where we need to render the tile at its previous position first and 
    //then move it to its current position, we will set up a Task that updates its position
    if(tile.previousPosition){
        window.requestAnimationFrame(function(){
            classes[2] = self.positionClass({x: tile.x, y: tile.y});
            self.applyClass(wrapper, classes);
        });
    }

    wrapper.appendChild(inner);
    tileContainer.appendChild(wrapper);
}

/**
 * Return an array of classes for tiles at the given position
 */
Actuator.prototype.positionClass = function(pos){
    position = this.normalizePosition(position);
    return "tile-position-" + position.x + "-" + position.y;
}

/**
 * Modify the DOM element's class attribute with the given list of classes
 */
Actuator.prototype.applyClass = function(element, classes){
    element.setAttribute("class", classes.join(" "));
}