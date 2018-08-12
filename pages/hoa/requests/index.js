import React, {Component} from "react";
import Layout from "../../../components/Layout";
import {Button, Table} from "semantic-ui-react";
import {Link} from "../../../routes";
import HOA from "../../../ethereum/hoa";
import RequestRow from "../../../components/RequestRow";
import { request } from "https";

class RequestIndex extends Component{
    static async getInitialProps(props){
        const {address} = props.query;
        const hoa = HOA(address);
        const requestCount = parseInt(await hoa.methods.getRequestCount().call());
        const approversCount = await hoa.methods.approversCount().call();

        const requests = await Promise.all(
            Array(requestCount).fill().map((Element, index) => {
                return hoa.methods.requests(index).call();
            })
        );
        return {address, requests, requestCount, approversCount};
    }

    renderRows(){
        return this.props.requests.map((request, index) =>{
            return (
                <RequestRow 
                    id = {index}
                    request = {request}
                    key={index}
                    address={this.props.address}
                    approversCount={this.props.approversCount}
                />);
        });
    }
    render(){
        const {Header, HeaderCell, Row, Body} = Table;
        return (
            <Layout>
                <h1> All Requests of this HOA</h1>
                <h3> The approval and finalization status of all spending
                    requests published by the manager of this HOA</h3>
                <Link route={`/hoa/${this.props.address}/requests/new`}>
                    <a>
                        <Button 
                            primary 
                            floated="right" 
                            style={{marginBottom: 10}}> 
                                Add Request 
                        </Button>
                    </a>
                </Link>
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell> ID </HeaderCell>
                            <HeaderCell> Description </HeaderCell>
                            <HeaderCell> Amount</HeaderCell>
                            <HeaderCell> Recipient</HeaderCell>
                            <HeaderCell> Approval</HeaderCell>
                            <HeaderCell> Approve</HeaderCell>
                            <HeaderCell> Finalize</HeaderCell>
                        </Row>
                    </Header>
                    {this.renderRows()}
                </Table>
                <div> Fount {this.props.requestCount} requests </div>
            </Layout>
        )

    }
}

export default RequestIndex;