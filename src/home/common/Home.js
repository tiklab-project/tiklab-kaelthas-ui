import React from "react";
import {UserVerify} from "thoughtware-eam-ui";
import {AppLink,HelpLink,AvatarLink} from "thoughtware-licence-ui";
import HomeLayout from "./HomeLayout";

const Home = props => {
    return  <HomeLayout
        {...props}
        AppLink={<AppLink/>}
        HelpLink={<HelpLink/>}
        AvatarLink={<AvatarLink {...props}/>}
    />
}

export default UserVerify(Home,"/no-auth")
