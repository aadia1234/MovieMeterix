import {  CSSProperties, ForwardedRef, MutableRefObject, useEffect, useRef, useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from '../api/axios.js';
import { Alert, Image, Container, Form, NavDropdown, Navbar, Nav, Button } from "react-bootstrap"
import { URLS } from '../api/constants.js';
import User from '../models/User.js';

export default function NavBar() {

    const [categories, setCategories] = useState([{id: -1, name: "DEFAULT"}]);
    const [user, setUser] = useState<User | null>(null)
    const navigate = useNavigate()

    

    useEffect(() => {
        axios.get(URLS.CATEGORIES)
        .then((response) => setCategories(response.data))
        .catch((error) => console.log(error))
    }, [])

    useEffect(() => {
        // Fetch user details from localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      }, []);

    function navCategories() {
        return (
            categories.map((category) => {
                return <NavDropdown.Item key={category.id} href={URLS.CATEGORY + category.id}>{category.name}</NavDropdown.Item>
            })
        );
    }

    function logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem("user");
        alert('Logged out successfully');
        
        navigate("/")
    }

    return (
        <>
            <style>{".autocomplete-menu { margin-top: 37px; }"}</style>
            {/* need to fix variant to data-bs-theme */}
            <Navbar sticky="top" bg="primary" expand="lg" variant="dark"> 
                <Container fluid>
                    <Navbar.Brand href="/">MovieMeterix</Navbar.Brand>
                    <Navbar.Toggle aria-controls="blog-navbar"/>
                    <Navbar.Collapse className="navbar-collapse" id="blog-navbar">
                        <Nav className="me-auto mb-2 mt-2">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/about">About</Nav.Link>
                            <NavDropdown title="Movie Categories">
                                {navCategories()}
                            </NavDropdown>
                        </Nav>
                        <Nav className="mb-2 mt-2">
                            {user == null ? (
                                    <>
                                    <Nav.Link href="/login">Login</Nav.Link>
                                    <Nav.Link href="/register">Register</Nav.Link>
                                    </>
                                ) : (
                                    <>
                                    <Navbar.Text className="me-2">Welcome back, {user.username}</Navbar.Text>
                                    <Nav.Link onClick={logout} type="submit">Logout</Nav.Link>
                                    </>
                                )}
                            
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}