import axios from "axios";
import React, {useState, useEffect} from "react";
import { render, Text, Box } from "ink";

const LOGIN_BASEURL = `https://id.twitch.tv/oauth2/token`

const generateParameterErrorMessage = (clientId: string, clientKey: string):string => {
    let message : string = "invalid parameter(s):"
    
    if(!clientId || clientId.trim().length === 0) {
        message = message.concat(` clientId = ${clientId}`);
    }
    if(!clientKey || clientId.trim().length === 0) {
        message = message.concat(` clientKey = ${clientKey}`);
    }

    return message;
};

export interface ILoginResult {
    message: string
    data?: object
}

export interface ILoginProps { 
    clientID: string;
    clientSecret: string;
}

export const Login = async (clientId: string, clientKey: string) : Promise<ILoginResult> => {
    const REQUEST_URL = `${LOGIN_BASEURL}?client_id=${clientId}&client_secret=${clientKey}&grant_type=client_credentials`;
    let result : ILoginResult = {
        message: "Login Failed",
    }

    if(!clientId || !clientKey || !clientId.trim() || !clientKey.trim() ) {
        throw new Error(generateParameterErrorMessage(clientId, clientKey));
    }
    else {
        try {
            const response = await axios.post(REQUEST_URL);
            result = {
                message: "Login Successful",
                data: response.data
            };
        } catch (error) {
            // if received response
            if(error.response) {
                // check 400, 403, 5xx, other
                if(error.response.status === 400) {
                    throw new Error(`Invalid Client with client_id=${clientId}`);
                }
                else if(error.response.status === 403) {
                    throw new Error(`Unauthorized`);
                }
                else if(error.response.status > 499 && error.response.status < 600) {
                    throw new Error(`Server Error ${error.response.status}`);
                }
                else {
                    throw new Error(`Unknown Error ${error.response.status}`);
                }
            }
            // if request property, then axios did not receive a response
            else if(error.request) {
                throw new Error(`No response from server`);
            }
        }
    }

    return new Promise<ILoginResult>((resolve)=>{
        resolve(result);
    });
};

const LoginOutput = (props: ILoginProps) => {
    const [result, setResult] = useState<ILoginResult>({ message: "Pending" });

    useEffect(() => {
        const doLogin = async () => {
            const loginResult: ILoginResult  = await Login(props.clientID, props.clientSecret);
            setResult(loginResult);
        };
        
        doLogin();
    }, []);

    return (
        <Box width="100%" 
            flexDirection={"column"} 
            alignItems={"flex-start"} 
            justifyContent={"center"} 
            borderStyle="double" 
            borderColor={"green"} 
            paddingLeft={2}
            >
            <Text>Login Status: {result.message}</Text>
        </Box>
    )
}

export const LoginCommand = async (input: readonly string[]) => {
    if(input.length < 2) {
        console.log("Not enough parameters");
    }
    else {
        render(<LoginOutput clientID={input[0]} clientSecret={input[1]} />);
        //console.log(await Login(input[0], input[1]));
    }
};

