import axios, { Axios, AxiosError } from "axios";
import { resolve } from "path";
import { string } from "yargs";

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

const LoginCommand = async (clientId: string, clientKey: string) => {
    const REQUEST_URL = `${LOGIN_BASEURL}?client_id=${clientId}&client_secret=${clientKey}&grant_type=client_credentials`;

    if(!clientId || !clientKey || !clientId.trim() || !clientKey.trim() ) {
        throw new Error(generateParameterErrorMessage(clientId, clientKey));
    }
    else {
        try {
            const response = await axios.post(REQUEST_URL);
            return Promise.resolve({
                message: `Login Successful`,
                data: response.data
            });

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
};
export default LoginCommand;