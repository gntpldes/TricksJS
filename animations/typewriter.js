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
