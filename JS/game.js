const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion ={}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestion = []

let questions = [
  {
  question : 'O que é o SonarQube?',
  choice1 : 'Uma plataforma de jogos',
  choice2 : 'Uma plataforma de código fechado, para inspeção contínua da qualidade do código',
  choice3 : 'Não sei',
  choice4 : 'Uma plataforma de código aberto, para inspeção contínua da qualidade do código',
  answer:4,
  },
  {
  question : 'Na instalação: Onde precisa está referênciado o caminho do JDK?',
  choice1 : 'C:/SonarQube/conf',
  choice2 : 'C:/SonarQube/conf/wrapper',
  choice3 : 'C:/Download/SonarQube',
  choice4 : 'C:/SonarQube/bin/windows-x86-64',
  answer:2,
  },
  {
  question : 'Como são divididos os tipos de ISSUES? ',
  choice1 : 'Bug, vulnerabilidade e code smell',
  choice2 : 'Diversão, bug, SSD',
  choice3 : 'INFO, bug, critical',
  choice4 : 'Nenhumas das outras opções',
  answer:1,
  },
  {
  question : 'Para funcionar o SonarQube precisa de um JDK superior ou igual ao JDK 11?',
  choice1 : 'Verdadeiro',
  choice2 : 'Falso',
  choice3 : '',
  choice4 : '',
  answer:1,
  },
  {
  question : 'Qual gravidade (severity) denuncia uma baixa probabilidade de impacto no comportamento do código?',
  choice1 : 'Infor',
  choice2 : 'Critical',
  choice3 : 'Bug',
  choice4 : 'Nenhumas das outras opções',
  answer:2,
  },
]

const SCORE_POINTS = 25
const MAX_QUESTIONS = 5

startGame = () => {
  questionCounter = 0
  score = 0
  availableQuestion = [...questions]
  getNewQuestion()
}

getNewQuestion = () => {
  if(availableQuestion.length === 0 || questionCounter > MAX_QUESTIONS){
    localStorage.setItem('mostRecentScore', score)

    return window.location.assign('./end.html')
  }

  questionCounter++
  progressText.innerText = `Questão ${questionCounter} de ${MAX_QUESTIONS}`
  progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS)*100}%`

  const questionsIndex = Math.floor(Math.random() * availableQuestion.length)
  currentQuestion = availableQuestion[questionsIndex]
  question.innerText = currentQuestion.question

  choices.forEach(choice =>{
    const number = choice.dataset['number']
    choice.innerText = currentQuestion['choice' + number]
  })

  availableQuestion.splice(questionsIndex, 1)
  acceptingAnswers = true
}

choices.forEach(choice =>{
  choice.addEventListener('click', e =>{
    if(!acceptingAnswers) return

    acceptingAnswers = false
    const selectedChoice = e.target
    const selectedAnswer = selectedChoice.dataset['number']

    let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
    'incorrect'

    if(classToApply === 'correct'){
      incrementScore(SCORE_POINTS)
    }

    selectedChoice.parentElement.classList.add(classToApply)

    setTimeout(() =>{
      selectedChoice.parentElement.classList.remove(classToApply)
      getNewQuestion()
    }, 1000)
  })
})

incrementScore = num =>{
  score +=num
  scoreText.innerText = score
}

startGame()