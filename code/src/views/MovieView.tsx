import { useRef, useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import React from 'react'
// import ReCAPTCHA from 'react-google-recaptcha'
import Parser from 'html-react-parser'
import django from "../api/axios.ts"
import "../styles/MovieView.css"
import { Button, FloatingLabel, Form } from 'react-bootstrap'
import { URLS } from '../api/constants.ts'
import User from '../models/User.tsx'

export default function MovieView() {

    const [movie, setMovie] = useState({id: -1, title: "", banner: "", body: "", rating: 0, created_on: "", last_modified: "", category: -1})
    const [comments, setComments] = useState([{id: -1, author: "", body: "", created_on: "", post: -1}])
    const [newComment, setNewComment] = useState(false)
    const [validated, setValidated] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const [nameRef, commentRef] = [useRef<HTMLInputElement>(null), useRef<HTMLTextAreaElement>(null)]
    const { movieID: movieID } = useParams()
    
    
    let movieDate = new Date(movie.last_modified)
    useEffect(() => {
        django.get(URLS.MOVIES + movieID)
        .then((response) => setMovie(response.data))
        .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        django.get(URLS.COMMENT_BY_MOVIE + movieID)
        .then((response) => { setComments(response.data); setNewComment(false) })
        .catch((error) => console.log(error));
    }, [newComment]);

    useEffect(() => {
        // Fetch user details from localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      }, []);

    function rating() {
        return movie.rating
    }

    async function postData() {
        let [author, body, post] = [nameRef.current?.value, commentRef.current?.value, movieID]
        let json = {author, body, post}
        let response = await django.post(URLS.COMMENTS, json)
        return response.data
    }

    function submitComment(event: any) {
        let captchaValue = -1 //recaptcha.current.getValue()
        let form = event.currentTarget

        if (captchaValue && form.checkValidity()) {
            postData()
            .then((data) => {
                comments.push(data)
                setNewComment(true)
                setValidated(false)
            })
            .catch((error) => console.log(error))
        } else {
            event.preventDefault()
            event.stopPropagation()
        }

        setValidated(true)
    }

    function getComments() {
        return (
            comments.map((comment) => {
                return <div key={comment.id}>
                    <div className="comment-container">
                        <h5><strong>{comment.author}</strong></h5>
                        <p>{(new Date(comment.created_on)).toDateString()}</p>
                        <br/>
                        <p>{comment.body}</p>
                    </div>
                    <hr className="mx-5"/>
                </div>
            })
        )
    }

    return (
        <>
            <div className="text-bg-dark">
                <img src={movie.banner} width="100%"/>
            </div>
            <div className="mt-5 text-center">
                <h1>{movie.title}</h1>
                <h6>Last Modified: {movieDate.toDateString()}</h6>
                <h6>Rating: {movie.rating}</h6>
                {rating()}
            </div>
            <div className="body-text">{Parser(movie.body)}</div>
            <hr className="pb-5"/>
            <div className="mb-5 comments">
                <h3 className="m-5 text-center">Comments</h3>
                <br/>
                <div className="comments-text pb-3">{getComments()}</div>
                <hr className="mt-5"/>
                <div className="new-comment m-5 py-5">
                    {user != null ? (
                        <Form validated={validated} noValidate>
                            <h3 className="mb-5 text-center">Leave a Comment</h3>
                            <br/>
                            <FloatingLabel controlId="commentInput" label="Comment" className="mb-3">
                                <Form.Control ref={commentRef} as="textarea" placeholder="Comment" style={{height: "200px"}} required/>
                                <Form.Control.Feedback type="invalid">Please enter a comment.</Form.Control.Feedback>
                            </FloatingLabel>
                            <br/>
                            <br/><br/>
                            <Button variant="primary" onClick={submitComment}>Submit</Button>
                        </Form>
                    ) : (
                        <h5 className="m-5 text-center">You must be logged in to comment</h5>
                    )}
                    
                </div>
            </div>
        </>
    );
}