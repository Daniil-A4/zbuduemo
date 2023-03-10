export default class QuestionBlock {
  constructor(questions, name) {
    this.questions = questions
    this.name = name
    this.render()
  }

  render() {
    const block = document.createElement('div')

    const questionSets = this.questions.map(
      (question, i) => new QuestionSet(question, this.name, i)
    )

    block.className = 'question-block'

    block.append(...questionSets.map(qs => qs.el))

    this.questionSets = questionSets
    this.el = block
  }

  hasChecked(i) {
    return this.questionSets[i].hasChecked()
  }
}


import QuestionSet from './question-set.js'
