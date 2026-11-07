import logo from "../assets/map-pin.svg"
import bookmark from "../assets/bookmark.svg"
import { IoChevronDown } from "react-icons/io5";
import "./Header.css"
import { NavLink } from "react-router-dom";
import { useState } from "react";


function Header(){
    const [isLangOpen,setIsLangOpen] = useState(false)
    const [language,setLanguage] = useState("RU")
    return(
        <header className="header">
            <div className="logo">
                <img src={logo} alt="logo" />
                <p>Smartgid</p>     
            </div>
            <nav className="menu">
                
                <NavLink to="/" end className={({isActive})=>
                isActive ? "nav-link active" : "nav-link"
                }>Главная</NavLink>
                <NavLink to="/locations" className={({isActive})=>
                isActive ? "nav-link active" : "nav-link"
                }>Места</NavLink>
                <NavLink to="/map" className={({isActive})=>
                isActive ? "nav-link active" : "nav-link"
                }>Карта</NavLink>
                <NavLink to="/audiogid" className={({isActive})=>
                isActive ? "nav-link active" : "nav-link"
                }>Аудиогид</NavLink>
                <NavLink to="/translator" className={({isActive})=>
                isActive ? "nav-link active" : "nav-link"
                }>Переводчик</NavLink>
               
            </nav>
            <div className="header-right-side">
                <button className="lang-switch-btn"
                        onClick={() => setIsLangOpen(!isLangOpen)}
                        aria-expanded={isLangOpen}
                        aria-label="Выберите язык"
                >
                    <span className="lang-text">{language}</span>
                    <IoChevronDown color="#2279BA" size={14}
                                    className={`lang-arrow ${isLangOpen ? "rotated" :""}`}/>
                </button>
                {isLangOpen && (
                    <div className="lang-options">
                        {["RU","KZ","EN"].map((lang) => (
                            <button
                            key={lang}
                            className={`lang-option ${language == lang ? "selected" : ""}`}
                            onClick={() => {
                                setLanguage(lang);
                                setIsLangOpen(false);
                            }}
                            >{lang}</button>
                        ))}
                    </div>
                )}
                <img src={bookmark} alt="bookmark" />
                <button className="sign-in">Войти</button>
            </div>
        </header>
    );
}
export default Header