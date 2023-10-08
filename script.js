let randomNumber = getRandomNumber()
let remainingGuesses = 2
let numberOfGuesses = 0
let guess
let MAX_BOUNDS
let MIN_BOUNDS
let gameStatusLoser = "COMPUTER WON!"
let gameStatusWinner = "PLAYER WON!"



const imagesUrls = [
    "images/babyYes.jpg",
    "images/no.jpg"
] 

let rand = document.getElementById("randNum")
rand.innerHTML = randomNumber
document.getElementById("randNum").style.display = "none"

console.log(randomNumber)
let msg = document.getElementById("message")
let guesses = document.getElementById("counter")
guesses.innerHTML = remainingGuesses
let gameOver = document.getElementById("borders")

let howManyGuesses = document.getElementById("Guesses")
howManyGuesses.innerHTML = remainingGuesses


let res = document.getElementById("btn1")
let resi = document.getElementById("btn2")
let res2 = document.getElementById("btn3")

function guessOutOfBoundsCheck(MIN_BOUNDS,MAX_BOUNDS){
    let check = false
    let guess = document.getElementById("guessbox").value;
    if(guess < MIN_BOUNDS || guess > MAX_BOUNDS){
        showMessage("GUESS IS OUT OF BOUNDS!")
        check = false
    }else{
        check = true
    }
    return check
}

function checkForEmptyGuess(){
    let check = false
    guess = document.getElementById("guessbox").value.trim();
    if(guess ===""){
        showMessage("GUESS CANNOT BE EMPTY!","empty")
        check = false
    }else{
       check = true
    }
    return check
}

resi.addEventListener("click",function(){
    resetButton()
},false)

res2.addEventListener("click",function(){
    resetButton2()
},false)

res.addEventListener("click",function(){
    if(guessOutOfBoundsCheck(0,3) && checkForEmptyGuess()){
        checkGuess()
    }
},false)

function checkGuess(){
    let check = false
   if(guess == randomNumber){
        check = true
        playerWon()
        checkWhichImageToDisplay(imagesUrls[0])
        showMessage("You got it!", "success")
        resetButton()
    }else if(guess > randomNumber){
        showMessage("Guess is too high!", "TooHigh")
        decrementNumberOfGuesses()
        checkGuessesLeft()
    }else if(guess < randomNumber){
        showMessage("Guess is too Low", "TooLow")
        decrementNumberOfGuesses()
        checkGuessesLeft()
    }else{
        showMessage("Wrong guess Entered", "ErrorWrongnumberentered")
        remainingGuesses--
    }
    return check
}

function playerWon(){
    msg.innerHTML = "You got it" 
    gameOver.innerHTML = gameStatusWinner
    rand.innerHTML = randomNumber
    document.getElementById("randNum").style.display = "block"
    document.getElementById("borders").style.display = "block"
    randomNumber = getRandomNumber()
}

function decrementNumberOfGuesses(){
    remainingGuesses--
    guesses.innerHTML = remainingGuesses
    
}

function checkGuessesLeft(){
    if(remainingGuesses == 0 ){
        showMessage("GAME OVER!","gameOver")
        gameOver.innerHTML = gameStatusLoser
        document.getElementById("borders").style.display = "block"
        checkWhichImageToDisplay(imagesUrls[1])
        resetButton()
    }
}

function incrementGuesses(){
    numberOfGuesses++
    
}

function checkWhichImageToDisplay(arr){
    const images = document.getElementById("border")
        if(checkGuess){ 
            const loserImage = document.createElement("img")
            loserImage.src = arr //imagesUrls[1] //"images/no.jpg"
            loserImage.style.width = "300px"
            loserImage.style.height = "auto"
            images.appendChild(loserImage)

           setTimeout(function(){
                images.removeChild(loserImage)
            },3000)
        }
}

function displayRandomNumber(){
    rand.innerHTML = randomNumber
    document.getElementById("randNum").style.display = "block"
}

function resetButton2(){
    const clearText = document.getElementById("guessbox")
    clearText.value = "";
    document.getElementById("randNum").style.display = "none"
    document.getElementById("borders").style.display = "none"
}

function resetButton(){
    remainingGuesses = 2
    randomNumber = getRandomNumber()
    guesses.innerHTML = remainingGuesses
}

function getRandomNumber(){
     return Math.floor(Math.random()*3) + 1
}

function showMessage(messages,messageType){
    const messageClasses = {
        success: "success",
        TooHigh: "TooHigh",
        TooLow: "TooLow",
        ErrorWrongnumberentered: "ErrorWrongnumberentered",
        ErrorEmptyGuess: "ErrorEmptyGuess",
        ErrorOutOfBoundsGuess: "ErrorOutOfBoundsGuess",
        gameOver: "gameOver"
    }
    const msg = document.getElementById("message")
    msg.classList.remove(...Object.values(messageClasses))
    msg.textContent = messages

    const messageClass = messageClasses[messageType] || "uknown"
    msg.classList.add(messageClass)
    msg.style.display = "block"

    setTimeout(function(){
        hideMessage()
    },3000)
}

function hideMessage(){
    let msg = document.getElementById("message")
    msg.style.display = "none"
}

hideMessage()


/*Old version of showMessage function, want to keep it for clarity. */

/*function showMessage(messages,messageType){
    let msg = document.getElementById("message")
    let correctClass = "success"
    let tooHighClass = "TooHigh"
    let tooLowClass = "TooLow"
    let errorClass = "ErrorWrongnumberentered"
    let emptyError = "ErrorEmptyGuess"
    let outOfBoundsGuessError = "ErrorOutOfBoundsGuess"
    let outOfGuesses = "gameOver"

    msg.classList.remove(correctClass,tooHighClass,tooLowClass,errorClass,emptyError,outOfBoundsGuessError,outOfGuesses)
    msg.textContent = messages
    switch(messageType){
        case "success":
            msg.classList.add(correctClass)
            break;
        case "TooHigh":
            msg.classList.add(tooHighClass)
            break;
        case "TooLow":
            msg.classList.add(tooLowClass)
            break;
        case "ErrorWrongnumberentered":
            msg.classList.add(errorClass)
            break;
        case "ErrorEmptyGuess":
            msg.classList.add(emptyError)
            break;    
        case "ErrorOutOundsGuess":
            msg.classList.add(outOfBoundsGuessError)
            break;   
        case "gameOver":
            msg.classList.add(outOfGuesses) 
        default:
            console.log("Something went wrong........")                
    }
    msg.style.display = "block"
    setTimeout(function(){
        hideMessage()
    },3000)
}*/
