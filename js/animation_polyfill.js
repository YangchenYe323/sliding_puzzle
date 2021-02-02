//we provide the window.requestAnimationFrame() function for 
//animation renderring
(function(){
    //last timestamp where the callback function is called
    //by the browser
    var lastTime = 0;
    //these are the web engines that have implemented their requestAnimationFrame()
    //function, so if the user is using a browser of such engines, we can just use 
    //the function they provided
    var vendors = ['webkit', 'moz'];
    var timeout = null;

    for(let x = 0; x < vendors.length; ++x){
        //fill the function with the vendor's implementation
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    //if the browser is not of the engine predefined, we
    //will implement our own requestAnimationFrame function
    if(!window.requestAnimationFrame){
        window.requestAnimationFrame = function(callback){
            let currTime = new Date().getTime();
            //time needed to set up next callback
            let timeToCall= Math.max(0, 16 - (currTime - lastTime));
            timeout = window.setTimeout(function(){
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return timeout;
        }
    }

    if(!window.cancelAnimationFrame){
        window.cancelAnimationFrame = function(){
            clearTimeout(timeout);
        }
    }

})()