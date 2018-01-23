/* tslint:disable */
import * as React from 'react';
import {extend} from 'lodash';
import {
    SearchkitProvider,
    SearchBox, RefinementListFilter, Pagination,
    HitsStats, SortingSelector, NoHits,
    ResetFilters, ViewSwitcherHits, ViewSwitcherToggle, DynamicRangeFilter,
    GroupedSelectedFilters,
    Layout, TopBar, LayoutBody, LayoutResults,
    ActionBar, ActionBarRow, SideBar, PageSizeSelector,Panel
} from 'searchkit';
import * as accounting from 'accounting';
import * as getSymbolFromCurrency from 'currency-symbol-map';
import {RefinementListFilterWithZeroCount} from "./RefinementListFilterWithZeroCount";

let searchItCurrency = 'USD';
const ProductHitsGridItem = (props) => {
    const {bemBlocks, result} = props;
    let url = result._source.productUrl;
    let price = result._source.prices[0];
    let compareAtPrice = result._source.compareAtPrices[0];

    const quantity = result._source.maxInventoryQuantity;
    const soldOutString = quantity == 0 ? (<div style={{color: "red"}}>Sold out </div>) : null;
    const strikeOutPrice = compareAtPrice > price ? (<span
        style={{textDecoration: "line-through"}}>{accounting.formatMoney(compareAtPrice, getSymbolFromCurrency(searchItCurrency))}</span>) : null;

    const source: any = extend({}, result._source, result.highlight);

    return (
        <div className={bemBlocks.item().mix(bemBlocks.container("item"))} data-qa="hit">
            <a href={url}>
                <img data-qa="poster" alt="presentation" className={bemBlocks.item("poster")}
                     src={result._source.imageSource}/>
                <div data-qa="title" className={bemBlocks.item("title")}
                     dangerouslySetInnerHTML={{__html: source.title}}></div>
                <div data-qa="title" className={bemBlocks.item("description")}
                     dangerouslySetInnerHTML={{__html: source.description}}></div>
                <div
                    className={bemBlocks.item("price")}>{accounting.formatMoney(price, getSymbolFromCurrency(searchItCurrency))} {strikeOutPrice}
                </div>


                {soldOutString}
            </a>
        </div>
    )
};

const ProductHitsListItem = (props) => {
    const {bemBlocks, result} = props;
    let url = result._source.productUrl;
    let price = result._source.prices[0];
    let compareAtPrice = result._source.compareAtPrices[0];

    const source: any = extend({}, result._source, result.highlight);
    const quantity = result._source.maxInventoryQuantity;
    const soldOutString = quantity == 0 ? (<div style={{color: "red"}}>Sold out </div>) : null;
    const strikeOutPrice = compareAtPrice > price ? (<span
        style={{textDecoration: "line-through"}}>{accounting.formatMoney(compareAtPrice, getSymbolFromCurrency(searchItCurrency))}</span>) : null;


    return (
        <div className={bemBlocks.item().mix(bemBlocks.container("item"))} data-qa="hit">
            <div className={bemBlocks.item("poster")}>
                <img alt="presentation" data-qa="poster" src={result._source.imageSource}/>
            </div>
            <div className={bemBlocks.item("details")}>
                <a href={url}><h2 className={bemBlocks.item("title")}
                                  dangerouslySetInnerHTML={{__html: source.title}}></h2></a>
                <div data-qa="title" className={bemBlocks.item("description")}
                     dangerouslySetInnerHTML={{__html: source.description}}></div>
                <div
                    className={bemBlocks.item("price")}>{accounting.formatMoney(price, getSymbolFromCurrency(searchItCurrency))} {strikeOutPrice}</div>
                {soldOutString}
            </div>
        </div>
    )
};

class App extends React.Component<any, any> {
    constructor(props) {
        super(props);
        searchItCurrency = this.props.currency;
        this.state = {
            isopen: false,
            collapsable:false
        }
    }

    componentDidMount() {
        if(window.outerWidth < 749){
            this.setState({collapsable:true})
        }
        window.addEventListener("resize", ()=>{
                this.setState({collapsable:window.outerWidth < 749})
        });
    }

