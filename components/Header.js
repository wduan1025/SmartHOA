import React from "react";
import {Menu} from "semantic-ui-react";
import  {Link} from "../routes";

export default () => {
    return (
        <Menu style={{ marginTop: "10px"}}>
            <Link route="/">
                <a className="item"> Smart HOA </a>
            </Link>
            <Menu.Menu position="right">
                <Link route="/hoas">
                    <a className="item"> Find </a>
                </Link>
            </Menu.Menu>
        </Menu>
    );
}