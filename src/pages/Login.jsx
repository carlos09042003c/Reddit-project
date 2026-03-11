import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function Login({ setCurrentUser }) {

    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {

        e.preventDefault();

        if (!username.trim()) {
            alert("Escribe un nombre de usuario");
            return;
        }

        const user = { username };

        localStorage.setItem("currentUser", JSON.stringify(user));

        setCurrentUser(user);

        navigate("/");

    };

    const handleGoogleLogin = async () => {

        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: window.location.origin
            }
        });

        if (error) {
            console.error(error);
        }

    };

    return (

        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl border">

            <h2 className="text-xl font-semibold mb-4">
                Iniciar sesión
            </h2>

            <form onSubmit={handleLogin} className="space-y-4">

                <input
                    type="text"
                    placeholder="Nombre de usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="input-base"
                />

                <button type="submit" className="btn-primary w-full">
                    Entrar
                </button>

            </form>

            <div className="my-4 text-center text-gray-500">
                o
            </div>

            <button
                onClick={handleGoogleLogin}
                className="w-full border rounded-lg py-2 hover:bg-gray-50"
            >
                Continuar con Google
            </button>

        </div>

    );

}