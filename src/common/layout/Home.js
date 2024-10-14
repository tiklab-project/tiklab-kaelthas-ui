import React from "react";
import {UserVerify} from "tiklab-eam-ui";
import {AppLink,HelpLink,AvatarLink} from "tiklab-licence-ui";
import HomeLayout from "./HomeLayout";

const Home = props => {
    return  <HomeLayout
        {...props}
        AppLink={AppLink}
        HelpLink={HelpLink}
        AvatarLink={AvatarLink}
    />
}

export default UserVerify(Home,"/no-auth")
