'use client';
import { Inter } from 'next/font/google';
import styled from 'styled-components';
import { FavlistService } from '../api/favlist';

const inter = Inter({ subsets: ['latin'] })

const Main = styled.main`
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    height: 22rem;
    width: 25rem;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    border-radius: 10px;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
`;

const Input = styled.input`
    height: 1.8rem;
    width: 15rem;
    border: 2px solid #131A22;
    border-radius: 4px;

    &:focus {
        outline: 1px solid #131A22;
    }
`;

const Button = styled.button`
    color: white;
    font-size: 16px;
    background-color: #131A22;
    height: 2.5rem;
    width: 5rem;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 1rem;

    &:active {
        outline: 2px solid #131A22;
        outline-offset: 1px;
    }
`;

export default function Login() {
    const favlistService = new FavlistService();

    /**
     * 
     */
    const handleSubmit = (event: any) => {
        event.preventDefault();
        const variables = {
            email: event.target.email.value,
            password: event.target.password.value
        };

        favlistService.mutateLogin(variables);     
    }

    return (
        <Main className={inter.className}>
            <Form onSubmit={handleSubmit}>
                <h1>Pokemon Favlist</h1>
                <FormGroup>
                    <label htmlFor="email">Email</label>
                    <Input id="email" type="email" name="email" required/>
                </FormGroup>
                <FormGroup>
                    <label htmlFor="password">Password</label>
                    <Input id="password" type="password" name="password" required/>
                </FormGroup>
                <FormGroup>
                    <Button type="submit">Login</Button>
                </FormGroup>
            </Form>
        </Main>
    )
}