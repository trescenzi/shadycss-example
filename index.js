import 'babel-polyfill';
import '@webcomponents/webcomponentsjs/webcomponents-lite';

window.addEventListener('WebComponentsReady', () => {
  var tpl = document.querySelector('template');
  class Test extends HTMLElement {
    constructor() {
      super();
      ShadyCSS.prepareTemplate(tpl, 'x-test');
      this.attachShadow({mode: 'open'});
      this.shadowRoot.appendChild(tpl.content.cloneNode(true));
    }
    
    connectedCallback() {
      ShadyCSS.styleElement(this);
    }
    
    setProperty(name, value) {
      this.style.setProperty(name, value)
      ShadyCSS.styleSubtree(this, {[name]: value});
    }
  }

  customElements.define('x-test', Test);
  var test = document.querySelector('x-test');

  document.querySelector('#elementcolor').addEventListener('input', ({target}) => {
    test.setProperty('--background', target.value);
  })
});
