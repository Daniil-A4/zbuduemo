export default class ButtonBlock {
  constructor(btnLabels, hanleBack, hanleNext) {
    this.btnLabels = btnLabels
    this.hanleBack = hanleBack
    this.hanleNext = hanleNext
    this.render()
  }

  render() {
    const block = document.createElement('div')
    const { btnLabels } = this
    
    const buttons = btnLabels.map((label) => {
      const button = document.createElement('button')

      button.type = 'button'
      button.textContent = label
      button.disabled = true

      return button
    })

    block.className = 'button-block'
    buttons[0].addEventListener('click', this.hanleNext)
    buttons[1].addEventListener('click', this.hanleBack)

    block.append(...buttons)

    this.el = block
    this.nextButton = buttons[0]
    this.backButton = buttons[1]
  }
}
