import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  "<REPLACE_WITH_DEPLOYED_CAMPAIGN_FACTORY_ADDRESS>"
);

export default instance;