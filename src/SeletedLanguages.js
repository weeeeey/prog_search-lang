export default function SelectedLanguage({ $app, initialState }) {
    this.state = initialState;
    this.$target = document.createElement('div');
    this.$target.className = 'SelectedLanguage';
    $app.append(this.$target);

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    this.render = () => {
        this.$target.innerHTML =
            this.state.length > 0
                ? `<ul>${this.state
                      .map((item) => `<li>${item}</li>`)
                      .join('')}</ul>`
                : '';
    };

    this.render();
}
