export default function Suggestion({
    $app,
    initialState,
    onArrowKey,
    onItemMatch,
    onClick,
}) {
    this.state = initialState;
    this.$target = document.createElement('div');
    this.$target.className = 'Suggestion';
    $app.appendChild(this.$target);

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    this.render = () => {
        const { searchResult, candidateIndex } = this.state;
        this.$target.style.visibility =
            searchResult.length > 0 ? 'visible' : 'hidden';
        this.$target.innerHTML = `<ul>
           ${searchResult
               .map(
                   (item, i) =>
                       `<li 
            data-id=${i}
            class=${
                i === candidateIndex ? 'Suggestion__item--selected' : ''
            }>${onItemMatch(item)}</li>`
               )
               .join('')} 
        </ul>`;
    };

    window.addEventListener('keyup', (e) => {
        if (this.state.searchResult.length === 0) return;
        const arrows = new Set(['ArrowUp', 'ArrowDown']);
        if (arrows.has(e.key)) {
            onArrowKey(e.key);
        }
    });

    this.$target.addEventListener('click', ({ target }) => {
        const li = target.closest('LI');
        if (!li) return;

        const { id } = li.dataset;
        onClick(parseInt(id));
    });

    this.render();
}
