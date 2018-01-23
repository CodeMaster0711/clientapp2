/* tslint:disable */

import * as autoComplete from 'js-autocomplete';
import * as AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import * as AutosuggestHighlightParse from 'autosuggest-highlight/parse';
import axios from 'axios';
import {API_ROOT, STATS_ROOT} from "./shared/util/api-config";
import {NO_PRODUCT_FOUND, PRODUCT_CLICK, SEARCHED_PHRASE, URL_REDIRECT} from './reducers/event-type';
import * as elasticsearch from 'elasticsearch-browser';
import * as accounting from 'accounting';
import * as getSymbolFromCurrency from 'currency-symbol-map';

export class Product implements ElementType {
    getIndex() {
        return this.index;
    }

    getType() {
        return "PRODUCT";
    }

    title: string;
    unabbreviatedTitle: string;
    description: string;
    price: number;
    compareAtPrice: number;
    image: string;
    link: string;
    id: string;
    index: number;

    constructor(id: string, title: string, unabbreviatedTitle: string, description: string, price: number, compareAtPrice: number, image: string, link: string, index: number) {
        this.id = id;
        this.title = title;
        this.unabbreviatedTitle = unabbreviatedTitle;
        this.description = description;
        this.price = price;
        this.compareAtPrice = compareAtPrice;
        this.image = image;
        this.link = link;
        this.index = index;
    }
}

export interface ElementType {
    getType();

    getIndex();
}

export class Suggestion implements ElementType {


    getIndex() {
        return this.index;
    }

    getType() {
        return "SUGGESTION";
    }

    text: string;
    index: number;

    constructor(text: string, index: number) {
        this.text = text;
        this.index = index;
    }
}


class SAASInitializer {
    private w: Window;
    private keywordUrlMap: Map<string, string>;
    private params: Map<string, string>;
    private client: elasticsearch.Client;
    private currency: string;
    private searchResultPage: string;

    constructor(w: Window) {
        this.w = w;
        this.keywordUrlMap = new Map();
        this.params = new Map();
    }

    private productSearch(callback, term: string) {

        let autocompleteElements = new Array<ElementType>();

        const shop = this.params.get('shop');


        this.client.msearch(this.buildSearchQuery(shop, term)).then((result) => {
            const resp = result.responses[0];
            const suggestResponse = result.responses[1];

            const otherSuggestionsSet = new Set<string>();
            const otherSuggestionsArray = [];

            let productElements = [];
            let suggestionCount = 0;
            if (resp.status == 200) {
                const productHits = resp.suggest.title_suggest;
                const vendorHits = resp.suggest.vendor_suggest;
                const keywordsHits = resp.suggest.keywords_suggest;
                const productTypeHits = resp.suggest.product_type_suggest;


                productElements = this.buildProductElements(productHits, term);


                for (let i = 0; i < productTypeHits.length; i++) {
                    for (let j = 0; j < productTypeHits[i].options.length; j++) {
                        const categorySuggestion = productTypeHits[i].options[j]._source.category;

                        if (otherSuggestionsSet.has(categorySuggestion.toLowerCase())) {
                            continue;
                        }
                        otherSuggestionsSet.add(categorySuggestion.toLowerCase());
                        otherSuggestionsArray.push(new Suggestion(categorySuggestion, suggestionCount++));
                    }
                }

                if (otherSuggestionsArray.length < 10) {
                    for (let i = 0; i < vendorHits.length; i++) {
                        for (let j = 0; j < vendorHits[i].options.length; j++) {
                            const brandSuggestion = vendorHits[i].options[j]._source.vendor;

                            if (otherSuggestionsSet.has(brandSuggestion.toLowerCase())) {
                                continue;
                            }
                            otherSuggestionsSet.add(brandSuggestion.toLowerCase());
                            otherSuggestionsArray.push(new Suggestion(brandSuggestion, suggestionCount++));
                        }
                    }
                }

                if (otherSuggestionsArray.length < 10) {
                    for (let i = 0; i < keywordsHits.length; i++) {
                        for (let j = 0; j < keywordsHits[i].options.length; j++) {
                            for (let k = 0; k < keywordsHits[i].options[j]._source.keywords.length; k++) {

                                const keywordSuggestion = keywordsHits[i].options[j]._source.keywords[k];

                                if (keywordSuggestion.toLowerCase().startsWith(term.toLowerCase())) {

                                    if (otherSuggestionsSet.has(keywordSuggestion.toLowerCase())) {
                                        continue;
                                    }

                                    otherSuggestionsSet.add(keywordSuggestion.toLowerCase());
                                    otherSuggestionsArray.push(new Suggestion(keywordSuggestion, suggestionCount++));
                                }
                            }
                        }
                    }
                }
            }


            if (suggestResponse.status == 200 && suggestResponse.suggest != null && suggestResponse.suggest.suggestions != null) {

                const suggestionHits = suggestResponse.suggest.suggestions;


                if (otherSuggestionsArray.length < 10) {
                    for (let i = 0; i < suggestionHits.length; i++) {
                        for (let j = 0; j < suggestionHits[i].options.length; j++) {
                            const titleTextSuggestion = suggestionHits[i].options[j].text;

                            if (otherSuggestionsSet.has(titleTextSuggestion.toLowerCase())) {
                                continue;
                            }
                            otherSuggestionsSet.add(titleTextSuggestion.toLowerCase());
                            otherSuggestionsArray.push(new Suggestion(titleTextSuggestion, suggestionCount++));
                        }
                    }
                }
            }


            otherSuggestionsArray.forEach(((value, index) => {
                if (index < 10) {
                    autocompleteElements.push(value);
                }
            }));

            while (autocompleteElements.length > 4) {
                autocompleteElements.pop();
            }


            autocompleteElements.push(...productElements);
            callback(autocompleteElements);
        }, (err) => {
            callback(autocompleteElements);
        });


    }

