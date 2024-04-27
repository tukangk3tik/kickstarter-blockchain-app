import React, { Component } from "react";
import Layout from "../../components/Layout";
import { Button, Form, Input, Message } from "semantic-ui-react";
import factory from '../../ethereum/factory';
import web3 from "../../ethereum/web3";
import { Router } from '../../routes';

class CampaignNew extends Component {
  state = {
    minimumContribution: '',
    isLoading: false,
  }

  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({ isLoading: true, errorMessage: '' });
    
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(this.state.minimumContribution)
        .send({
          from: accounts[0]
        });
      
      Router.pushRoute('/');
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }

    this.setState({ isLoading: false });
  }

  onInputChange = (event) => {
    this.setState({ 
      minimumContribution: event.target.value,
      errorMessage: '' 
    });
  }

  render() {
    return (
      <Layout>
        <h3>Create a new Campaign</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input 
              label="Wei" 
              labelPosition="right"
              value={this.state.minimumContribution}
              onChange={this.onInputChange}
            />
          </Form.Field>

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button 
            primary 
            loading={this.state.isLoading} 
            disabled={this.state.isLoading}>Create!</Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;