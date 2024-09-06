import { useRef, } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import axios from "../api/axios"
import { URLS } from "../api/constants"
import { useParams } from "react-router-dom";

export default function RegisterView() {

    const [firstNameRef, lastNameRef, emailRef, usernameRef, passwordRef] = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)]

    async function postData() {
        let [first_name, last_name, email, username, password] = [usernameRef.current?.value, lastNameRef.current?.value, emailRef.current?.value, usernameRef.current?.value, passwordRef.current?.value]
        let json = {first_name, last_name, email, username, password}
        console.log(json)
        let response = await axios.post(URLS.REGISTER_USER, json)
        return response.data
    }

    return (
        <>
            <div className="m-5 p-4">
                <h1 className="text-center"><b>Register</b></h1>
                <div className="m-5 p-5">
                    <Form>
                        <Form.Group className="mb-5">
                            <Form.Label>Name</Form.Label>
                            <InputGroup className="mb-5">
                                <InputGroup.Text>First Name</InputGroup.Text>
                                <Form.Control ref={firstNameRef} aria-label="First name" />
                                <InputGroup.Text>Last Name</InputGroup.Text>
                                <Form.Control ref={lastNameRef} aria-label="Last name" />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="mb-5" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control ref={emailRef} type="email" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group className="mb-5" controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control ref={usernameRef} type="username" placeholder="Enter username" />
                        </Form.Group>
                        <Form.Group className="mb-5" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control ref={passwordRef} type="password" placeholder="Enter password" />
                        </Form.Group>
                        <div className="text-center">
                            <Button className="text-center" variant="primary" type="submit" onClick={postData}>
                                Submit
                            </Button>
                        </div>
                        
                    </Form>
                </div>
            </div>
        </>
    )
}