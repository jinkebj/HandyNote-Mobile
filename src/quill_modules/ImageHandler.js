export class ImageHandler {

  constructor (quill, options = {}) {
    // save the quill reference and options
    this.quill = quill
    this.options = options

    // bind handlers to this instance
    this.handleClick = this.handleClick.bind(this)

    // disable native image resizing on firefox
    // document.execCommand('enableObjectResizing', false, 'false')

    // respond to clicks inside the editor
    this.quill.root.addEventListener('click', this.handleClick, false)
  }

  handleClick (evt) {
    if (evt.target && evt.target.tagName && evt.target.tagName.toUpperCase() === 'IMG') {
      if (this.img) {
        // we were just focused on another image
        this.hide()
      }

      // clicked on an image inside the editor
      this.show(evt.target)
    } else if (this.img) {
      // clicked on a non image
      this.hide()
    }
  }

  show (img) {
    this.options.eventBus.$emit('showImgDetail', img.src)
  }

  hide () {
    this.img = undefined
  }

}
