import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import CreatePost from "./pages/CreatePost";

import Sidebar from "./components/Sidebar"
import Navbar from "./components/Navbar";

import { supabase } from "./supabaseClient";

import "./index.css";

function App() {

    const [posts, setPosts] = useState(() => {
        const savedPosts = localStorage.getItem("posts");
        return savedPosts ? JSON.parse(savedPosts) : [];
    });

    const [currentUser, setCurrentUser] = useState(() => {
        const savedUser = localStorage.getItem("currentUser");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [sortType, setSortType] = useState("top");

    useEffect(() => {
        localStorage.setItem("posts", JSON.stringify(posts));
    }, [posts]);

    useEffect(() => {
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }, [currentUser]);

    // detectar login con Google
    useEffect(() => {

        const getUser = async () => {

            const { data } = await supabase.auth.getUser();

            if (data?.user) {

                const userData = {
                    username:
                        data.user.user_metadata.full_name ||
                        data.user.email
                };

                setCurrentUser(userData);

            }

        };

        getUser();

    }, []);

    const handleLogout = async () => {

        await supabase.auth.signOut();

        setCurrentUser(null);

        localStorage.removeItem("currentUser");

    };

    return (

        <BrowserRouter>

            <div className="app-layout">

                <Navbar
                    currentUser={currentUser}
                    handleLogout={handleLogout}
                />

                <Routes>

                    <Route
                        path="/"
                        element={

                            <div className="app-container app-container-desktop">

                                <Sidebar setSortType={setSortType} />

                                <Home
                                    posts={posts}
                                    setPosts={setPosts}
                                    currentUser={currentUser}
                                    sortType={sortType}
                                />

                            </div>

                        }
                    />

                    <Route
                        path="./Login"
                        element={
                            <Login setCurrentUser={setCurrentUser} />
                        }
                    />

                    <Route
                        path="/create"
                        element={
                            <CreatePost
                                posts={posts}
                                setPosts={setPosts}
                                currentUser={currentUser}
                            />
                        }
                    />

                </Routes>

            </div>

        </BrowserRouter>

    );

}

export default App;