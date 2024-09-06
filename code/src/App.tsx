import { useEffect, useState } from 'react'
// import reactLogo freact
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from './views/NavbarView';
import "./styles/App.css"
import { Container, Nav, Navbar } from 'react-bootstrap';
import Home from './views/HomeView';
import Login from './views/LoginView';
import RegisterView from './views/RegisterView';
import About from './views/AboutView';
import CategoryPostsView from './views/CategoryView';
import MovieView from './views/MovieView';

export default function App() {
    
    return (
        <>
            <div className="blog-body">
                <NavBar/>
                <div className="blog-content">
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<RegisterView/>}/>
                        <Route path="/about" element={<About/>}/>
                        <Route path="/category/:categoryID" element={<CategoryPostsView/>}/>
                        <Route path="/movies/:movieID" element={<MovieView/>}/>
                        <Route path="*" element={<Navigate to="/" replace/>}/>
                        {/* <Route path="/category/:name" element={<CategoryPostsView home={false}/>}/> */}
                    </Routes>
                </div>
            </div>
            <footer>
                <Navbar bg="body-secondary">
                    <Container fluid>
                        <Nav className="me-auto">
                            <Nav.Link href="/">Copyright © 2024 Aadi Anand</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </footer>
        </>
    )
}