    render() {

        const {facets} = this.props;
        let query = '.';
        if (this.props.query) {
            query = ' for "' + this.props.query + '".';
        }

        return (
            <SearchkitProvider searchkit={this.props.searchkit}>
                <Layout>
                    <div style={{display: 'none'}}>
                        <TopBar>
                            <SearchBox autofocus={true}
                                       searchOnChange={false}
                                       queryBuilder={(query: string, options: Object) => {
                                           return {
                                               "boosting": {
                                                   "positive": {
                                                       "simple_query_string": {
                                                           "query": query,
                                                           "fields": ["title^20", "category^8", "vendor^8", "keywords^8", "description^4"]
                                                       }
                                                   },
                                                   "negative": {"term": {"maxInventoryQuantity": 0}},
                                                   "negative_boost": 0.3
                                               }
                                           };

                                       }}/>
                        </TopBar>
                    </div>
                    <LayoutBody>

                        <SideBar className={(this.state.isopen == true) ? "sidebarShow" : "sidebarHide"}>
                            <button onClick={() => this.setState({isopen: false})} className="mobile-exit-button">See
                                Results
                            </button>
                            {
                                facets.map(f => {
                                    if (f.type === 'RANGE') {
                                        return (<DynamicRangeFilter key={f.field} field={f.field} id={f.field}
                                                                    title={f.title}
                                                                    containerComponent={<Panel collapsable={this.state.collapsable} defaultCollapsed={this.state.collapsable}/>}
                                                                    rangeFormatter={(range) => accounting.formatMoney(range, getSymbolFromCurrency(searchItCurrency))}/>);
                                    } else {

                                        if (f.field === 'availability' || f.field === 'onSale') {
                                            return (<RefinementListFilterWithZeroCount key={f.field}
                                                                                       translations={{"facets.view_more": "View all"}}
                                                                                       id={f.field} title={f.title}
                                                                                       field={f.field}
                                                                                       containerComponent={<Panel collapsable={this.state.collapsable} defaultCollapsed={this.state.collapsable}/>}
                                                                                       size={5} operator="OR"/>);
                                        } else {
                                            return (<RefinementListFilter key={f.field}
                                                                          translations={{"facets.view_more": "View all"}}
                                                                          id={f.field} title={f.title} field={f.field}
                                                                          containerComponent={<Panel collapsable={this.state.collapsable} defaultCollapsed={this.state.collapsable}/>}
                                                                          size={5} operator="OR"/>);
                                        }
                                    }
                                })
                            }

                        </SideBar>
                        <LayoutResults>
                            <ActionBar>

                                <ActionBarRow>
                                    <HitsStats translations={{
                                        "hitstats.results_found": "{hitCount} results found" + query
                                    }}/>
                                    <div className="mobile-button-div">
                                        <button className="mobile-button" onClick={() => this.setState({isopen: true})}>
                                            Filters
                                        </button>
                                    </div>
                                    {/*<ViewSwitcherToggle/>*/}
                                    <SortingSelector options={[
                                        {label: "Relevance", field: "_score", order: "desc"},
                                        {label: "Price: High to low", field: "prices", order: "desc"},
                                        {label: "Price: Low to high", field: "prices", order: "asc"}
                                    ]}/>
                                    <PageSizeSelector className="per-page" options={[12, 24, 36]} translations={{
                                        "12": "12 per page",
                                        "24": "24 per page",
                                        "36": "36 per page"
                                    }}/>
                                </ActionBarRow>

                                <ActionBarRow>
                                    <GroupedSelectedFilters/>
                                    <ResetFilters options={{query: false, filter: true, pagination: true}}/>
                                </ActionBarRow>

                            </ActionBar>
                            <ViewSwitcherHits
                                hitsPerPage={12}
                                sourceFilter={["title", "imageSource", "productUrl", "prices", "description", "maxInventoryQuantity", "compareAtPrices"]}
                                hitComponents={[
                                    {
                                        key: "grid",
                                        title: "Grid",
                                        itemComponent: ProductHitsGridItem,
                                        defaultOption: true
                                    },
                                    {key: "list", title: "List", itemComponent: ProductHitsListItem}
                                ]}
                                scrollTo="body"
                            />
                            <NoHits suggestionsField={"title"}/>
                            <Pagination showNumbers={true}/>
                        </LayoutResults>

                    </LayoutBody>
                </Layout>
            </SearchkitProvider>
        );
    }
}

export default App;
