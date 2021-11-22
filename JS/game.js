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
  choice1 : 'Uma plataforma que só desenvolve relatórios sobre bugs',
  choice2 : 'Uma plataforma que desenvolve códigos, usando Inteligências Artficiais',
  choice3 : 'Uma ferramenta que analisa códigos em desenvolvimento, mas não detecta vulnerabilidades',
  choice4 : 'Uma ferramenta criada para garantir a qualidade do código fonte em desenvolvimento',
  answer:4,
  },
  {
  question : 'Uma vez que sua instância esteja em  total funcionamento, como acessar ao SonarQube?',
  choice1 : 'http://localhost:1234 na URL do navegador',
  choice2 : 'http://localhost:9000 na URL do navegador',
  choice3 : 'http://localhost:6000 na URL do navegador',
  choice4 : 'http://localhost:3000 na URL do navegador',
  answer:2,
  },
  {
  question : 'Sobre a afirmação: "A palavra do inglês, "ISSUES", é utilizada para generalizar problemas, descobertos pelo SonarQube, que são: bugs, vulnerabilidades e software data loss.". Aponte:',
  choice1 : 'Verdade, pois ambos podem levar a um erro ou comportamento inesperado no tempo de execução',
  choice2 : 'Falso, pois a palavra não busca designar fatores que levam a erros ou comportamentos inesperados no tempo de execução',
  choice3 : 'Verdadeiro, já que esses problemas complicam a manutenção dos códigos, deixando difícil de manter INFO, bug, critical',
  choice4 : 'Falso, pois o termo "software data loss" não se enquadra. O correto é "Code Smell", que é uma parte no código que indica um problema mais profundo',
  answer:4,
  },
  {
  question : 'Qual requisito especial para que o SonarQube funcione?',
  choice1 : 'Que um dos sistemas operacionais, tanto o Windows, Linux como Apple, nas versões mais atuais, esteja instalado na máquina',
  choice2 : 'Ser um administrador global e, assim, poder autenticar e acessar como administrador todas suas autorizações',
  choice3 : 'Um JDK superior ou semelhante ao JDK 11',
  choice4 : 'Consultar a documentação e fornecer feedback da interface SonarQube',
  answer:3,
  },
  {
  question : 'Sobre a afirmação: "No SonarQube, os resultados e avaliações, referente a qualidade do código, ficam armazenadas em um banco de dados.". Responda:',
  choice1 : 'Verdade',
  choice2 : 'Falso',
  choice3 : 'Verdade, mas apenas com o MySQL instalado',
  choice4 : 'Nem toda a afirmação é falsa',
  answer:1,  },
]

const SCORE_POINTS = 20
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
