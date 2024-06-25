import { act, render } from "@testing-library/react";
import { AuthProvider, AuthContext } from "../../auth/AuthContext";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import axios from "axios";

jest.mock("axios");
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => jest.fn(),
    useLocation: () => ({ pathname: "/" }),
}));

const mockAxiosPost = axios.post as jest.MockedFunction<typeof axios.post>;
const mockAxiosGet = axios.get as jest.MockedFunction<typeof axios.get>;

describe("AuthProvider", () => {
    beforeEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
    });

    it("initializes with no user token", () => {
        const { getByText } = render(
            <BrowserRouter>
                <AuthProvider>
                    <AuthContext.Consumer>{({ token }) => <span>Token: {token}</span>}</AuthContext.Consumer>
                </AuthProvider>
            </BrowserRouter>,
        );

        expect(getByText("Token:")).toBeInTheDocument();
    });

    it("performs login and sets token", async () => {
        const mockLoginResponse = { status: 200, data: { authorization: "fakeToken" } };
        mockAxiosGet.mockResolvedValue(mockLoginResponse);
        mockAxiosPost.mockResolvedValue(mockLoginResponse);

        let loginFunction: (_email: string, _password: string) => void;
        render(
            <BrowserRouter>
                <AuthProvider>
                    <AuthContext.Consumer>
                        {({ login }) => {
                            loginFunction = login;
                            return null;
                        }}
                    </AuthContext.Consumer>
                </AuthProvider>
            </BrowserRouter>,
        );

        await act(async () => {
            await loginFunction("test@example.com", "password");
        });

        expect(localStorage["token"]).toBe("fakeToken");
        expect(axios.defaults.headers.common.Authorization).toBe("Bearer fakeToken");
    });

    it("clears token on logout", async () => {
        localStorage["token"] = "initialToken";
        let logoutFunction: () => void;
        render(
            <BrowserRouter>
                <AuthProvider>
                    <AuthContext.Consumer>
                        {({ logout }) => {
                            logoutFunction = logout;
                            return null;
                        }}
                    </AuthContext.Consumer>
                </AuthProvider>
            </BrowserRouter>,
        );

        await act(async () => {
            logoutFunction();
        });

        expect(localStorage["token"]).toBeUndefined();
        expect(axios.defaults.headers.common.Authorization).toBe("");
    });
});