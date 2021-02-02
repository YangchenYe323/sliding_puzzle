Function.prototype.bind = Function.prototype.bind || function(context){
    var self = this;
    return function(){
        return this.apply(context, arguments);
    }
}