import Layout from '@/components/Layout';
import React from 'react';
import Head from 'next/head';

export default function Homepage() {
    return (
        <Layout>
            {/* <Head>
                <link
                    href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
                    rel="stylesheet"
                    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
                    crossOrigin="anonymous"
                />
            </Head> */}

            <div className="row flex justify-center">
                <div className="col-lg-12">
                    <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleSlidesOnly" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleSlidesOnly" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleSlidesOnly" data-bs-slide-to="2" aria-label="Slide 3"></button>
                            <button type="button" data-bs-target="#carouselExampleSlidesOnly" data-bs-slide-to="3" aria-label="Slide 3"></button>
                            <button type="button" data-bs-target="#carouselExampleSlidesOnly" data-bs-slide-to="4" aria-label="Slide 3"></button>
                            <button type="button" data-bs-target="#carouselExampleSlidesOnly" data-bs-slide-to="5" aria-label="Slide 3"></button>
                            <button type="button" data-bs-target="#carouselExampleSlidesOnly" data-bs-slide-to="6" aria-label="Slide 3"></button>
                            <button type="button" data-bs-target="#carouselExampleSlidesOnly" data-bs-slide-to="7" aria-label="Slide 3"></button>
                            <button type="button" data-bs-target="#carouselExampleSlidesOnly" data-bs-slide-to="8" aria-label="Slide 3"></button>

                        </div>
                        <div className="carousel-inner">
                            <div className="carousel-item active px-96" data-bs-interval="2000">
                                <img src="/1.jpg" className="d-block w-100" style={{ maxWidth: '800px', maxHeight: '800px' }} alt="1" />
                            </div>
                            <div className="carousel-item px-96" data-bs-interval="2000">
                                <img src="/2.jpg" className="d-block w-100" style={{ maxWidth: '500px', maxHeight: '500px' }} alt="2" />
                            </div>
                            <div className="carousel-item px-96" data-bs-interval="2000">
                                <img src="/3.jpg" className="d-block w-100" style={{ maxWidth: '800px', maxHeight: '800px' }} alt="3" />
                            </div>
                            <div className="carousel-item px-96" data-bs-interval="2000">
                                <img src="/4.jpg" className="d-block w-100" style={{ maxWidth: '800px', maxHeight: '500px' }} alt="4" />
                            </div>
                            <div className="carousel-item px-96" data-bs-interval="2000">
                                <img src="/5.jpg" className="d-block w-100" style={{ maxWidth: '800px', maxHeight: '500px' }} alt="5" />
                            </div>
                            <div className="carousel-item px-96" data-bs-interval="2000">
                                <img src="/6.jpg" className="d-block w-100" style={{ maxWidth: '1000px', maxHeight: '1000px' }} alt="6" />
                            </div>
                            <div className="carousel-item px-96" data-bs-interval="2000">
                                <img src="/7.jpg" className="d-block w-100" style={{ maxWidth: '600px', maxHeight: '600px' }} alt="7" />
                            </div>
                            <div className="carousel-item px-96" data-bs-interval="2000">
                                <img src="/8.jpg" className="d-block w-100" style={{ maxWidth: '500px', maxHeight: '600px' }} alt="8" />
                            </div>
                            <div className="carousel-item px-96" data-bs-interval="2000">
                                <img src="/9.jpg" className="d-block w-100" style={{ maxWidth: '500px', maxHeight: '600px' }} alt="9" />
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleSlidesOnly" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleSlidesOnly" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
            <hr></hr>

            <div class="row flex justify-start mt-24 mb-10">
                <div class="col-lg-6">
                    <h1>"Welcome to <span className="text-red-900 font-mono "><i>Recycle</i></span><b>Bin</b>!</h1>
                    <br />
                    <p>
                        Embrace the beauty of sustainable shopping and the thrill of finding hidden treasures.
                        We're delighted to introduce you to a unique online marketplace where pre-loved items find new homes and stories
                        continue to unfold.
                    </p>
                    <p>
                        At RecycleBin, we've created a platform that celebrates the spirit of sharing and reimagining. <br />
                        Whether you're looking to <b>declutter</b> your space or <b>discover</b> that perfect, gently used item, you're
                        in the right place.
                    </p>
                    <p>
                        Our community is all about giving pre-owned products a chance to shine once more.
                        From fashion to electronics, home decor to accessories, our catalog is a treasure trove of possibilities. Every item has
                        a history, and now, it's waiting to become a part of yours. As you explore our virtual aisles, you'll find not only
                        remarkable deals but also a sense of connection to a network of like-minded individuals who value sustainability and
                        affordability.<br />

                        <b>Whether you're a seller seeking a new chapter for your belongings or a buyer on the hunt for unique finds,
                            RecycleBin offers you a space to make transactions that matter. It's more than just commerce; it's a chance to reduce
                            waste and extend the lifespan of beloved possessions.</b>
                    </p>
                    <p>
                        <b>Thank you</b> for joining our community of conscious consumers, sellers, and seekers. Your presence contributes to a more
                        sustainable and thoughtful way of shopping. Start exploring, start selling, and start shopping with purpose today!
                    </p>
                    Here's to a future of second chances and endless possibilities.

                    Warmly,<br />
                    The RecycleBin Team"
                </div>
                <div class="col-lg-6 flex justify-center">
                    <img src="/10.png" className="d-block w-100" style={{ maxWidth: '600px', maxHeight: '600px' }} alt="10" />
                </div>
            </div>
            <hr></hr>

            <div class='mt-20'>
                <div class='row text-center'>
                    <h1 class='text-lg'>
                        <b>MEET THE TEAM</b>
                    </h1><br />
                    <p class="bg-light text-muted text-center text-uppercase">
                        We are a team of two enthusiastic members currently pursuing our undergrad in the Department of
                        Computer Science and Engineering, Shahjalal University of Science and Engineering. This project was
                        a part of our course work in the course of "CSE334 : Database System Lab".
                    </p>
                </div>
                <div class='row flex justify-center mt-10'>
                    <div class='col-lg-6 px-40'>
                        <img src='/alve.jpg' style={{ maxWidth: '1000px', maxHeight: '600px' }} class='rounded-circle img-fluid float-start' />
                    </div>
                    <div class='col-lg-6 px-60'>
                        <img src='/raha.jpg' style={{ maxWidth: '350px', maxHeight: '350px' }} class='rounded-circle img-fluid float-start' />
                    </div>
                </div>
                <div class='row flex justify-center mt-10'>
                    <div class='col-lg-6 px-40'>
                        <h4>Md Shibly Rahman Alve</h4><br />
                        <div class='text-muted'>Registration Number : 2019331050</div>
                    </div>
                    <div class='col-lg-6 px-60'>
                        <h4>Farzana Reefat Raha</h4><br/>
                        <div class='text-muted'>Registration Number : 2019331078</div>
                    </div>
                </div>
            </div>

            <script
                src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
                integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
                crossOrigin="anonymous"
            ></script>

            {/* Rest of your component content */}
        </Layout >
    );
}
