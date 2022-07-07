const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader =document.getElementById('loader')

let apiQuotes = []

//Show Loading

function loading(){
    loader.hidden = false
    quoteContainer.hidden = true
}

// Hide Loading

function complete(){
    quoteContainer.hidden = false
    loader.hidden = true
}

// Show new quote

function newQuotes(){
    loading()
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]

    if(!quote.author) {
        authorText.textContent = 'Unknown'
    }
    else{
        authorText.textContent = quote.author
    }
    if(quote.text.length>120){
        quoteText.classList.add('long-quote')
    }
    else quoteText.classList.remove('long-quote')
//Set Quote, Hide Loader
quote.textContent = quote.text
complete()

    quoteText.textContent = quote.text
}

// Tweet Quote

function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent}- ${authorText.textContent}`
    window.open(twitterUrl, '_blank')
}

newQuoteBtn.addEventListener('click', newQuotes)
twitterBtn.addEventListener('click', tweetQuote)

// Get Quotes From API
async function getQuotes(){
    loading()
    const apiUrl = 'https://type.fit/api/quotes'

    try{
        const response = await fetch(apiUrl)
        apiQuotes = await response.json()
        newQuotes()
    } catch(error){
        //Catch Error Here
    }
}

getQuotes()
