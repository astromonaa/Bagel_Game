class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector
  }
  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }
    this.$el.appendChild(node)
    return this
  }
  html(html) {
    if (html) {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.innerHTML
  }
  find(selector) {
    return $(this.$el.querySelector(selector))
  }
  data(attribute, value) {
    if (attribute) {
      this.$el.dataset[attribute] = value
      return this
    }
    return this.$el.dataset
  }
  removeData(attribute) {
    delete this.$el.dataset[attribute]
  }
  id(parse) {
    if (parse) {
      const [row, col] = this.id().split(':')
      return {
        row: +row,
        col: +col
      }
    }
    return this.data().id
  }
  addClass(className) {
    this.$el.classList.add(className)
    return this
  }
  removeClass(className) {
    this.$el.classList.remove(className)
  }
  nearElements({row, col}) {
    const left = $(this.$el.querySelector(`[data-id="${row}:${col-1}"]`))
    const right = $(this.$el.querySelector(`[data-id="${row}:${col+1}"]`))
    const top = $(this.$el.querySelector(`[data-id="${row - 1}:${col}"]`))
    const bottom = $(this.$el.querySelector(`[data-id="${row + 1}:${col}"]`))
    return {
      left,
      right,
      top,
      bottom
    }
  }
  removeChild(node) {
    if (node instanceof Dom) {
      node = node.$el
    }
    if (node.parentNode === this.$el) {
      this.$el.removeChild(node)
    }
  }
  setWidth(width) {
    this.$el.style.width = width
  } 
}

export const $ = selector => {
  return new Dom(selector)
}
$.create = (tagName, classes = '', html) => {
  const el = $(document.createElement(tagName))
  if (classes) {
    classes.split(' ').forEach(className => el.addClass(className))
  }
  if (html) {
    el.html(html)
  }
  return el
}

