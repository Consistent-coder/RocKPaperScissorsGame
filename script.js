let obj = {
    1: "Rock",
    2: "Paper",
    3: "Scissor"
};

let HumImg = document.querySelector(".humanImg");
let CompImg = document.querySelector(".computerImg");
let choices = document.querySelector(".choices");
let inp = document.getElementsByTagName("input")[0];
let submit = document.querySelector(".submit");
let messageDisplay = document.querySelector(".messageDisplay");
let rounds = 0, random;
let currentRound = 0;
let clickable = false;
let takeChoice = document.querySelector(".takeChoice");
let rock = new Audio("./music/rock.mp3");
let paper = new Audio("./music/paper.mp3");
let scissor = new Audio("./music/scissor.mp3");
let bg = new Audio("./music/bg.mp4");
let wrongAudio = new Audio("./music/wrong.mp3");
let humanScore = document.querySelector(".humanScore");
let compScore = document.querySelector(".compScore");
let totalChance = document.querySelector(".totalChance");
let humPoints = 0;
let compPoints = 0;
let totalTurns = 0;
let choiceTaken = document.querySelector(".choiceTaken");
let humanDiv = document.querySelector(".human");
let computerDiv = document.querySelector(".computer");
let reset = document.querySelector(".reset");
let TimeOut;
const Winner = (hum, bot) => {
    if (hum > bot) {
        messageDisplay.textContent = "Human is the Winner!!";
        choiceTaken.textContent = "Congratulations For the Win!!, Restart?";
        TimeOut = setTimeout(() => {
            humanDiv.style.backgroundColor = "green";
        }, 1000);
    }
    else if (hum < bot) {
        messageDisplay.textContent = "Robot is the Winner!!";
        choiceTaken.textContent = "Sorry For the Loss!!, Restart?";
        TimeOut = setTimeout(() => {
            computerDiv.style.backgroundColor = "green";
        }, 1000);
    }
    else{
        messageDisplay.textContent = "There is no Winner!!";
        choiceTaken.textContent = "Well played, despite the draw!!, Restart?";
        TimeOut = setTimeout(() => {
            computerDiv.style.backgroundColor = "yellow";
            humanDiv.style.backgroundColor = "yellow";
        }, 1000);
    }
    reset.classList.remove("hidden");
}

submit.addEventListener("click", (e) => {
    e.preventDefault();
    if (!isNaN(parseInt(inp.value))) {
        inp.value=Math.ceil(inp.value);
        if(inp.value>0 && inp.value<=100){
        clickable = true;
        totalChance.textContent = inp.value;
        takeChoice.classList.toggle("hidden");
        rounds = parseInt(inp.value);
        document.querySelector(".choiceTaken").classList.toggle("hidden");
        currentRound++;
        choiceTaken.textContent = "Total No of Matches Selected: " + totalChance.textContent + ", Start the Match.";
        }
        else if(inp.value<=100 && inp.value>0){
            wrongAudio.play();
            inp.style.fontSize = "50%";
            inp.value = "No tooLarge!!";
            setTimeout(() => {
                inp.style.fontSize = "90%";
                inp.value = "";
    
            }, 500);
        }
        else{
            wrongAudio.play();
            inp.style.fontSize = "50%";
            inp.value = "Not Possible!!";
            setTimeout(() => {
                inp.style.fontSize = "90%";
                inp.value = "";
    
            }, 500);
        }
    }
    else {
        wrongAudio.play();
        inp.style.fontSize = "50%";
        inp.value = "Not a number!!";
        setTimeout(() => {
            inp.style.fontSize = "90%";
            inp.value = "";

        }, 500);
    }
})
const nextMatch = (target) => {
    setTimeout(() => {
        /*document.querySelector(".choiceTaken").classList.toggle("hidden");
        takeChoice.classList.toggle("hidden")*/
        messageDisplay.textContent = "No result yet!!";
        clickable = true;
        choices.classList.remove("hidden");
        choiceTaken.textContent = `Round: ${currentRound}`;
        // totalChance.textContent=``;
        target.style.backgroundColor = "purple";
        HumImg.classList.toggle("hide");
        CompImg.classList.toggle("hide");
        reset.classList.remove("hidden");
    }, 2500)
}
async function checkWinner(hum, bot) {

    if (currentRound === rounds) {

        if (hum.textContent == "Scissor" && bot == 1) {
            compPoints++;
            compScore.textContent = compPoints;
        }
        else if (hum.textContent == "Scissor" && bot == 2) {
            humPoints++;
            humanScore.textContent = humPoints;
        }
        else if (hum.textContent == "Rock" && bot == 2) {
            compPoints++;
            compScore.textContent = compPoints;
        }
        else if (hum.textContent == "Rock" && bot == 3) {
            humPoints++;
            humanScore.textContent = humPoints;
        }
        else if (hum.textContent == "Paper" && bot == 3) {
            compPoints++;
            compScore.textContent = compPoints;
        }
        else if (hum.textContent == "Paper" && bot == 1) {
            humPoints++;
            humanScore.textContent = humPoints;
        }

        Winner(humPoints, compPoints);
        return 0;
    }
    return new Promise((resolve, reject) => {
        currentRound++;
        if (hum.textContent === obj[bot]) {
            setTimeout(() => {
                messageDisplay.textContent = "Its a Draw!!";
                resolve(1);
            }, 3000)

        }
        else if (hum.textContent == "Scissor" && bot == 1) {
            setTimeout(() => {
                messageDisplay.textContent = "Robot Wins the Match";
                compPoints++;
                compScore.textContent = compPoints;
                resolve(1);
            }, 3000)
        }
        else if (hum.textContent == "Scissor" && bot == 2) {
            setTimeout(() => {
                messageDisplay.textContent = "Human Wins the Match";
                humPoints++;
                humanScore.textContent = humPoints;
                resolve(1);
            }, 3000)
        }
        else if (hum.textContent == "Rock" && bot == 2) {
            setTimeout(() => {
                messageDisplay.textContent = "Robot Wins the Match";
                compPoints++;
                compScore.textContent = compPoints;
                resolve(1);
            }, 3000)
        }
        else if (hum.textContent == "Rock" && bot == 3) {
            setTimeout(() => {
                messageDisplay.textContent = "Human Wins the Match";
                humPoints++;
                humanScore.textContent = humPoints;
                resolve(1);
            }, 3000)
        }
        else if (hum.textContent == "Paper" && bot == 3) {
            setTimeout(() => {
                messageDisplay.textContent = "Robot Wins the Match";
                compPoints++;
                compScore.textContent = compPoints;
                resolve(1);
            }, 3000)
        }
        else if (hum.textContent == "Paper" && bot == 1) {
            setTimeout(() => {
                messageDisplay.textContent = "Human Wins the Match";
                humPoints++;
                humanScore.textContent = humPoints;
                resolve(1);
            }, 3000)
        }

    })
}

