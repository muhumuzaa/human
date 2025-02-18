import AuthContext from '../AuthContext'
import { MemoryRouter } from 'react-router-dom'
import { render, screen, waitFor } from "@testing-library/react";
import Settings from '../Settings'
import userEvent from "@testing-library/user-event";
import { describe, test, expect } from '@jest/globals';


//helper function to render the component with necessary providers

const renderSettings = (userValue) => {


    return render(
        <AuthContext.Provider value = {{user: userValue}}>
            <MemoryRouter>
                <Settings />
            </MemoryRouter>
        </AuthContext.Provider>
    );
}

describe('Settings Component', () =>{
    const fakeUser = {_id: '123', role: 'employer'};


    test("shows error if new and confirm password do not match", async () =>{

        renderSettings(fakeUser);

        //get input fields by their labels
        const newPasswordInput = screen.getByLabelText(/New Password/i);
        const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i);

        //Type different values into new and confirm password fields
        await userEvent.type(newPasswordInput, "password1");
        await userEvent.type(confirmPasswordInput, "password2")

        //wait for the error message to appear
        await waitFor(() =>{
            expect(screen.getByText(/passwords dont match/i)).toBeInTheDocument();
        })
    }
)
})