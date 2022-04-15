import LoginCommand from "../../../src/cli/commands/login";

// mock axios
import axios, { Axios, AxiosResponse } from "axios";
jest.mock("axios");
const mockAxios = axios as jest.Mocked<typeof axios>;

const AUTH_BASE_URL = `https://id.twitch.tv/oauth2/token`;

afterEach(()=> {
    jest.clearAllMocks();
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


describe("when user is not authenticated", ()=> {
    it.todo("displays the HTTP error code and logs the error");
});

describe("when API call succeeds", ()=> {
    it.todo("greets the user with their username");
    it.todo("saves the access_token in the config");
});