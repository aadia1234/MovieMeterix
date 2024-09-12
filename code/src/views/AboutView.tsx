import { CSSProperties } from "react"

export default function About() {

    const bodyText: CSSProperties = {
        padding: "5% 0% 5% 0%",
        textAlign: "left",
        width: "75%",
        margin: "auto",
        marginTop: "15px",
    }

    return (
        <>
            <div className="m-5 p-4 text-center">
                <h1><b>About</b></h1>

                <div id="body" style={bodyText}>
                    <h4>Welcome to MovieMeterix—your ultimate destination for insightful and comprehensive movie reviews! </h4>
                    <br></br>
                    <h6>Whether you're a casual viewer, a cinema enthusiast, or an aspiring film critic, MovieMeterix is designed to cater to all who share a love for the art of filmmaking.</h6>
                    <h6>At MovieMeterix, we believe every film tells a story worth exploring. Our team of dedicated reviewers provides in-depth analyses that go beyond the surface, offering critiques on everything from storytelling, acting performances, direction, cinematography, and even soundtrack choices. With a wide variety of genres and styles, we ensure that every movie lover finds something to match their taste.</h6>
                    <br></br>
                    <h6>What We Offer:</h6>
                        <li><h6>Honest and In-Depth Reviews: Our reviews focus not only on entertainment value but also on the craftsmanship and artistic merit of each film.</h6></li>
                        <li><h6>Diverse Categories: From blockbusters to indie films, documentaries to international cinema, MovieMeterix covers it all.</h6></li>
                        <li><h6>Community Engagement: Share your thoughts and engage with fellow movie buffs in our comment sections and forums.</h6></li>
                    <br></br>
                    <h6>At MovieMeterix, our goal is to create a community of informed movie-goers who appreciate the power of storytelling on the big screen. Dive into our reviews, explore hidden gems, and join us in celebrating the magic of cinema!                </h6>
                    <h6>Let me know if you'd like any adjustments! You can contact me at: <a href="mailto:aadiananddeveloper05@gmail.com">aadiananddeveloper05@gmail.com</a></h6>
                </div>
            </div>
        </>
    )
}