function inTouch(){
    alert("We will be in touch as soon as possible!"); 
}


const typeWriter = function(txtElement, words, wait = 3){
    this.txtElement = txtElement; 
    this.words = words; 
    this.txt = '';
    this.wordIndex = 0; 
    this.wait = parseInt(wait, 1); 
    this.type(); 
    this.isDeleting = false; 
}

//Type Method
typeWriter.prototype.type = function(){
    //Current Index of Word
    const current = this.wordIndex % this.words.length; 
    //Get full text of current word
    const fullTxt = this.words[current]; 

    //Check if deleting
    if(this.isDeleting){
        //Remove character
        this.txt = fullTxt.substring(0, this.txt.length - 1); 
    }else{
        //Add character
        this.txt = fullTxt.substring(0, this.txt.length + 1); 
    }

    //Insert Text into Element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`; 

    //Initial Typespeed
    let typeSpeed = 2; 

    if(this.isDeleting){
        typeSpeed = typeSpeed/2; 
    }

    //If word is complete
    if(!this.isDeleting && this.txt === fullTxt){
        typeSpeed = this.wait; 
        this.isDeleting = true; 
    }else if(this.isDeleting && this.txt === ''){
        this.isDeleting = false; 

        this.wordIndex++; 

        typeSpeed = 50; 
    }

    setTimeout(() => this.type(), 125)
}

//Init on DOM Load
document.addEventListener('DOMContentLoaded', init); 

//Init App
function init(){
    const txtElement = document.querySelector('.txt-type'); 
    const words = JSON.parse(txtElement.getAttribute('data-words')); 
    const wait = txtElement.getAttribute('.data-wait'); 
    //Initialize Typewriter
    new typeWriter(txtElement, words, wait); 
}


/*

    This is going to be fun
    The line animation... Nice to finally be taking an ernest shot at this.
    I'll need to make a point of saving this code for future work, when it works.

*/

var path = document.querySelector('.squiggle-animated_path'); 
var length = path.getTotalLength();
//Clear any previous transition
path.style.transition = path.style.WebkitTransition = 'none'; 
//Set up the starting positions
path.style.strokeDasharray = length + ' ' + length; 
path.style.strokeDashoffset = length; 
//Trigger a layout so styles are calculated and the browser
//picks up the starting position before animating
path.getBoundingClientRect(); 
//Define our transition
path.style.transition = path.style.WebkitTransition = 'stroke-dashoffset 2s ease-out'; 
//It should work
path.style.strokeDashoffset = '0'; 