    private titleCase(str) {
        let words = str.toLowerCase().split(' ');

        for (let i = 0; i < words.length; i++) {
            let letters = words[i].split('');
            if (letters.length >= 1) {
                letters[0] = letters[0].toUpperCase();
            }
            words[i] = letters.join('');
        }
        return words.join(' ');
    }

    private shorten(text, maxLength) {
        let ret = text;
        if (ret.length > maxLength) {
            ret = ret.substr(0, maxLength - 3) + "...";
        }
        return ret;
    }

    private buildProductElements(productHits: { prefix; completion } | any, term: string) {
        const productElements = new Array<ElementType>();
        const productIds = new Set<string>();
        const autoCompleteProductSize = 4;
        let productCount = 0;

        for (let i = 0; i < productHits.length; i++) {

            for (let j = 0; j < productHits[i].options.length; j++) {
                const obj = productHits[i].options[j];
                if (productIds.has(obj._source.id)) {
                    continue;
                }

                const price = obj._source.prices[0];
                const compareAtPrice = obj._source.compareAtPrices[0];

                productElements.push(new Product(
                    obj._source.id,
                    this.titleCase(this.shorten(obj._source.title, 45)),
                    obj._source.title,
                    '',
                    price,
                    compareAtPrice,
                    obj._source.imageSource,
                    obj._source.productUrl,
                    productCount++));

                if (productElements.length >= autoCompleteProductSize) {
                    break;
                }
            }

            if (productElements.length >= autoCompleteProductSize) {
                break;
            }
        }

        if (productElements.length == 0) {
            this.trackEvent(NO_PRODUCT_FOUND, term);
        }
        return productElements;
    }

    private buildSearchQuery(shop: string, term: string) {
        return {
            body: [
                {index: shop + "-alias", "type": "product"},
                {
                    _source: ["title", "category", "vendor", "keywords", "prices", "imageSource", "productUrl", "id", "compareAtPrices"],
                    suggest: {
                        title_suggest: {
                            prefix: term,
                            completion: {
                                field: "titleSuggest",
                                size: 20,
                                fuzzy: {
                                    fuzziness: 1
                                }
                            }
                        },
                        vendor_suggest: {
                            prefix: term,
                            completion: {
                                field: "vendorSuggest",
                                size: 20,
                                fuzzy: {
                                    fuzziness: 1
                                }
                            }
                        },
                        product_type_suggest: {
                            prefix: term,
                            completion: {
                                field: "productTypeSuggest",
                                size: 20,
                                fuzzy: {
                                    fuzziness: 1
                                }
                            }
                        },
                        keywords_suggest: {
                            prefix: term,
                            completion: {
                                field: "keywordsSuggest",
                                size: 20,
                                fuzzy: {
                                    fuzziness: 1
                                }
                            }
                        }
                    }
                },

                {index: shop + "-suggestion-alias", type: "suggestion"},
                {
                    _source: ["suggest"],
                    suggest: {
                        suggestions: {
                            prefix: term,
                            completion: {
                                field: "suggest",
                                size: 10,
                                fuzzy: {
                                    fuzziness: 1
                                }
                            }
                        }
                    }
                }

            ]
        };
    }


