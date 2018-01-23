/* tslint:disable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Page, Card} from '@shopify/polaris';
import {EmbeddedApp} from '@shopify/polaris/embedded';

class MyApp extends React.Component<{}, {}> {
    render() {
        return (
            <Page title="Example application">
                <Card sectioned>
                    Insert the rest of your app here, including those components detailed below, which can now
                    communicate with the Embedded App SDK.
                </Card>
            </Page>
        );
    }
}

ReactDOM.render(
    <EmbeddedApp
        apiKey="602ab284d6b0ed6da2af9716595096d0"
        shopOrigin="https://test-sijo.myshopify.com"
        forceRedirect={true}
    >
        <MyApp/>
    </EmbeddedApp>,
    document.querySelector('#root') // or another DOM element you want to mount the app in
);