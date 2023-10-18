export default function SeletedLanguages({ $app, initialState, onChange }) {
    this.state = initialState;
    this.$target = document.createElement('div');
    this.$target.className = 'SelectedLanguage';
    $app.appendChild(this.$target);

    this.render = () => {
        this.$target.innerHTML = `
            <ul>
                ${this.state.map((item) => `<li>${item}</li>`)}
            </ul>
        `;
    };
    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };
    this.render();
}
