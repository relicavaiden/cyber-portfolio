"use client";

import { useState, type SubmitEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const handleSubmit = async (
        event: SubmitEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

    const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
            email,
            password,
            }),
        }
        );

        if (!response.ok) {
            const data = await response.json();
            setError(data.error);
            return;
        }

        router.push("/author");
    }
    

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Email:{" "}
                <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
            </label>
            
            <label>
                Password:{" "}
                <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </label>
            <button type="submit">
                Log in
            </button>
            {error && <p>{error}</p>}
        </form>
    )
}