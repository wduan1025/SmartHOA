import React, {Component} from "react";
import Layout from "../../components/Layout";
import hoa from "../../ethereum/hoa";
import {Grid, Card, Button, GridColumn } from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributerForm";
import  {Link} from "../../routes";

class HoaShow extends Component {
    static async getInitialProps(props){
        const address = props.query.address;
        const currentHOA = hoa(address);
        const summary = await currentHOA.methods.getSummary().call();
        console.log(summary);
        return {
            address: address,
            minimumContribution: summary[0],
            balance:summary[1],
            requestsCount:summary[2],
            approversCount:summary[3],
            manager:summary[4],
            hoaName: summary[5]
        };
    }
    renderCards() {
        const {
            balance,
            manager,
            minimumContribution,
            requestsCount,
            approversCount,
            hoaName
        } = this.props;

        const items = [
            {
                header: hoaName,
                meta: "Brief Introduction",
                description: "The main purpose of this HOA",
                style: {overflowWrap: "break-word"}
            },
            {
                header: manager,
                meta: "Address of Manager",
                description: "The manager who creates this HOA",
                style: {overflowWrap: "break-word"}
            },
            {
                header: minimumContribution,
                meta: "Minimum Contribution(wei)",
                description: "Contribute no lower than this amount",
                style: {overflowWrap: "break-word"}
            },
            {
                header: requestsCount,
                meta: "Number of requests",
                description: "A request tries to withdraw money rom the contract"
                    + "Requests must be approved by approvers",
                style: {overflowWrap: "break-word"}
            },
            {
                header: approversCount,
                meta: "Number of Approvers",
                description: "Number of people who have already donated to this HOA",
                style: {overflowWrap: "break-word"}
            },
            {
                header: web3.utils.fromWei(balance, "ether"),
                meta: "Balance: (ethereum)",
                description: "How much money this HOA has raised"
            }
        ];
        return <Card.Group items={items} />;
    }
    render (){
    return (
            <Layout>
                <h3> HOA Detail</h3>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            {this.renderCards()}
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <ContributeForm address = {this.props.address}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Link route={`/hoa/${this.props.address}/requests`}>
                                <a>
                                    <Button primary>View Requests</Button>
                                </a>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Layout>
        );
    }
}

export default HoaShow;