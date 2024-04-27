import React, { Component } from "react";
import { Button, Table } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Campaign from '../ethereum/campaign';
import Router from "next/router";

class RequestRow extends Component {
  onApprove = async () => {
    try {
      const campaign = Campaign(this.props.address);

      const accounts = await web3.eth.getAccounts();
      await campaign.methods.approveRequest(this.props.id).send({
        from: accounts[0]
      });

      Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
    } catch (error) {}
  };

  onFinalize = async () => {
    try {
      const campaign = Campaign(this.props.address);

      const accounts = await web3.eth.getAccounts();
      await campaign.methods.finalizeRequest(this.props.id).send({
        from: accounts[0]
      });
      
      Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
    } catch (error) {}
  }

  render() {
    const { Row, Cell } = Table;
    const { id, request, approversCount } = this.props;
    const readyToFinalize = request.approvalCount > approversCount / 2

    return (
      <Row disabled={request.complete} positive={readyToFinalize && !request.complete}>
        <Cell>{id + 1}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{request.value}</Cell>
        <Cell>{request.recipient}</Cell>
        <Cell>{parseInt(request.approvalCount)}/{approversCount}</Cell>
        <Cell>
          {request.complete ? 'Already Completed' : (
            <Button color="green" basic onClick={this.onApprove}>Approve</Button>
          )}
        </Cell>
        <Cell>
          {request.complete ? 'Already Completed' : (
            <Button color="teal" basic onClick={this.onFinalize}>Finalize</Button>
          )}
        </Cell>
      </Row>
    );
  }
}

export default RequestRow;