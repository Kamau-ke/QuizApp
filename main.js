const startBtn=document.getElementById('start-btn')
const nextBtn=document.getElementById('next-btn')
const questionContainer=document.getElementById('question-container')
const questionElement=document.getElementById('question')
const answerBtn=document.getElementById('answer-btn'); 

let shuffledQuestions, currentQuestionIndex

startBtn.addEventListener('click', startGame);
nextBtn.addEventListener('click', ()=>{
    currentQuestionIndex++
    setNextQuestion()
})
function startGame(){
    startBtn.classList.add('hide')
    shuffledQuestions=questions.sort(()=>Math.random() - .5)
    currentQuestionIndex=0;

    questionContainer.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion(){
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question){
    questionElement.innerText=question.question

    question.answers.forEach((answer)=>{
        const button=document.createElement('button')
        button.innerText=answer.text
        button.classList.add('btn')

        if(answer.correct){
            button.dataset.correct=answer.correct
        }
        button.addEventListener('click', selectAnswer)

        
        answerBtn.appendChild(button)
    })
     
}

function resetState(){
    clearStatus(document.body)
    nextBtn.classList.add('hide')
    while(answerBtn.firstChild){
        answerBtn.removeChild(answerBtn.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn=e.target
    const correct=selectedBtn.dataset.correct
    setStatus(document.body, correct)
    Array.from(answerBtn.children).forEach(button=>{
        setStatus(button, button.dataset.correct)
    })
   if(shuffledQuestions.length > currentQuestionIndex +1){
    nextBtn.classList.remove('hide')
   }
   else{
    startBtn.innerText='Restart'
    startBtn.classList.remove('hide')
   }
}

function setStatus(element, correct){
    clearStatus(element)
    if(correct){
        element.classList.add('correct')
    }else{
        element.classList.add('wrong')
    }
}

function clearStatus(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions=[
    {
        question: 'what is 2 +2?',
        answers:[
            {text:'4', correct:true},
            {text:'22', correct:false}
        ]

    },

    {
        question: 'what is 4 + 2?',
        answers:[
            {text:'6', correct:true},
            {text:'42', correct:false}
        ]

    }
]