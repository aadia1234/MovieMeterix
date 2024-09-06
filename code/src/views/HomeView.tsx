import { Form, Button, InputGroup, Alert } from 'react-bootstrap';
import Autocomplete from "bootstrap5-autocomplete"
import { CSSProperties, useEffect, useRef, useState } from 'react';
import axios from "../api/axios.ts";
import { URLS } from '../api/constants.ts';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const [movies, setMovies] = useState([{id: -1, title: "", body: "", created_on: "", last_modified: "", categories: -1}])
    const [showSearchAlert, setShowSearchAlert] = useState(false)
    const navigate = useNavigate()
    let searchRef = useRef<HTMLInputElement>(null)

    const searchAlertStyle: CSSProperties = {
        position: "fixed",
        width: "100%",
        zIndex: 1
    }

    useEffect(() => {
        axios.get(URLS.MOVIES)
        .then((response) => setMovies(response.data))
        .catch((error) => console.log(error))
    }, [])
    

    useEffect(() => { new Autocomplete(searchRef.current, { onSelectItem: searchMovie, fullWidth: true}) }, [movies])

    function searchMovie(event: any) {
        let searchText = encodeURIComponent(searchRef.current?.value || "")

        event.preventDefault()

        axios.get(URLS.MOVIE_BY_TITLE + searchText)
        .then((response) => {
            console.log(response.data)
            navigate("/movies/" + response.data[0].id)
            window.location.reload()
        })
        .catch((error) => { setShowSearchAlert(true); console.log(error) })
    }

    return (
        <>
            <div className="m-5 p-4 text-center">
                <h1><b>Welcome to Movie Reviews</b></h1>
                <br></br>
                <h5 className="mb-5 mt-3">Search for any movie you wish to learn more about</h5>
                <br></br>
                <Form className="d-flex" onSubmit={searchMovie}>
                    <InputGroup className="mb-3 mt-5">
                        <Form.Control ref={searchRef} type="search" placeholder="Search" aria-label="Search" data-datalist="movieList"/>
                        <datalist id="movieList">{ movies.map((movie) => { return <option key={movie.id}>{movie.title}</option>}) }</datalist>
                        <Button type="submit">Search</Button>
                    </InputGroup>
                </Form>
            </div>
            <Alert style={searchAlertStyle} variant="warning" show={showSearchAlert} onClose={() => setShowSearchAlert(false)} dismissible>
              <strong>Uh-oh!</strong> Unable to find a movie with that title 
            </Alert>
        </>
    )
}