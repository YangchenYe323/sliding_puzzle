function KeyboardInputManager(){
    //stores the mapping from event to callback
    this.events = {};

    this.listen();
}

//selector: the selector of the button element(className, id, etc)
//callback: the function to bind to the click of that button
KeyboardInputManager.prototype.bindClickCallback = function(selector, callback){
    let button = document.querySelector(selector);
    //we want to call the callback function from the KeyboardInputManager object
    //so that we can manage event mapping and other internal state
    button.addEventListener('click', callback.bind(this));
};

//register event -> callback mapping to the events object we maintained
//in the object
//Node: an event can be mapped to a series of callbacks
KeyboardInputManager.prototype.on = function(event, callback){
    if (!this.events[event]){
        this.events[event] = [];
    }
    this.events[event].push(callback);
};

//Retreive callback with event from the mapping and call the functions
//with data as arguments
KeyboardInputManager.prototype.emit = function(event, data){
    let callbacks = this.events[event];
    if(callbacks){
        callbacks.forEach(callback => {
            callback(data);
        });
    }
}

//Initialize events mapping
KeyboardInputManager.prototype.listen = function(event){
    var self = this;
    
    var map = {
        38: 0, //up
        39: 1, //right
        40: 2, //down
        37: 3, //left
        87: 0, //w
        68: 1, //d
        83: 2, //s
        65: 3, //a
    };

    document.addEventListener('keydown', function(event){
        //if the event is fired with alt, ctrl, comman or shift
        var modifiers = event.altKey || event.ctrlKey || event.metaKey ||
        event.shiftKey;
        //the mapped action of the event
        let mapped = map[event.which];

        if(!modifiers){
            if(mapped !== undefined){
                event.preventDefault();
                //do the move action with the specified direction
               self.emit('move', mapped);
            }
        }

        //R restarts the game

        //Button Press
    });

}