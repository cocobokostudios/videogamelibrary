import LoginCommand from "../../../src/cli/commands/login";

// mock axios
import axios, { Axios, AxiosResponse } from "axios";
jest.mock("axios");
const mockAxios = axios as jest.Mocked<typeof axios>;

const AUTH_BASE_URL = `https://id.twitch.tv/oauth2/token`;

afterEach(()=> {
    jest.resetAllMocks();
});

describe("when an API request is sent", ()=> {
    it("requests it from the AUTH base URI with ClientID and ClientSecret query string parameters", async ()=> {
        // arrange
        const mockResponse = { data: "mock data" };

        mockAxios.post.mockImplementationOnce((url) => Promise.resolve(mockResponse));

        // act
        const clientId = "testClientId";
        const clientSecret = "testClientSecret";
        await LoginCommand(clientId, clientSecret);

        // assert
        const expectedRequestURL = `${AUTH_BASE_URL}?client_id=${clientId}&client_secret=${clientSecret}`;
        
        expect(mockAxios.post).toBeCalledTimes(1);
        expect(mockAxios.post).toBeCalledWith(expectedRequestURL);
    });
});

describe("when invalid parameters are passed", ()=> {
    it("throws an error on undefined parameters", async ()=> {
        // arrange
        mockAxios.post.mockImplementationOnce((url) => Promise.reject());

        // act
        const act = async ()=> {
            await LoginCommand(undefined, undefined);
        }
        
        // assert
        await expect(act).rejects.toThrowError(/invalid parameter\(s\)/);
        expect(mockAxios.post).not.toBeCalled();
    });

    it("throws an error on null parameters", async ()=> {
        // arrange
        mockAxios.post.mockImplementationOnce((url) => Promise.reject());

        // act
        const act = async ()=> {
            await LoginCommand(null, null);
        }
        
        // assert
        await expect(act).rejects.toThrowError(/invalid parameter\(s\)/);
        expect(mockAxios.post).not.toBeCalled();
    });

    it("throws an error on empty string parameters", async ()=> {
        // arrange
        mockAxios.post.mockImplementationOnce((url) => Promise.reject());

        // act
        const act = async ()=> {
            await LoginCommand("", "");
        }
        
        // assert
        await expect(act).rejects.toThrowError(/invalid parameter\(s\)/);
        expect(mockAxios.post).not.toBeCalled();
    });

    it("throws an error on whitespace only parameters", async ()=> {
        // arrange
        mockAxios.post.mockImplementationOnce((url) => Promise.reject());

        // act
        const act = async ()=> {
            await LoginCommand("  ", "  ");
        }
        
        // assert
        await expect(act).rejects.toThrowError(/invalid parameter\(s\)/);
        expect(mockAxios.post).not.toBeCalled();
    });
});


describe("when user fails login", ()=> {
    it("throws error with 'invalid client' message if returns with 400 status code", async ()=> {
        // arrange
        const invalidClientError = {
            response: {
                status: 400,
                data: {
                    status: 400,
                    message: "mock invalid client"
                },
                headers: []
            }
        };
        mockAxios.post.mockImplementationOnce((url)=> {
            return Promise.reject(invalidClientError);
        });

        // act
        const act = async ()=> {
            await LoginCommand("sampleId", "sampleSecret");
        }

        // assert
        await expect(act).rejects.toThrowError(/invalid client/i);
        expect(mockAxios.post).toBeCalledTimes(1);
    });

    it("throws error with unauthorized message if returns with 403 status code", async ()=> {
        // arrange
        const unauthorizedError = {
            response: {
                status: 403,
                data: {
                    status: 403,
                    message: "mock authorized"
                },
                headers: []
            }
        };
        mockAxios.post.mockImplementationOnce((url)=> {
            return Promise.reject(unauthorizedError);
        });

        // act
        const act = async ()=> {
            await LoginCommand("sampleId", "sampleSecret");
        }

        // assert
        await expect(act).rejects.toThrowError(/unauthorized/i);
        expect(mockAxios.post).toBeCalledTimes(1);
    });

    it("throws error 'server error' and status code if 5xx status code is returned", async ()=> {
        // arrange
        const serverErrorError = {
            response: {
                data: {
                    status: 500,
                    message: "mock server error"
                },
                status: 500,
                headers: []
            }
        }
        mockAxios.post.mockImplementationOnce((url)=> {
            return Promise.reject(serverErrorError);
        });

        // act
        const act = async ()=> {
            await LoginCommand("sampleId", "sampleSecret");
        }

        // assert
        await expect(act).rejects.toThrowError(/server error 500/i);
        expect(mockAxios.post).toBeCalledTimes(1);
    });

    it("throws 'unknown error' for unexpected error codes", async ()=> {
        // arrange
        const unknownErrorResponse = {
            response: {
                status: 499,
                data: {
                    status: 499,
                    message: "mock unknown error"
                },
                headers: []
            }
        }
        mockAxios.post.mockImplementationOnce((url)=> {
            return Promise.reject(unknownErrorResponse);
        });

        // act
        const act = async ()=> {
            await LoginCommand("sampleId", "sampleKey");
        }

        // assert
        await expect(act).rejects.toThrowError(/unknown error 499/i);
        expect(mockAxios.post).toBeCalledTimes(1);
    });

    it("throws error with 'could not reach server' message if no response is received", async ()=> {
        // arrange
        const timeoutError = {
            request: "axios timeout errors have request property"
        }
        mockAxios.post.mockImplementationOnce((url)=> {
            return Promise.reject(timeoutError);
        });

        // act
        const act = async ()=> {
            await LoginCommand("sampleId", "sampleSecret");
        };

        // assert
        await expect(act).rejects.toThrowError(/no response from server/i);
        expect(mockAxios.post).toBeCalledTimes(1);
    });
});

describe("when API call succeeds", ()=> {
    it.todo("greets the user with their username");
    it.todo("saves the access_token in the config");
});