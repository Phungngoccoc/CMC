import React, { useEffect } from "react";
import '../Style/Header.scss';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import logo from '../../assets/image/logo.svg';
import testimg from '../../assets/image/test.png'
import { useNavigate, useLocation } from "react-router-dom";
import { fetchListMenu } from "../../services/userServices";
import { useDispatch, useSelector } from "react-redux";
import { setEnglish, setVietnamese } from '../../features/languageSlice';
import { useState } from "react";
import { getAction, path } from "../../utils/constant";
import { getDataHome } from "../../features/homeSlice";
import { getDataHeader } from "../../features/headerSlice";
import { Helmet } from "react-helmet";
const Header = React.memo((props) => {
    const [listMenu, setListMenu] = React.useState([]);
    const languageApp = useSelector((state) => state.language.language);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dataHeaderRedux = useSelector((state) => state.dataHeader.dataHeader);
    const location = useLocation();

    const getListMenu = async () => {
        if (dataHeaderRedux !== null) {
            // setListMenu(dataHeaderRedux)
        } else {
            dispatch(getDataHeader());
        }
    };

    useEffect(() => {
        getListMenu();
    }, []);
    useEffect(() => {
        if (dataHeaderRedux !== null) {
            props.setEnable();
            setListMenu(dataHeaderRedux)
            return;
        }
        props.setEnable();  // props.setDisable();
    }, [dataHeaderRedux])

    useEffect(() => {

        const valuePath = Object.values(path);
        if (valuePath.includes(location.pathname)) {
            dispatch(getAction[location.pathname]);
        }
    }, [])

    const SwitchPage = (path) => {
        // const valuePath = Object.values(path);
        // if (valuePath.includes(path)) {
        //     dispatch(getAction[pathname]);
        //     const dataPage = useSelector((state) => state.);

        // }
        // <Helmet>
        //     <link rel="icon" type="image/png" href={testimg} />
        // </Helmet>
        navigate(path);
    };

    const handleLanguageChange = (e) => {
        const selectedLanguage = e.target.value;
        if (selectedLanguage === 'en') {
            dispatch(setEnglish());
        } else if (selectedLanguage === 'vi') {
            dispatch(setVietnamese());
        }
    };

    return (
        <div className="header-container">
            {["lg"].map((expand) => (
                <Navbar key={expand} expand={expand} className="nav-bar container d-flex justify-content-end">
                    <Container fluid className="nav-container">
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} className="toggle-menu" />
                        <Navbar.Brand href="#" className="d-lg-none d-flex justify-content-center">
                            <img
                                className="logo"
                                src={logo}
                                alt="Logo"
                                onClick={() => SwitchPage("/")}
                            />
                        </Navbar.Brand>
                        <div className="cover-menu"></div>
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="start"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`} style={{ width: "100%", borderBottom: "1px solid #ddd" }}>
                                    <div className="d-flex justify-content-center mr-5">
                                        <img
                                            className="logo pb-2"
                                            src={logo}
                                            alt="Logo"
                                            onClick={() => SwitchPage("/")}
                                        />
                                    </div>
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body className="nav-body">
                                <Nav className="d-flex justify-content-center flex-grow-1 pe-3">
                                    <div className="menu">
                                        <div><img
                                            className="logo d-lg-flex justify-content-center align-items-center d-none"
                                            src={logo}
                                            alt="Logo"
                                            onClick={() => SwitchPage("/")}
                                        /></div>
                                        {listMenu?.map((item, index) => {
                                            if (item.status !== 'published') {
                                                return null;
                                            }
                                            const translation = item.translations.find(
                                                (trans) => trans.languages_code === languageApp
                                            );
                                            return (
                                                <Nav.Link
                                                    key={index}
                                                    className={`menu-item ${item.slug === "about-us" || item.slug === "careers" ? 'setwidth' : ''}`}
                                                    onClick={() => SwitchPage(item.slug || "#")}
                                                >
                                                    {translation?.title || "Untitled"}
                                                </Nav.Link>
                                            );
                                        })}
                                        <div className="nav-btn mt-lg-0 mt-3">
                                            <select
                                                className="form-select"
                                                aria-label="Default select example"
                                                value={languageApp}
                                                onChange={handleLanguageChange}
                                            >
                                                <option value="en">English</option>
                                                <option value="vi">Tiếng Việt</option>
                                            </select>
                                        </div>
                                    </div>
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </div>
    );
});

export default Header;
