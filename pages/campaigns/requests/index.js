import React, { Component } from "react";
import Layout from "../../../components/Layout";
import { Link } from '../../../routes';
import { Button, Table } from "semantic-ui-react";
import Campaign from '../../../ethereum/campaign';
import RequestRow from "../../../components/RequestRow";
import web3 from "../../../ethereum/web3";

class RequestIndex extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    const campaign = Campaign(address);
    const requestCount = await campaign.methods.getRequestsCount().call();
    const approversCount = await campaign.methods.approversCount().call();

    const requests = await Promise.all(
      Array(parseInt(requestCount)).fill().map((_, index) => {
        return campaign.methods.requests(index).call();
      })
    );

    return { address, requests, requestCount, approversCount };
  }

  renderRow() {
    return this.props.requests.map((request, index) => {
      request.value = web3.utils.fromWei(request.value, 'ether');
      
      return (
        <RequestRow 
          key={index}
          id={index}
          request={request}
          address={this.props.address}
          approversCount={parseInt(this.props.approversCount)}
        />
      );
    });
  }

  render() {
    const { Header, Row, HeaderCell, Body } = Table;

    return (
      <Layout>
        <h3>Requests</h3>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <a>
            <Button primary floated="right" style={{ marginBottom: 10 }}>Add Request</Button>
          </a>
        </Link>

        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Recipient</HeaderCell>
              <HeaderCell>Approval Count</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>
          <Body>
            {this.renderRow()}
          </Body>
        </Table>
        <div>Found {parseInt(this.props.requestCount)} requests</div>

        <Link route={`/campaigns/${this.props.address}`}>
          <a>
            <Button color='orange' style={{ marginTop: 10 }}>Back</Button>
          </a>
        </Link>
      </Layout>
    );
  }
}

export default RequestIndex;