choices.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn")){
        e.target.style.backgroundColor = "purple";
    }
    if (clickable === true) {
        if (e.target.classList.contains("btn")) {
            reset.classList.add("hidden");
            bg.play();
            clickable = false;
            choiceTaken.textContent = `Round: ${currentRound}`;
            messageDisplay.textContent = "No result yet!!";
            HumImg.src = `./images/${e.target.textContent}.png`;
            e.target.style.backgroundColor = "green";
            random = Math.ceil(Math.random() * 3);
            console.log(random);
            CompImg.src = `./images/${obj[random]}.png`;
            HumImg.classList.toggle("hide");
            CompImg.classList.toggle("hide");
            if (e.target.textContent == "Rock") {
                rock.play();
            }
            if (e.target.textContent == "Paper") {
                paper.play();
            }
            if (e.target.textContent == "Scissor") {
                scissor.play();
            }
            choices.classList.add("hidden");

            (async () => {
                let t = await checkWinner(e.target, random);
                if (t != 0) {
                    nextMatch(e.target);
                }
            })()
        }

    }
    else {
        wrongAudio.play();
        inp.style.fontSize = "50%";
        inp.style.color = "red";
        inp.value = "CHOOSE FIRST!!";
        setTimeout(() => {
            inp.style.fontSize = "90%";
            inp.value = "";
            inp.style.color = "green";
        }, 500);
    }
})



reset.addEventListener("click", () => {
    reset.style.backgroundColor = "red";
    Array.from(document.querySelectorAll(".btn")).forEach((b) => {
        b.style.backgroundColor = "purple";
    })
    clearTimeout(TimeOut);
    inp.value = "";
    computerDiv.style.backgroundColor = "antiquewhite";  // Fix: Use style.backgroundColor instead of backgroundColor directly
    humanDiv.style.backgroundColor = "antiquewhite";     // Fix: Use style.backgroundColor instead of backgroundColor directly
    HumImg.classList.add("hide");
    CompImg.classList.add("hide");
    clickable = false;
    compPoints = 0;
    humPoints = 0;
    compScore.textContent = compPoints;
    humanScore.textContent = humPoints;

    document.querySelector(".choiceTaken").classList.add("hidden");
    takeChoice.classList.remove("hidden");
    currentRound = 0;
    rounds = 0;
    choices.classList.remove("hidden");
    messageDisplay.textContent="No result yet!!";
});
