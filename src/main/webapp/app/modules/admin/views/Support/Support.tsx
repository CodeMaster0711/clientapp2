/* tslint:disable */
import * as React from 'react';
import {Badge, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import * as classnames from "classnames";

export default class Support extends React.Component<any, any> {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1'
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col>
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={classnames({active: this.state.activeTab === '1'})}
                                    onClick={() => {
                                        this.toggle('1');
                                    }}
                                >
                                    FAQ
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({active: this.state.activeTab === '2'})}
                                    onClick={() => {
                                        this.toggle('2');
                                    }}
                                >
                                    Support
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                <p>
                                    <b>1. How can I modify Look and Feel of the autocomplete? </b><br/>
                                    You can go to the "Customizations" section and change the look and feel of the
                                    autocomplete.
                                </p>

                                <p>
                                    <b>2. What are synonyms and how do they work?</b> <br/>
                                    The synonyms tool helps to improve your search results and customer experience. For
                                    example, if your store has the product category 'blazer',
                                    this tool allows you to tag any number of words that have a meaning similar to
                                    'blazer'(example: 'jacket','coat'). Now, when a user searches
                                    for 'jacket' in the storefront, the search results will be the same as if the word
                                    'blazer' was searched.
                                </p>

                                <p>
                                    <b>3. How frequently do you sync my products?</b> <br/>
                                    We sync your products within 15-20 minutes of any addition, deletion, or
                                    modification.
                                </p>

                                <p>
                                    <b>4. How can I make search results page take full width of the page?</b> <br/>
                                    SearchIT uses your site theme to render search result page. Sometimes theme width is
                                    too narrow. We have tried our level best to
                                    accommodate as many themes as we could. But if it's not working for you, just reach
                                    out to us on support@thesearchit.com and
                                    we will resolved it within 24 hours.
                                </p>
                            </TabPane>
                            <TabPane tabId="2">
                                Our very responsive customer support is always available 24/7 to render assistance you
                                may require regarding any user difficulties or complaints which may arise. We would
                                immediately follow up on your concerns and guide you effectively to ensure that you
                                continue to enjoy the unbridled experience of the SearchIT App. Simply reach out to us
                                on support@thesearchit.com
                                and we will get back to you within one day.
                            </TabPane>
                        </TabContent>
                    </Col>
                </Row>
            </div>
        )
    }
}
