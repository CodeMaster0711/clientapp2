import './search.css';
import axios from 'axios';

/* tslint:disable */
import * as React from 'react';
import * as Autosuggest from 'react-autosuggest';
import * as AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import * as AutosuggestHighlightParse from 'autosuggest-highlight/parse';

export class Product {
    title: string;
    description: string;
    price: string;
    image: string;
    link: string;
    query: string;


    constructor(title: string, description: string, price: string, image: string, link: string, query: string) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.image = image;
        this.link = link;
        this.query = query;
    }
}

export interface RenderSuggestionParams {
    query: string;
    isHighlighted: boolean;
}

export interface ISearchProp {
    formAction: string;
    containerClassName: string;
    inputElement: HTMLInputElement;
    formElement: any;
}

export interface ISearchState {
    value: string;
    suggestions: Product[];
    isLoading: boolean;
}

export default class SearchAutosuggest extends React.Component<ISearchProp, ISearchState> {

    lastRequestId;

    constructor(props) {
        super(props);

        this.state = {
            value: '',
            suggestions: [],
            isLoading: false
        };

        this.lastRequestId = null;
        this.onKeyUp = this.onKeyUp.bind(this);
    }

    loadSuggestions(value) {

        this.setState({
            isLoading: true
        });

        const url = `https://search.testapp123.com/api/autocomplete?search_text=${value}&show_items=10&shop=${location.host}`;

        axios.get(url)
            .then((response) => {
                const products = response.data.map(obj => new Product(obj.title, obj.description, obj.price, obj.image, obj.link, obj.query));
                this.setState({
                    isLoading: false,
                    suggestions: products
                });

            })
            .catch((error) => {
                console.log(error);
            });
    }


    getSuggestionValue = (suggestion: Product) => {
        return `${suggestion.query}`;
    };

    renderSuggestion = (suggestion: Product, {query}: RenderSuggestionParams) => {
        const suggestionText = `${suggestion.title}`;
        const matches = AutosuggestHighlightMatch(suggestionText, query);
        const parts = AutosuggestHighlightParse(suggestionText, matches);

        return (
            <span>
        {
            parts.map((part, index) => {
                const className = part.highlight ? 'highlight' : null;

                return (
                    <span className={className} key={index}>{part.text}</span>
                );
            })
        }
      </span>
        );
    };


    onChange = (event, {newValue, method}) => {

        if (method === 'enter') {
            location.href = `${this.props.formAction}?q=${newValue}`
        }

        this.setState({
            value: newValue
        });
    };

    onKeyUp(e) {
        const { value } = this.state;
        const { inputElement } = this.props;
        inputElement.value = value;
    }

    onSuggestionSelected = (event, {suggestion, suggestionValue, suggestionIndex, sectionIndex, method}) => {
        console.log(event);
        location.href = suggestion.link;
        event.preventDefault();
    };

    onSuggestionsFetchRequested = ({value}) => {
        this.loadSuggestions(value);
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    handleSumbmit = e => {
        e.preventDefault();
        //location.href = `/pages/search-results?q=${this.state.value}`;
    };
   

    render() {
        const {value, suggestions} = this.state;
        const {inputElement} = this.props;
        const inputProps = {
            placeholder: "Search",
            value,
            className: inputElement.className,
            onChange: this.onChange,
            onKeyUp: this.onKeyUp,
        };

        return (

            <Autosuggest
                style={{display: 'inline'}}
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                onSuggestionSelected={this.onSuggestionSelected}
                inputProps={inputProps}
             />

        );
    }
}
