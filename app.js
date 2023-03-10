import questions from './questions.js'
import options from './options.js'
import QuizForm from './quiz-form/qf.js'

const quizSendData = document.querySelector('.quiz-send-data')
const quizWrapper = document.querySelector('.quiz-wrapper')
const selector = '.quiz-wrapper'

const quizForm = new QuizForm(questions, selector, options)

quizForm.el.addEventListener('submit', e => {
  e.preventDefault()
  quizWrapper.hidden = true
  quizSendData.hidden = false 

  console.log(quizForm.getData())
})

/* let currentQuestion = 0

setInterval(() => {
  currentQuestion = (currentQuestion + 1) % questions.length
  quizForm.goToQuestion(currentQuestion)
}, 1000)
 */
