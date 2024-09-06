import { useEffect, useState } from 'react'
import axios from "../api/axios.ts";
import { URLS } from '../api/constants.ts';
import { useParams } from 'react-router-dom';
import { Button, Card, Col, Row } from 'react-bootstrap';


export default function CategoryPostsView() {

    const [movies, setMovies] = useState([{id: null, title: null, banner: "null", body: "null", created_on: null, last_modified: "null", category: null}]);
    const [category, setCategory] = useState({id: null, name: "Default"})
    const { categoryID } = useParams()
    const cardStyle = { width: "100%", minHeight: "500px", margin: "auto"}
    const cardTextStyle = {overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", "-webkit-line-clamp": "4", "-webkit-box-orient": "vertical"}

    useEffect(() => {
        axios.get(URLS.MOVIES_BY_CATEGORY + categoryID)
        .then(response => setMovies(response.data))
        .catch(error => console.log(error))
    })

    useEffect(() => {
        axios.get(URLS.CATEGORIES + categoryID)
        .then((response) => setCategory(response.data))
        .catch((error) => console.log(error))
    }, [])

    function getPostContent(htmlStr: string) {
        var t = document.createElement("textarea");
        t.innerHTML = htmlStr;
        var tdiv = document.createElement("p");
        tdiv.innerHTML = t.value;
        return tdiv.textContent || tdiv.innerText || "";
    }

    return (
        <>
            <div className="m-5 p-4 text-center">
                <h1><b>{category.name}</b></h1>
            </div>
            <br></br>
            <Row xs={1} md={3} className="g-4 my-5 pb-5">
                {movies.map((post) => (
                    <Col className="my-4 px-5" key={post.id}>
                        <Card style={cardStyle}>
                            <Card.Img src={post.banner} variant="top" height="200px"/>
                            <Card.Body className="position-relative">
                                <Card.Title className="text-truncate">{post.title}</Card.Title>
                                <Card.Text style={cardTextStyle}>{getPostContent(post.body)}</Card.Text>
                                <Button variant="primary" href={"/movies/" + post.id} className="position-absolute bottom-0 mb-3">Read</Button>
                            </Card.Body>
                            <Card.Footer className="text-muted">
                                <small>Last Updated: {(new Date(post.last_modified)).toDateString()}</small>
                            </Card.Footer>
                        </Card>
                    </Col>
                )).slice(0, movies.length)}
            </Row>
        </>
    )
}