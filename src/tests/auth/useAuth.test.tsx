import { render, screen } from "@testing-library/react";
import { AuthContext } from "../../auth/AuthContext"; 
import { useAuth } from "../../auth/useAuth";
import "@testing-library/jest-dom";

const TestComponent = () => {
    const auth = useAuth();
    return <div>{auth.user ? auth.user.name : "No user"}</div>;
};

describe("useAuth hook", () => {
    it("returns context value", () => {
        const mockAuthValue = {
            user: { id: "1", name: "John Doe", lastName: "Doe", birthdate: "1990-01-01", email: "john.doe@example.com", isAdmin: false },
            login: jest.fn(),
            logout: jest.fn(),
            token: "test_token", 
        };
  
        render(
            <AuthContext.Provider value={mockAuthValue}>
                <TestComponent />
            </AuthContext.Provider>
        );
  
        expect(screen.getByText("John Doe")).toBeInTheDocument();
    });
});