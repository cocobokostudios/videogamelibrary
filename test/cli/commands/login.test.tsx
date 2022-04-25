import { Login, LoginCommand, LoginOutput } from "../../../src/cli/commands/login";

import React from "react";
import { render } from "ink-testing-library";
import { waitFor } from "@testing-library/react";


// mock axios
import axios, { Axios, AxiosResponse } from "axios";
import { waitForDebugger } from "inspector";
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
        await Login(clientId, clientSecret);

        // assert
        const expectedRequestURL = `${AUTH_BASE_URL}?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`;
        
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
            await Login(undefined, undefined);
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
            await Login(null, null);
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
            await Login("", "");
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
            await Login("  ", "  ");
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
            await Login("sampleId", "sampleSecret");
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
            await Login("sampleId", "sampleSecret");
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
            await Login("sampleId", "sampleSecret");
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
            await Login("sampleId", "sampleKey");
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
            await Login("sampleId", "sampleSecret");
        };

        // assert
        await expect(act).rejects.toThrowError(/no response from server/i);
        expect(mockAxios.post).toBeCalledTimes(1);
    });
});

describe("when API call succeeds", ()=> {
    it("returns a success message", async ()=> {
        // arrange
        const successData = {
            "access_token": "fakeToken",
            "expires_in": 123456789,
            "token_type": "fake"
        }
        const successResponse = {
            data: successData,
            status: 200,
            statusText: "OK",
            headers: {},
            config: {}
        }
        mockAxios.post.mockImplementationOnce((url)=> {
            return Promise.resolve(successResponse);
        });

        // act
        const actual = await Login("client", "secret");

        // assert
        const expected = {
            message: "Login Successful",
            data: successData
        };
        expect(actual).toEqual(expected);
        expect(mockAxios.post).toBeCalledTimes(1);
    });
});

describe("LoginOutput", ()=> {
    it("initializes with a pending message", ()=> {
        // arrange
        // act
        const { frames } = render(<LoginOutput clientID="fakeID" clientSecret="fakeSecret" />);

        // assert
        expect(frames[0]).toMatch(/pending/i);
    });

    /*
        TODO: Test changes to LoginOutput
            - Unable to test changes made using the useEffect hook
            - Likely a better way structure the component to make state changes more testable
    */
});

describe("LoginCommand", ()=> {
    it("outputs error to console.error if less than 2 parameters are provided", ()=> {
        // arrange
        const spy = jest.spyOn(console, "error").mockImplementationOnce(jest.fn());

        // act
        const invalidInput : string[] = ["1"];
        LoginCommand(invalidInput);

        // assert
        expect(spy).toBeCalledTimes(1);
        expect(spy).toBeCalledWith(expect.stringMatching(/not enough parameters/i));
    });
});