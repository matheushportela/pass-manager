import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";

function App() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [siteName, setSiteName] = useState("");
    const [passwordList, setPasswordList] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:1337/passwords").then((response) => {
            setPasswordList(response.data);
        });
    }, []);

    const addPassword = () => {
        Axios.post("http://localhost:1337/add", {
            login: login,
            password: password,
            siteName: siteName,
        });
    };

    const decryptPassword = (encryption) => {
        Axios.post("http://localhost:1337/decryptpassword", {
            password: encryption.password,
            iv: encryption.iv,
        }).then((response) => {
            navigator.clipboard.writeText(response.data);
        });
    };

    return (
        <div className="App">
            <div className="AddingPassword">
                <h1> Add Password </h1>
                <input
                    type="text"
                    placeholder="email or login"
                    onChange={(event) => {
                        setLogin(event.target.value);
                    }}
                />
                <input
                    type="text"
                    placeholder="password123"
                    onChange={(event) => {
                        setPassword(event.target.value);
                    }}
                />
                <input
                    type="text"
                    placeholder="Google"
                    onChange={(event) => {
                        setSiteName(event.target.value);
                    }}
                />
                <button onClick={addPassword}>Add Password</button>
            </div>
            <div className="Passwords">
                {passwordList.map((val) => {
                    return (
                        <div
                            className="password"
                            key="{ key }"
                            onClick={() => {
                                decryptPassword({
                                    password: val.password,
                                    iv: val.iv,
                                });
                            }}
                        >
                            <h3>{val.siteName}</h3>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default App;
