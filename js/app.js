// import questions from './questions-ua.js'
// import options from './options-ua.js'
import QuizForm from './quiz-form/qf.js'

const quizSendData = document.querySelector('.quiz-send-data')
const quizSendDataForm = document.querySelector('.quiz-send-data__form')
const quizThanks = document.querySelector('.quiz__thanks')
const quizWrapper = document.querySelector('.quiz-wrapper')
const selector = '.quiz-wrapper'

const quizForm = new QuizForm(questions, selector, options)

quizForm.el.addEventListener('submit', e => {
  e.preventDefault()
  quizWrapper.hidden = true
  quizSendData.hidden = false

  quizSendDataForm.onsubmit = () => {
    const data = Object.assign(quizForm.getData(), Object.fromEntries(new FormData(quizSendDataForm)))
    console.log(data)

    const message = `тип: ${data.type}\n площа: ${data.area}\n проєкт: ${data.project}\n старт: ${data.start}\n ім'я: ${data.name}\n номер: ${data.phone}`

    fetch(url, {
      method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({
        "chat_id": chatId,
        "text": message
      })
    })

    quizSendData.hidden = true
    quizThanks.hidden = false
  }
})






