// polaris
import '@shopify/polaris/styles.css';

/* tslint:disable */ import * as React from 'react';

// polaris
import { CalloutCard, Card, List } from '@shopify/polaris';

export default class Polaris extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <Card
        title="Online store dashboard"
        sectioned
      >
        <List type="bullet">
          <List.Item>Yellow shirt</List.Item>
          <List.Item>Red shirt</List.Item>
          <List.Item>Green shirt</List.Item>
        </List>
        <CalloutCard
          title="Customize the style of your checkout"
          illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
          primaryAction={{
            content: 'Customize checkout',
            url: 'https://www.shopify.com',
          }}
        >
          <p>Upload your store’s logo, change colors and fonts, and more.</p>
        </CalloutCard>
      </Card>
    );
  }
}

