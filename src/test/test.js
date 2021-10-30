class LiveTimer extends HTMLElement {

    render() {
        this.innerHTML = `
    <time-formatted hour="numeric" minute="numeric" second="numeric">
    </time-formatted>
    `;

        this.timerElem = this.firstElementChild;
    }

    connectedCallback() { // (2)
        if (!this.rendered) {
            this.render();
            this.rendered = true;
        }
        this.timer = setInterval(() =>
            this.timerElem.setAttribute('datetime', new Date()), 1000);
    }

    disconnectedCallback() {
        clearInterval(this.timer); // важно, чтобы элемент мог быть собранным сборщиком мусора
    }

}

customElements.define("live-timer", LiveTimer);
