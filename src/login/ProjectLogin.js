import React from "react";
import {Login} from 'tiklab-eam-ui'


const ProjectLogin = (props) => {
    
    return (
        <Login 
            {...props}
            loginGoRouter={'/'}
            vaildUserAuthRouter = {'/no-auth'}
            bgroup = {'kaelthas'}
        />
    )
}
export default ProjectLogin;