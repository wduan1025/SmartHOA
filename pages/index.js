import React, { Component } from "react";
import {
    Button,
    Container,
    Icon
} from "semantic-ui-react"
import { Link } from "../routes";
import Head from "next/head";


class HoaShow extends Component {
    onDownload = ()=>{
        window.open( "http://metamask.io", '_blank');
    }
    render() {
        const imgUrl = "homepage.jpeg";
        const headerFontSize = "4em";
        const featuresFontSize = "2em";
        const hintFontSize = "1em";
        const featuresMarginTop = "0.5em";
        const buttonDist = "5px";
        return (
            <Container style={{
                textAlign: "center",
                color: "white"
            }}>
                <Head>
                    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css"></link>
                    <style>{'body { background-color: black; }'}</style>
                </Head>
                <h1 style={{
                    fontSize: headerFontSize,
                    fontWeight: "normal",
                    marginBottom: 0,
                    marginTop: "3em",
                }}>{"Your Smart Home Owner Associate"}
                </h1>
                <h3 style={{
                    fontSize: featuresFontSize,
                    fontWeight: "normal",
                    marginTop: featuresMarginTop,
                    textAlign: "center"
                }}>{"Decentralized HOA Tool"}
                </h3>
                <h3 style={{
                    fontSize: featuresFontSize,
                    fontWeight: "normal",
                    marginTop: featuresMarginTop,
                    textAlign: "center"
                }}>{"Make every HOA spending visible"}
                </h3>
                <h3 style={{
                    fontSize: featuresFontSize,
                    fontWeight: "normal",
                    marginTop: featuresMarginTop,
                    textAlign: "center"
                }}>{"Democratic Neighborhood Facility Management"}
                </h3>
                <div style={{ textAlign: "center" }}>
                    <Link route={"/hoas"}>
                        <Button primary size="huge" style={{ align: "center" }}>
                            Get Started
                        <Icon name="right arrow" />
                        </Button>
                    </Link>
                </div>
                <h4 style={{
                    fontSize: hintFontSize,
                    fontWeight: "normal",
                    marginTop: featuresMarginTop,
                    textAlign: "center"
                }}>{"You need metamask to interact with HOAs"}
                </h4>
                <div style={{ textAlign: "center" }}>
                    <Button primary
                        size="huge"
                        style={{
                            align: "center",
                            marginTop: buttonDist
                        }}
                        onClick={this.onDownload}>
                        Download Metamask
                    </Button>
                </div>
            </Container>
        );
    }
}

export default HoaShow;