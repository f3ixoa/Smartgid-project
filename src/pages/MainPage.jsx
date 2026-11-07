import { useEffect, useState } from "react";
import { FiSearch, FiMapPin, FiMic, FiX } from "react-icons/fi";
import heroImage from "../assets/ПейзажБозжыры.svg";
import heroGradient from "../images/Контрасттекста.png";
import { GoArrowUpRight } from "react-icons/go";
import "./MainPage.css"
const API_KEY_WEATHER_AKTAU = "ac62d9a471bd165c9df8f6d3b692b310";


const places = [
    { id: 1, name: "Бозжыра", category: "Каньоны", region: "Каракия" },
    { id: 2, name: "Шеркала", category: "Горы", region: "Мангистау" },
    { id: 3, name: "Торыш — Долина шаров", category: "Природные места", region: "Тупкараган" },
    { id: 4, name: "Жыгылган", category: "Природные места", region: "Тупкараган" },
    { id: 5, name: "Подземная мечеть Бекет-Ата", category: "Святые места", region: "Каракия" },
];

const regions = ["Все регионы", "Каракия", "Мангистау", "Тупкараган"];

function MainPage(){
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [query,setQuery] = useState("");
    const [region,setRegion] = useState("Все регионы")
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [results, setResults] = useState([]);
    const [searchDone, setSearchDone] = useState(false);
    const [isListening, setIsListening] = useState(false);

    useEffect(() => {
    const gettingWeather = async () => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=43.65&lon=51.17&units=metric&lang=ru&appid=${API_KEY_WEATHER_AKTAU}`
            );

            if (!response.ok) {
                throw new Error(`Ошибка API: ${response.status}`);
            }

            const data = await response.json();
            setWeather(data);
        } catch (err) {
            setError("Не удалось загрузить погоду");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    gettingWeather();
}, []);

    const filteredPlaces = places.filter((place) => {
        const matchesQuery =
            place.name.toLowerCase().includes(query.toLowerCase()) ||
            place.category.toLowerCase().includes(query.toLowerCase());
        
        const matchesRegion = 
        region === "Все регионы" || place.region === region;

        return matchesQuery && matchesRegion;
    });
    const handleSearch = (event) => {
        event?.preventDefault();
        setResults(filteredPlaces);
        setSearchDone(true);
        setShowSuggestions(false);
    };
    const handleVoiceSearch = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if(SpeechRecognition){
            alert("Голосовой поиск не поддерживается этим браузером")
            return
        }
    }
    const recognition = new SpeechRecognition();
        recognition.lang = "ru-RU";
        recognition.interimResults = false;

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);

        recognition.onresult = (event) => {
            const spokenText = event.results[0][0].transcript;
            setQuery(spokenText);
            setShowSuggestions(false);
        };

        recognition.onerror = () => setIsListening(false);
        recognition.start();

    return (
    <main className="main-page">
        <div className="welcome-card">
                <section
                    className="hero"
                    style={{
                    backgroundImage: `url(${heroGradient}), url(${heroImage})`,
                    }}
                    >
                    <div className="welcome-card-header">
                        <p className="welcome">МАҢҒЫСТАУҒА ҚОШ КЕЛДІҢІЗ</p>

                        <div className="weather-widget">
                        {loading ? (
                            <p>Загрузка погоды...</p>
                        ) : error ? (
                            <p>{error}</p>
                        ) : weather ? (
                            <>
                                <p className="weather-city">
                                    <img
                                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                                        alt={weather.weather[0].description}
                                    />

                                    &nbsp; {weather.name} ·&nbsp;
                                    
                                    {Math.round(weather.main.temp)}°C ·&nbsp;

                                    {weather.weather[0].description}                                   
                                </p>
                            
                            </>
                        ) : null}
                        </div>

                    </div>
                    <div className="card-main">
                        <h1 className="card-main-title">Мангистау. <br/> Ближе, чем кажется.</h1>
                        <p className="card-main-description">Меловые каньоны, священные места и Каспий. <br/> Найдите своё путешествие вместе со Smartgid.</p>
                        <div className="card-main-buttons">
                            <button><GoArrowUpRight size={18}/>Исследовать места</button>
                            <p>Ваш гид по региону</p>
                        </div>
                    </div>
                </section>
                

                
            </div>
             <section className="home-search-section">
                <form className="home-search" onSubmit={handleSearch}>
                    <div className="search-input-wrapper">
                        <FiSearch className="search-main-icon" />

                        <input
                            type="text"
                            value={query}
                            placeholder="Куда хотите отправиться?"
                            onChange={(event) => {
                                setQuery(event.target.value);
                                setShowSuggestions(true);
                                setSearchDone(false);
                            }}
                            onFocus={() => setShowSuggestions(true)}
                        />

                        {query && (
                            <button
                                type="button"
                                className="clear-search"
                                aria-label="Очистить поиск"
                                onClick={() => {
                                    setQuery("");
                                    setResults([]);
                                    setSearchDone(false);
                                }}
                            >
                                <FiX />
                            </button>
                        )}

                        {showSuggestions && query.trim() && (
                            <div className="search-suggestions">
                                {filteredPlaces.length ? (
                                    filteredPlaces.slice(0, 5).map((place) => (
                                        <button
                                            type="button"
                                            key={place.id}
                                            onClick={() => {
                                                setQuery(place.name);
                                                setShowSuggestions(false);
                                                setResults([place]);
                                                setSearchDone(true);
                                            }}
                                        >
                                            <FiMapPin />
                                            <span>{place.name}</span>
                                            <small>{place.category}</small>
                                        </button>
                                    ))
                                ) : (
                                    <p>Ничего не найдено</p>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="search-region-wrapper">
                        <FiMapPin className="region-icon" />
                        <select
                            value={region}
                            onChange={(event) => {
                                setRegion(event.target.value);
                                setSearchDone(false);
                            }}
                            aria-label="Выберите регион"
                        >
                            {regions.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="button"
                        className={`voice-search-button ${isListening ? "listening" : ""}`}
                        onClick={handleVoiceSearch}
                        aria-label="Голосовой поиск"
                        title="Голосовой поиск"
                    >
                        <FiMic />
                    </button>

                    <button type="submit" className="search-submit-button">
                        Найти
                    </button>
                </form>

                {searchDone && (
                    <div className="search-results">
                        <h3>
                            {results.length
                                ? `Найдено мест: ${results.length}`
                                : "Ничего не найдено"}
                        </h3>

                        {results.map((place) => (
                            <div className="search-result-item" key={place.id}>
                                <div>
                                    <strong>{place.name}</strong>
                                    <p>{place.category} · {place.region}</p>
                                </div>
                                <GoArrowUpRight />
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </main>
);
}
export default MainPage