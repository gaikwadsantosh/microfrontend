import React from "react";
const Button = React.lazy(()=> import('MicroFrontend/Button'))

export default function App(){
    return (
        <div>
            ShellApplication
            <br></br>
            <br></br>
            <Button buttonName={"click here in Remote MFA"}/>
        </div>
    )
}