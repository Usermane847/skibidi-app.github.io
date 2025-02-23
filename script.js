//Create a data storage
//It is a LIST that holds multiple DICTIONARIES
//Each dictionary represents a question set
//A dictionary holds data in key- value pair

const database = [
    {
        question : "How did plunger camera man die?",
        options : ["killed by G-man", "died from an astro toilet", "killed by scientist toilet", "got flushed into the toilet"],
        answer : "killed by scientist toilet"
    },

    {
        question : "which term best describes the skibidi toilet phenomenom?",
        options : ["Viral Meme", "Historical Documentary", "Art Instalation", "Educational Series"],
        answer : "Viral Meme"
    },

    {
        question : "What sound or phrase is most commonly associated with skibidi toilet?",
        options : ["Let's go", "A repetitive 'Skibidi' chant or beat","toilet flushing sound", "screaming sound"],
        answer : "A repetitive 'Skibidi' chant or beat"
    },

    {
        question : "Is G-man the leader of skibidi toilet?",
        options : ["yes", "no", "I dont know"],
        answer : "yes"
    },

    {
        question : "is skibidi toilet  brain rot?",
        options : ["yes", "no", "I dont know"],
        answer : "yes"
    },

  
];

const startButton = document.getElementById('start-btn');
const questionLabel = document.getElementById('question');
const timerText = document.getElementById('timerLabel');
const timerComponent = document.getElementById('timer');
const progressBar = document.getElementById('progress-bar-container');
const progressBarFill = document.getElementById('progress-bar-fill')
const optionsContainer = document.getElementById('options-container')
const scorelabel = document.getElementById('score');
const feedbackLabel = document.getElementById('feedback')

progressBarFill.style.width='0%';

let current_index = 0;
let timer;
let score = 0


startButton.addEventListener('click', startQuiz);

function startQuiz()
{
    startButton.style.display = 'none';
    loadQuestion();
}

function loadQuestion()
{
    if(current_index < database.length)
    {
        // Update progress bar
        progressBarFill.style.width = `${((current_index + 1)/database.length) * 100}%`;

        const currentQuizSet = database[current_index];
        questionComponent = currentQuizSet.question;
        questionLabel.textContent = questionComponent;

        // Set initial countdown value
        timerText.textContent = 20;

        //Remove all previous button clones
        optionsContainer.innerHTML='';

        //clone option buttons for each question
        currentQuizSet.options.forEach((option) => {
            const button = document.createElement('button');
            button.textContent=option;
            button.classList.add('option-btn')
            optionsContainer.appendChild(button);

            button.addEventListener('click',() => {
                disableOptionButtons(); // disable all buttons
                checkAnswer(option);
            });
        });

        //re-enable option Buttons when it loads the next question
        enableOptionButtons();
        

        // Start timer countdown
        timer = setInterval(() => {
            timerText.textContent = parseInt(timerText.textContent) - 1;
            if(parseInt(timerText.textContent) === 0)
            {
                //reset timer
                clearInterval(timer);

                //disable all option buttons when the time has ran out
                disableOptionButtons();

                // update current_ index variable
                current_index++;

                loadQuestion();
            }
        }, 1000);
    } else
    {
        endQuiz();
    }
}

function endQuiz()
{
    questionLabel.textContent = "Quiz has ended!";
    timerComponent.style.display = 'none';
    optionsContainer.style.display = 'none';
}


function checkAnswer(option){
    const answer = database[current_index].answer;
     let feedback = '';

    if(option == answer)
    {
        score = score + 1;
        feedback = 'Bravo! answer correct!'

    }else
    {
        feedback = 'Incorrect! WOMP WOMP!';
    }

    feedbackLabel.textContent = feedback;
    
    scorelabel.textContent = `you scored ${score} points`;
    clearInterval(timer);

    //hold for 2 seconds before laoding the next question
    setTimeout(() =>{
        feedbackLabel.textContent = '';//clear feedback
        current_index = current_index + 1;
        loadQuestion();

    },2000);
}

function disableOptionButtons() {
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(button => {
        button.disabled = true; // Disable the button
    });
}

function enableOptionButtons() {
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(button => {
        button.disabled = false; // Enable the button
    });
}