import React, { Component } from "react";
import { Button, Form, Input, Message } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import Router from "next/router";

class ContributeForm extends Component {
  state = {
    value: '',
    errorMessage: '',
    isLoading: false,
  };

  onSubmit = async (event) => {
    event.preventDefault();

    const campaign = Campaign(this.props.address);
    this.setState({ isLoading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();

      await campaign.methods.contribute()
        .send({
          from: accounts[0],
          value: web3.utils.toWei(this.state.value, 'ether'),
        });
      
      this.setState({ value: '' });
      Router.replaceRoute(`/campaigns/${this.props.address}`);
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }

    this.setState({ isLoading: false });
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>Amount to Contribute</label>
          <Input
            value={this.state.value}
            onChange={event => this.setState({ value: event.target.value })} 
            label="ether" 
            labelPosition="right" 
          />
        </Form.Field>

        <Message error header="Oops!" content={this.state.errorMessage} />  
        <Button 
          primary 
          loading={this.state.isLoading} 
          disabled={this.state.isLoading}
          >
          Contribute!
        </Button>
      </Form>
    );
  }
}

export default ContributeForm;