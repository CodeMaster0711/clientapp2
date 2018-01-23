/* tslint:disable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios';
//import './index.css';

import {
    SearchkitManager
} from 'searchkit';
import {API_ROOT, STATS_ROOT} from "../shared/util/api-config";
import {SEARCHED_PHRASE} from "../reducers/event-type";

class SearchResultsInitializer {

    private w: Window;
    private params: Map<string, string>;

    constructor(w: Window) {
        this.w = w;
        this.params = new Map();
    }

    initialize() {

        if (window['open'] && window['send']) {
            window['XMLHttpRequest'].prototype.open = window['open'];
            window['XMLHttpRequest'].prototype.send = window['send'];
        }

        this.initializeQueryParameters();

        const shop = this.params.get('shop');
        const query = this.params.get("q");

        this.trackEvent(SEARCHED_PHRASE, query);

        this.loadCss('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css', null);
        const shopSearchResultsCss = `https://s3-us-west-1.amazonaws.com/et-saas/css/${shop}-search-results.css`;

        this.loadCss(shopSearchResultsCss, null);

        const facets = [];

        const url = `${API_ROOT}/api/facets?shop=${shop}`;

        axios.get(url)
            .then((response) => {
                response.data.facets.map(f => {
                    facets.push({
                        "field": f.field,
                        "title": f.title,
                        "type": f.type
                    });
                });



                ReactDOM.render(
                    <App facets={facets} currency={response.data.currency} searchkit={searchkit} query={query}/>,
                    document.getElementById('root')
                );
            })
            .catch((error) => {
                //console.log(error);
            });


        const host = `https://search-sass-prod-v2-ulrybcpm4e5ihoc6xz5d4em3ti.us-west-1.es.amazonaws.com/${shop}-alias`;
        const searchkit = new SearchkitManager(host);
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

}

let searchResultsInitializer = new SearchResultsInitializer(window);
searchResultsInitializer.initialize();