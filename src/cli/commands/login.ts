import axios from "axios";
import yargs, { Arguments, CommandBuilder, CommandModule, Options } from "yargs";

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

export class LoginCommand implements CommandModule {
    commmand: string = "login";

    description: string = "Login to IGDB";

    builder: CommandBuilder = (yargs) => {
        return yargs.options({
            clientID: { type: 'string', demand: true },
            clientSecret: { type: 'string', demand: true }
        });
    }

    async handler(argv: Arguments<Options>) : Promise<void> {
        const { clientID, clientSecret } = argv;
        try {
            const loginResult = await Login(clientID as string, clientSecret as string);
            console.log(loginResult.message);
        } catch (error) {
            console.error(error);
        }        
    }
}
