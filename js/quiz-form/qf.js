export default class QuizForm {
  constructor(questions, selector, options) {
    this.questions = questions
    this.selector = selector
    this.options = options
    this.name = `qf${qfCount++}`
    this.render()

    this.el.addEventListener('change', e => {
      const i = +e.target.closest('fieldset').firstChild.value + 1

      this.goToQuestion(i, 200)
    })
  }

  render() {
    const { image, imageText, progressWord, progressText, btnLabels } = this.options
    const count = this.questions.length
    const questionBlock = new QuestionBlock(this.questions, this.name)
    const pictureBlock = new PictureBlock(count, image, imageText)
    const progressBlock = new ProgressBlock(count, progressWord, progressText)
    const buttonBlock = new ButtonBlock(btnLabels, 
      () => this.goToQuestion(this.currentIndex - 1),
      () => this.goToQuestion(this.currentIndex + 1),
    )
    const form = document.createElement('form')

    form.className = 'quiz-form'

    form.append(progressBlock.el, questionBlock.el, buttonBlock.el)

    document.querySelector(this.selector)?.append(form)

    this.el = form
    this.questionBlock = questionBlock
    this.pictureBlock = pictureBlock
    this.progressBlock = progressBlock
    this.buttonBlock = buttonBlock
  }

  async goToQuestion(i, delay) {
    const radios = this.el.querySelectorAll(`[name=${this.name}]`)
    const nextRadio = radios[i]

    if (delay) await sleep(delay)

    if (nextRadio) {
      nextRadio.checked = true
      this.pictureBlock.updateCount(this.questions.length - i)
      this.progressBlock.updateProgress(i)
      
      this.buttonBlock.nextButton.disabled = !this.questionBlock.hasChecked(i)
      this.buttonBlock.backButton.disabled = !i
    } else {
      this.el.requestSubmit()
    }
  }

  get currentIndex() {
    const checkedRadio = this.el.querySelector(`[name=${this.name}]:checked`)

    return +checkedRadio?.value
  }

  getData() {
    const data = Object.fromEntries(new FormData(this.el))

    delete data[this.name]

    return data
  }
}

let qfCount = 0

function sleep(delay) {
  return new Promise(resolve => setTimeout(resolve, delay))
}

import QuestionBlock from './question-block.js'
import PictureBlock from './picture-block.js'
import ProgressBlock from './progress-block.js'
import ButtonBlock from './button-block.js'
