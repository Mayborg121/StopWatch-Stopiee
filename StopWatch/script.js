const time = document.getElementById("time");
const milisec = document.getElementById("milisec");
const quotesurl = 'https://raw.githubusercontent.com/Mayborg121/QuotesFileHostin/refs/heads/main/quotesjsn.json';
let quote = document.getElementById("quote");
let author = document.getElementById("author");
let quotes;
let a;


let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;

function start(){
    if(!isRunning){
        startTime = Date.now() - elapsedTime;
        timer = setInterval(update, 10);
        isRunning = true;
    }

    // Fetch the JSON data
        fetch(quotesurl)
            .then(response => response.json())
            .then(data => {
        // Handle the JSON data here
            quotes = data[Math.floor(Math.random()*(data.length))];
            setquote(quotes);

            })

            .catch(error => {
                console.error('Error fetching JSON:', error);
            });

}

function stop(){
    if(isRunning){
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
        isRunning = false;
    }
    displayquotes(a);

}

function reset(){
    clearInterval(timer);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;

    time.textContent = "00:00:00";
    milisec.textContent = "00";
}

function update(){
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor(elapsedTime / (1000 *60) % 60);
    let seconds = Math.floor(elapsedTime / 1000 % 60);
    let miliseconds = Math.floor(elapsedTime % 1000 / 10);

    hours = String(hours).padStart(2,"0");
    minutes = String(minutes).padStart(2,"0");
    seconds = String(seconds).padStart(2,"0");
    miliseconds = String(miliseconds).padStart(2,"0");

    time.textContent = `${hours}:${minutes}:${seconds}`;
    milisec.textContent = `${miliseconds}`;
    
}

//Keyboard Bindings
window.onkeydown = function(event) {
    if (event.keyCode == 32) {
        if(isRunning){
            stop();
        }
        else{
            start();
        }
    };
    if (event.keyCode == 8){
        reset();
    }
    if (event.keyCode == 16){
        reset();
    }
};









function setquote(quote){
    a = quote;
  }

function displayquotes(a){
        console.log(a.Quote);
        quote.textContent = String(`" `+a.Quote+` "`);
        author.textContent = String(`✨- `+a.Author);
  }