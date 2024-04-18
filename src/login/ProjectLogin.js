import React from "react";
import {Login} from 'thoughtware-eam-ui'


const ProjectLogin = (props) => {
    
    return (
        <Login 
            {...props}
            loginGoRouter={'/'}
            vaildUserAuthRouter = {'/no-auth'}
            title = {'xmonitor'}
        />
    )
}
export default ProjectLogin;