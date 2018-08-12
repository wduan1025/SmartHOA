import React, {Component} from "react";
import factory from "../ethereum/factory";
import {Card, Button} from "semantic-ui-react";
import Layout from "../components/Layout";
import { Link } from "../routes";

class HOAIndex extends Component {
    static async getInitialProps(){
        const hoas = await factory.methods.getDeployedHOA().call();
        return {hoas};
    }

    renderHOAs(){
        const items = this.props["hoas"].map((address, id) =>{
            return {
                id:id,
                title: address,
                description: (
                    <div>
                        <p>{this.props["hoas"][id]}</p>
                        <Link route={`/hoa/${address}`}>
                            <a>View Detail</a>
                        </Link>
                    </div>
                ),
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
                <Link route="hoa/new">
                    <a>
                        <Button 
                        floated="right"
                        content = "Create HOA"
                        icon="add circle"
                        primary={true}>
                        </Button>
                    </a>
                </Link>
                {this.renderHOAs()}
            </div>
        </Layout>
        );
    }
}

export default HOAIndex;