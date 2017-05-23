import Initialization from './Initialization';

class DeferredStyles {
  constructor() {
    this.id = undefined;
    this.width = undefined;
    this.elem = undefined;
    this.document = document;
    this.loadDeferredStyles();
  }

  loadDeferredStyles() {
    const addStylesNode = this.document.getElementById('deferred-styles');
    const replacement = this.document.createElement('div');
    if (addStylesNode != undefined) { //for non builded version to work
      replacement.innerHTML = addStylesNode.textContent;
      this.document.head.appendChild(replacement);
      this.width = 7;
      this.elem = this.document.getElementById("progress-width");
      this.id = setInterval(() => { this.frame()}, 20);
      addStylesNode.parentElement.removeChild(addStylesNode);
    }
  }

  frame() {
    if (this.width >= 95) {
      clearInterval(this.id);
      new Initialization();
    } else {
      this.width++;
      this.elem.style.width = this.width + '%';
    }
  }
}

export default DeferredStyles;

new DeferredStyles();