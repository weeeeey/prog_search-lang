export default function SearchInput({
    $app,
    initialState,
    onChange,
    onEnterkey,
}) {
    this.state = initialState;
    this.$target = document.createElement('form');
    this.$target.className = 'SearchInput';

    $app.appendChild(this.$target);

    this.render = () => {
        this.$target.innerHTML = `
        <input
        class="SearchInput__input"
        type="text"
        placeholder="프로그램 언어를 입력하세요."
        autofocus
    />
        `;
        const $input = document.querySelector('.SearchInput__input');
        $input.value = this.state;
        $input.focus();
    };
    this.render();

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    this.$target.addEventListener('submit', (e) => {
        e.preventDefault();
        onEnterkey();
    });
    this.$target.addEventListener('keyup', (e) => {
        const ignoreKeys = new Set([
            'ArrowRight',
            'ArrowLeft',
            'ArrowUp',
            'ArrowDown',
            'Enter',
        ]);
        if (ignoreKeys.has(e.key)) return;
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
            onChange(e.target.value);
        }, 200);
    });
}
