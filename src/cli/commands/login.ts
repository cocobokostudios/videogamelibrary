import axios from "axios";
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
    const REQUEST_URL = `${LOGIN_BASEURL}?client_id=${clientId}&client_secret=${clientKey}`;

    if(!clientId || !clientKey || !clientId.trim() || !clientKey.trim() ) {
        throw new Error(generateParameterErrorMessage(clientId, clientKey));
    }
    else {
        const response = await axios.post(REQUEST_URL);
        return response.data;
    }
};
export default LoginCommand;