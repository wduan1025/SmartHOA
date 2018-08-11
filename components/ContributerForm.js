import React , {Component} from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";
import HOA from "../ethereum/hoa";
import web3 from "../ethereum/web3";
import {Router} from "../routes";

class ContributeForm extends Component {
    state = {
        value: "",
        errorMessage: "",
        loading:false
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const hoa = HOA(this.props.address);
        this.setState({loading:true, errorMessage: ""});
        try{
            const accounts = await web3.eth.getAccounts();
            await hoa.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, "ether")
            });
            Router.replaceRoute(`/hoa/${this.props.address}`);
        } catch(err) {
            this.setState({errorMessage:err.message});
        }
        this.setState({loading: false, value:""});
    }
    render(){
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label>Amount to Contribute</label>
                    <Input 
                        label="ETH" 
                        labelPosition="right"
                        onChange = {event => this.setState({value:event.target.value})}
                        value = {this.state.value}
                    />
                </Form.Field>
                <Message error header="Oops!" content = {this.state.errorMessage}/>
                <Button primary loading={this.state.loading}>
                    Contribute!
                </Button>
            </Form>
        );
    }
}

export default ContributeForm;