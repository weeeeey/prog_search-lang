import { getItem, setItem } from './util/localStorage.js';
import { getLanguage } from './util/api.js';
import SearchInput from './SearchInput.js';
import SeletedLanguages from './SeletedLanguages.js';
import Suggestion from './Suggestion.js';

const cache = {};
export default function App($app) {
    this.state = {
        inputValue: '',
        selectedLanguages: [],
        searchResult: [],
        candidateIndex: 0,
    };

    const onSelectLanguage = (idx) => {
        const { selectedLanguages, searchResult } = this.state;
        if (searchResult.length === 0) {
            return;
        }
        const newLanguage = searchResult[idx];
        alert(newLanguage);
        const filterLang = selectedLanguages.filter(
            (lang) => lang !== newLanguage
        );
        const addedLangs = [...filterLang, newLanguage];
        const newSeletedLangs = addedLangs.slice(-5);
        this.setState({
            ...this.state,
            selectedLanguages: newSeletedLangs,
        });
    };

    const searchInput = new SearchInput({
        $app,
        initialState: this.state.inputValue,
        onChange: async (value) => {
            if (cache[value] === undefined) {
                const result = await getLanguage(value);
                cache[value] = result;
            }
            const newSearchResult = cache[value];
            this.setState({
                ...this.state,
                inputValue: value,
                searchResult: newSearchResult,
            });
        },
        onEnterKey: () => {
            const { candidateIndex } = this.state;
            onSelectLanguage(candidateIndex);
        },
    });
    const seletedLanguages = new SeletedLanguages({
        $app,
        initialState: this.state.selectedLanguages,
    });
    const suggestion = new Suggestion({
        $app,
        initialState: {
            searchResult: this.state.searchResult,
            candidateIndex: this.state.candidateIndex,
        },
        onArrowKey: (key) => {
            const {
                searchResult: { length: len },
                candidateIndex,
            } = this.state;
            let newIndex = candidateIndex;
            if (key === 'ArrowUp') {
                newIndex = (candidateIndex + len - 1) % len;
            } else if (key === 'ArrowDown') {
                newIndex = (candidateIndex + 1) % len;
            }
            this.setState({
                ...this.state,
                candidateIndex: newIndex,
            });
        },
        onItemMatch: (item) => {
            const { inputValue } = this.state;
            const startIndex = item
                .toLowerCase()
                .indexOf(inputValue.toLowerCase());
            const endIndex = startIndex + inputValue.length;
            return (
                item.substring(0, startIndex) +
                `<span class="Suggestion__item--matched">` +
                item.substring(startIndex, endIndex) +
                `</span>` +
                item.substring(endIndex)
            );
        },
        onClick: (index) => {
            onSelectLanguage(index);
        },
    });

    this.setState = (nextState) => {
        this.state = nextState;
        searchInput.setState(this.state.inputValue);
        seletedLanguages.setState(this.state.selectedLanguages);
        suggestion.setState({
            searchResult: this.state.searchResult,
            candidateIndex: this.state.candidateIndex,
        });
        setItem('APP_STATE', this.state);
    };

    this.init = () => {
        const initialState = getItem('APP_STATE', this.state);
        this.setState(initialState);
    };
    this.init();
}
