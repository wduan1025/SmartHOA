import React, {Component } from "react";
import Layout from "../../components/Layout";
import {Form, Input, Button, Message} from "semantic-ui-react";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
class HoaNew extends Component {
    state = {
        minimumContribution: "",
        maximumContribution: "",
        errorMessage: "",
        loading: false
    }

    onSubmit = async (event)=>{
        this.setState({loading: true, errorMessage: ""});
        event.preventDefault();
        try {
            let maximum;
            let minimum;
            minimum = parseFloat(this.state.minimumContribution);
            maximum = parseFloat(this.state.maximumContribution);
            console.log(minimum);
            console.log(maximum);
            if(maximum < 0){
                console.log("error");
                throw "Max value must be positive";
            }
            console.log("sending user confirmation");
            const accounts = await web3.eth.getAccounts();
            await factory.methods
                .createHOA(
                    minimum,
                    maximum
                )
                .send({
                    from: accounts[0]
                });
        } catch(err) {
            this.setState({errorMessage: err.message});
        }
        this.setState({loading: false});
    };
    render() {
        return (
            <Layout>
                <h1> Create HOA </h1>
                <Form error = {this.state.errorMessage} onSubmit = {this.onSubmit}>
                    <Form.Field>
                        <label> Minimum Contribution </label>
                        <Input 
                            label="wei" 
                            labelPosition="right"
                            value={this.state.minimumContribution}
                            onChange={event=>
                                this.setState({minimumContribution: event.target.value})}/>
                    </Form.Field>
                    <Form.Field>
                        <label> Maximum Contribution </label>
                        <Input 
                            label="wei" 
                            labelPosition="right"
                            value={this.state.maximumContribution}
                            onChange={event=>
                                this.setState({maximumContribution: event.target.value})}/>
                    </Form.Field>
                    <Message error header="Oops!" content={this.state.errorMessage} />

                    <Button loading={this.state.loading} primary> Create! </Button>
                </Form>
            </Layout>
        )
    }
}

export default HoaNew;