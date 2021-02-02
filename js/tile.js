/**
 * Tile represents a piece of image on the sliding puzzle game board
 * a tile has a position(x, y) property and a dir property, which is the
 * directory containing the source images.
 * The real path to the image is constructed by "{dir}/{poxition.x}/{position.y}.png"
 * @param {*} position 
 * @param {*} src 
 */
function Tile(position, dir){
   this.x = position.x;
   this.y = position.y;
   this.imgSrc = dir + '/' + this.x.toString() + this.y.toString() + ".png";

   //tracks the previous position of a tile to make 
   //transision animation
   this.previousPosition = null;
}

Tile.prototype.savePosition = function(){
    this.previousPosition = {x: this.x, y: this.y};
}

Tile.prototype.updatePosition = function(position){
    this.x = position.x;
    this.y = position.y;
}