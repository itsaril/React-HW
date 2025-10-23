import React from "react";
import "./styles.css";
// import my photo from "./assets/myPhoto.jpg";

export default function AboutMe(){
    return(
        <section className="section_all bg-light" id = "about">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section_title_all text-center">
                            <h3 className="font-weight-bold">
                                Hello, <span className="text_custom">I'm Arailym</span>
                            </h3>
                            <p className="section_subtitle mx-auto text-muted">
                                and I'm a 4th year student at KBTU. <br />
                                Here you can find information about me.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row vertical-content-manage mt-5">
                <div className="col-lg-6">
                    <div className="img_about mt-3">
                        <img 
                        src = {myPhoto}
                        alt = "My new photo"
                        className="img-fluid mx-auto d-block" 
                        />
                    </div>
                </div>

                <div className="col-lg-6">
                    <div className="about_header_main mt-3">
                        <p className="text_custom font-weight-bold">About me</p>
                        <h4 className="about_heading text-capitalize font-weight-bold mt-4">
                            Junior UX/UI designer
                        </h4>
                        <p className="text-muted mt-3">
                            For over a year, I have been focusing on design, transforming ideas into visual solutions.
                        </p>
                        <p className="mt-3 github">Github</p>
                        <p className="mt-3 telega">Telega</p>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-lg-4">
                        <div className="about_content_box_all mt-4">
                            <div className="about_detail class-center">
                                <div className="about_icon">
                                    <i className=" fas pa-pencil-alt">
                                    </i>
                                    <h5 className="text-dark text-capitalize mt-3 font-weight-bold">
                                        Project Name
                                    </h5>
                                    <p>
                                        <a href="" target="" rel="">
                                            Описание проекта
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}


export default function AboutMe(){
    return(
        <section className="section_all bg-light" id="about">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section_title_all text-center">
                            <h3 className="font-weight-bold">
                                Hello, <span className="text_custom">I'm Arailym</span>
                            </h3>
                            <p className="section_subtitle mx-auto text-muted">
                                and I am a 4th year student at KBTU. <br/>
                                Here you can find information about me.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row vertical-content-manage mt-5">
                <div className="col-lg-6">
                    <div className="img_about mt-3">
                        <img
                        src = {myPhoto}
                        alt = "My new photo"
                        className="img-fluid mx-auto d-blok">
                        </img>
                    </div>
                </div>

                <div className="col-lg-6">
                    <p className="text_custom font-weight-bold mt-3">About me</p>
                    <h4 className="about_heading font-weight-bold m-4">
                        Junior UX/UI designer
                    </h4>
                    <p className="text-muted mt-3">
                        For over a year, I have been focusing on design, transforming ideas into visual solutions.
                    </p>
                    <p className="mt-3 github">Github: itsarillll</p>
                    <p className="mt-3 telega">Telega: itsaril</p>
                </div>
            </div>
        </section>
    )
}