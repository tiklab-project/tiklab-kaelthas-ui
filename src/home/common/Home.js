import React from "react";
import {UserVerify} from "thoughtware-eam-ui";
import {AppLink,HelpLink,AvatarLink} from "thoughtware-licence-ui";
import HomeLayout from "../../common/layout/HomeLayout";

const Home = props => {
    return  <HomeLayout
        {...props}
        AppLink={AppLink}
        HelpLink={HelpLink}
        AvatarLink={AvatarLink}
    />
}

export default UserVerify(Home,"/no-auth")
