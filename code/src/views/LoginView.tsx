import { Button, FloatingLabel, Form, InputGroup } from "react-bootstrap";
import axios from "../api/axios.ts"
import { URLS } from '../api/constants.ts';
import { FormEvent, useRef, useState } from "react";
import User from "../models/User.tsx"
import { useNavigate } from 'react-router-dom';


export default function Login() {

    const [emailRef, passwordRef] = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)]
    const navigate = useNavigate()

    async function authenticateUser(): Promise<Array<any>> {
        let [email, password] = [emailRef.current?.value, passwordRef.current?.value]
        let json = {username: email, password}

        try {
            let response = await axios.post(URLS.AUTH_USER, json)
            const {access, refresh} = response.data
            localStorage.setItem("access_token", access)
            localStorage.setItem("refresh_token", refresh)
            console.log(response.data)
            return [access, refresh]
        } catch (err) {
            throw Error()
        }
        
    }

    async function fetchUserDetails() {
        try {
            let response = await axios.get(URLS.USERS)
            return response.data
        } catch (err) {
            throw Error()
        }
    }

    async function login(event: FormEvent) {
        event.preventDefault()
        try {
            await authenticateUser()
            let user: User = await fetchUserDetails()
            console.log(user)
            alert("Welcome back " + user.username)
            localStorage.setItem("user", JSON.stringify(user))
            navigate("/")
        } catch (err) {
            alert("Login failed. Please try again!")
        }    
        console.log(emailRef.current?.value)
    }

    return (
        <>
            <div className="m-5 p-4 text-center">
                <h1><b>Login</b></h1>
                <div className="m-5 p-5">
                    <Form onSubmit={(e) => login(e)}>
                        <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                            <Form.Control ref={emailRef} type="email" placeholder="name@example.com"/>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingPassword" label="Password">
                            <Form.Control ref={passwordRef} type="password" placeholder="Password"/>
                        </FloatingLabel>
                        <Button className="mt-5" variant="primary" type="submit">
                            Login
                        </Button>
                    </Form>
                </div>
            </div>
        </>
    )
}