import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "../style/style.js";
import Main from "../pages/Main.js";
import SigninPage from "../pages/SigninPage.js";
import {  useState } from 'react';
import UserContext from '../context/UserContext.js';
import SignupPage from "../pages/SignupPage.js";
import Users from "../pages/Users.js";
import Search from "../pages/search.js";


export default function App() {
    const [user, setUser] = useState(null);
    const [searchs, setSearchs] = useState(undefined);

    return (
        <>
            <UserContext.Provider value={{ user, setUser, searchs,setSearchs }}>
                <GlobalStyle />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<SigninPage />} />
                        <Route path="/sign-up" element={<SignupPage />} />
                        <Route path="/main" element={<Main />} />
                        <Route path="/user/:id" element={<Users/>}/>
                        <Route path="/search" element={<Search/>}/>
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </>
    )
}