    initialize() {

        if (window['open'] && window['send']) {
            window['XMLHttpRequest'].prototype.open = window['open'];
            window['XMLHttpRequest'].prototype.send = window['send'];
        }

        this.initializeQueryParameters();
        this.initializeKeywordUrlMap();

        const shop = this.params.get('shop');


        const cssUrl = `https://s3-us-west-1.amazonaws.com/et-saas/css/${shop}.css`;

        const elasticsearchHost = `https://search-sass-prod-v2-ulrybcpm4e5ihoc6xz5d4em3ti.us-west-1.es.amazonaws.com`;

        this.client = new elasticsearch.Client({
            apiVersion: '5.3',
            host: elasticsearchHost,
            log: 'error'
        });

        this.loadCss(cssUrl, null);

        let querySelectors = this.w.document.querySelectorAll('input[name="q"]');

        const shopifyPageUrl = `${API_ROOT}/api/shop-details?shop=${shop}`;
        axios.get(shopifyPageUrl)
            .then((response) => {
                for (let i = 0; i < querySelectors.length; i++) {
                    let querySelector = querySelectors.item(i);

                    let inputElement = (querySelector as HTMLInputElement);

                    let form = inputElement.form;
                    this.searchResultPage = `/pages/${response.data.searchResultPage}`;
                    form.action = this.searchResultPage;
                    this.currency = response.data.currency;
                }

            })
            .catch((error) => {
                //console.log(error);
            });

        for (let i = 0; i < querySelectors.length; i++) {

            let querySelector = querySelectors.item(i);

            let inputElement = (querySelector as HTMLInputElement);

            if (this.params.has("q")) {
                inputElement.value = this.params.get("q");
            }

            let form = inputElement.form;

            form.addEventListener("submit", (event) => {
                if (this.keywordUrlMap.has(inputElement.value)) {
                    this.trackEvent(URL_REDIRECT, inputElement.value);
                    this.w.document.location.href = this.keywordUrlMap.get(inputElement.value);
                    event.preventDefault();
                    return false;
                } else {
                    //this.trackEvent(SEARCHED_PHRASE, inputElement.value);
                }
            });

            new autoComplete({
                selector: inputElement,
                minChars: 1,
                delay: 0,
                source: (term, callback) => {
                    this.productSearch(callback, term);
                },
                renderItem: (element: ElementType, query) => {


                    if (element.getType() === 'SUGGESTION') {

                        const suggestion = element as Suggestion;
                        const suggestionText = `${suggestion.text}`;

                        const matches = AutosuggestHighlightMatch(suggestionText, query);
                        const parts = AutosuggestHighlightParse(suggestionText, matches);

                        query = query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

                        let productName = '';
                        parts.map((part, index) => {
                            const className = part.highlight ? 'highlight' : null;

                            if (part.highlight) {
                                productName = productName + `<span class="${className}">${part.text}</span>`;
                            } else {
                                productName = productName + `<span>${part.text}</span>`;
                            }
                        });
                        if (suggestion.getIndex() == 0) {

                            return `<span class="search-title-span"> Suggetions </span><div class="autocomplete-suggestion" data-type="SUGGESTION" class="pop-suggestion" data-suggestion="${suggestionText}" data-val="${query}">${productName}</div>`

                        } else {
                            return `<div class="autocomplete-suggestion" data-type="SUGGESTION" class="pop-suggestion" data-suggestion="${suggestionText}" data-val="${query}">${productName}</div>`
                        }

                    }

                    if (element.getType() === 'PRODUCT') {
                        const item = element as Product;

                        const suggestionText = `${item.title}`;
                        const matches = AutosuggestHighlightMatch(suggestionText, query);
                        const parts = AutosuggestHighlightParse(suggestionText, matches);

                        query = query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

                        let productName = '';
                        parts.map((part, index) => {
                            const className = part.highlight ? 'highlight' : null;

                            if (part.highlight) {
                                productName = productName + `<span class="${className}">${part.text}</span>`;
                            } else {
                                productName = productName + `<span>${part.text}</span>`;
                            }
                        });

                        let additionalHtml = '';
                        if (item.getIndex() == 0) {
                            additionalHtml = '<span class="search-title-span">Products</span>';
                        }

                        const strikeOutPrice = item.compareAtPrice > item.price ? '<span style="text-decoration: line-through">' + accounting.formatMoney(item.compareAtPrice, getSymbolFromCurrency(this.currency)) + '</span>' : '';

                        return `${additionalHtml}<div class="autocomplete-suggestion" data-type="PRODUCT" data-title="${item.unabbreviatedTitle}" data-itemId="${item.id}" data-query="${query}" data-link="${item.link}" data-val="${query}">
                            <a class="suggestion" href=${item.link}>
                                <div class="img">
                                    <img src="${item.image}" />
                                </div>
                                <div class="info">
                                    <h3 >
                                        ${productName}
                                    </h3>
                                    <p class="price">${accounting.formatMoney(item.price, getSymbolFromCurrency(this.currency))} ${strikeOutPrice}</p>
                                </div>
                            </a>
                        </div>`;
                    }

                },
                onSelect: (e, term, item) => {

                    let code = (e.keyCode ? e.keyCode : e.which);
                    if (code == 13 && item.getAttribute("data-type") == "SUGGESTION") {
                        e.preventDefault();
                        location.href = this.searchResultPage + '?q=' + item.getAttribute("data-suggestion");
                    } else if (code == 13) {

                    }
                    else {
                        e.preventDefault();

                        if (item.getAttribute("data-type") == "PRODUCT") {
                            this.trackEvent(PRODUCT_CLICK, item.getAttribute('data-query'), item.getAttribute('data-title'), item.getAttribute('data-itemId'));
                            location.href = item.getAttribute('data-link');
                        } else {
                            location.href = this.searchResultPage + '?q=' + item.getAttribute("data-suggestion");
                        }
                    }
                }
            });


        }
    }


