import React, {Component} from "react";
import { Table, Button } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import HOA from "../ethereum/hoa";


class RequestRow extends Component {
    onApprove = async () => {
        const hoa = HOA(this.props.address);
        const accounts = await web3.eth.getAccounts();
        await hoa.methods.approveRequest(this.props.id)
            .send({
                from: accounts[0]
            });
    };

    onFinalize = async() => {
        const hoa = HOA(this.props.address);
        const accounts = await web3.eth.getAccounts();
        await hoa.methods.finalizeRequest(this.props.id)
            .send({
                from: accounts[0]
            });
    };
    render(){
        const {Row, Cell } = Table;
        const {id, request, approversCount} = this.props;
        const readyToFinalize = request.approvalCount > approversCount / 2;
        console.log("approvers count: ", approversCount);
        return (<Row disabled = {request.complete} positive={readyToFinalize}>
            <Cell>{id}</Cell>    
            <Cell>{request.description}</Cell>
            <Cell>{web3.utils.fromWei(request.value, "ether")}</Cell>
            <Cell>{request.recipient}</Cell>
            <Cell>{request.approvalCount}/{approversCount}</Cell>
            <Cell>
                {request.complete ? null:
                <Button color="green" basic onClick = {this.onApprove}> 
                    Approve 
                </Button>
                }
            </Cell>
            <Cell>
                {request.complete ? null:(
                <Button color="teal" basic onClick = {this.onFinalize}> 
                    Finalize
                </Button>)
                }
            </Cell>
            <Cell>

            </Cell>

        </Row>);
    }
}

export default RequestRow;