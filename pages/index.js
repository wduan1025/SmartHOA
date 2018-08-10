import React, {Component} from "react";
import factory from "../ethereum/factory";
import {Card, Button} from "semantic-ui-react";
import Layout from "../components/Layout";
class HOAIndex extends Component {
    static async getInitialProps(){
        const hoas = await factory.methods.getDeployedHOA().call();
        return {hoas};
    }

    renderHOAs(){
        const items = this.props["hoas"].map(address =>{
            return {
                title: address,
                description: <a>View Detail</a>,
                address: address,
                fluid: true
            };
        });
        return <Card.Group items={items} />
    }
    render(){
        return (
        <Layout>
            <div>
                <h3>Open HOAs</h3>
                {this.renderHOAs()}
                <Button 
                    floated="right"
                    content = "Create HOA"
                    icon="add circle"
                    primary={true}>
                </Button>
            </div>
        </Layout>
        );
    }
}

export default HOAIndex;