    private loadCss(source: string, callback) {
        const cssLink = this.w.document.createElement("link");
        cssLink.rel = "stylesheet";
        cssLink.href = source;
        cssLink.className = "saas_css";

        //const timeoutReference = setTimeout(callback, 5E3);
        cssLink.onload = function () {
            //clearTimeout(timeoutReference);
            //callback()
        };

        this.w.document.getElementsByTagName("head")[0].appendChild(cssLink)
    }

    private trackEvent(event: string, term: string, title: string = null, itemId: string = null) {
        const shop = this.params.get('shop');
        const requestData = {
            Data: {
                event: event,
                term: term,
                title: title,
                itemId: itemId,
                shop: shop,
                date: Date.now()
            },
            PartitionKey: shop
        };
        axios.post(STATS_ROOT, requestData);
    }

    private initializeKeywordUrlMap() {

        let host = this.params.get('shop');

        const keywordUrl = `${API_ROOT}/api/redirect?shop=${host}`;

        axios.get(keywordUrl)
            .then((response) => {
                response.data.map(obj => {
                    this.keywordUrlMap.set(obj.keyword, obj.url);
                })
            })
            .catch((error) => {
                //console.log(error);
            });
    }

    private initializeQueryParameters() {

        let host = this.w.location.host;

        if (host.indexOf('localhost') >= 0) {
            this.params.set('shop', 'test-sujata.myshopify.com');
        } else {
            const scriptUrl = this.getScriptUrl();
            const query = scriptUrl.replace(/^.*\?/, '');
            let args = query.split('&');
            let pair;
            let key;
            let value;

            for (let i = 0; i < args.length; i++) {
                pair = args[i].split('=');
                key = this.decode(pair[0]);
                value = this.decode(pair[1]);
                this.params.set(key, value);
            }
        }

        this.addLocationQueryStringParameters();
    }

    private decode(string) {
        return decodeURIComponent(string || "").replace('+', ' ');
    }

    private addLocationQueryStringParameters() {
        let queryString = this.w.location.search;
        queryString = queryString.replace(/^.*\?/, '');

        let args = queryString.split('&');
        let pair;
        let key;
        let value;

        for (let i = 0; i < args.length; i++) {
            pair = args[i].split('=');
            key = this.decode(pair[0]);
            value = this.decode(pair[1]);
            this.params.set(key, value);
        }
    }

    private getScriptUrl() {
        let scripts = this.w.document.getElementsByTagName('script');
        let element;
        let src;

        for (let i = 0; i < scripts.length; i++) {
            element = scripts[i];
            src = element.src;

            if (src && /d2kmm0jpigycxg\.cloudfront\.net\/app\/search\.bundle\.js/.test(src)) {
                return src;
            }

            if (src && /s3-us-west-1.amazonaws\.com\/saasclient\/app\/search\.bundle\.js/.test(src)) {
                return src;
            }

            if (src && /d2kmm0jpigycxg\.cloudfront\.net\/app\/search_results\.bundle\.js/.test(src)) {
                return src;
            }

            if (src && /s3-us-west-1.amazonaws\.com\/saasclient\/app\/search_results\.bundle\.js/.test(src)) {
                return src;
            }
        }

        return null;
    }
}

let saasInitializer = new SAASInitializer(window);
saasInitializer.initialize();
