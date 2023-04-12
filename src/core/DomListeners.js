export class DomListeners {
  constructor($root, options) {
    this.$root = $root;
    this.listeners = options.listeners || [];
  }
  initDomListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      if (!this[method]) {
        throw new Error(`Method ${method} is not implemented in Game`)
      }
      this[method] = this[method].bind(this)
      window.addEventListener(listener, this[method])
    })
  }
  removeDomListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      window.removeEventListener(listener, this[method])
    })
  }
}

function getMethodName(listener) {
  return 'on'+ listener.charAt(0).toUpperCase() + listener.slice(1)
}