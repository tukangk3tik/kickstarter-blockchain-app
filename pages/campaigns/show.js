import React, { Component } from "react";
import Layout from "../../components/Layout";
import Campaign from '../../ethereum/campaign';
import { Button, Card, Grid } from "semantic-ui-react";
import web3 from '../../ethereum/web3';
import ContributeForm from "../../components/ContributeForm";
import { Link } from '../../routes';

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);
    const summary = await campaign.methods.getSummary().call();
  
    return {
      address: props.query.address,
      minimumContribution: parseInt(summary['0']),
      balance: parseInt(summary['1']),
      requetsCount: parseInt(summary['2']),
      approversCount: parseInt(summary['3']),
      manager: summary['4'],
    };
  }

  renderCards() {
    const {
      balance,
      manager,
      minimumContribution,
      requetsCount,
      approversCount
    } = this.props;

    const items = [
      {
        header: manager,
        meta: 'Address of Manager',
        description: 'The manager created this campaign and create requests to withdray money',
        style: { overflowWrap: 'break-word'}
      },
      {
        header: minimumContribution,
        meta: 'Minimum Contribution (wei)',
        description: 'You must contribute at least this much wei to become an approver',
      },
      {
        header: requetsCount,
        meta: 'Number of Requests',
        description: 'A request tries to withdraw money from the contract. Request must be approved by approvers',
      }, 
      {
        header: approversCount,
        meta: 'Number of Approvers',
        description: 'Number of people who have already donated to this campaign',
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Campaign Balance (ether)',
        description: 'This balance is how much money this campaign has left to spend'
      }
    ];

    return <Card.Group items={items} />;
  }
  
  render() {
    return (
      <Layout>
        <h3>Campaign Show</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
              {this.renderCards()}
            </Grid.Column>

            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${this.props.address}/requests`}>
                <a>
                  <Button primary>View Request</Button>
                </a>
              </Link>
              &nbsp; &nbsp;
              <Link route={`/`}>
                <a>
                  <Button color='orange'>Back</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;