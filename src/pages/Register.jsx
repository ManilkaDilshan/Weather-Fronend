import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";

const Register = () => {
    const [isLoginOrRegister, setIsLoginOrRegister] = useState('login');
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [error, setError] = useState('');

    const { login } = useContext(UserContext);

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        const url = isLoginOrRegister === 'register' ? 'register' : 'login';

        if (isLoginOrRegister === 'register') {
            if (username.trim() === "" || password.trim() === "" || confirmPassword.trim() === "") {
                setError("Username and password are required");
                return;
            }

            if (password.trim() !== confirmPassword.trim()) {
                setError("password does not match");
                return;
            }
        } else {
            if (username.trim() === "" || password.trim() === "") {
                setError("Username and password are required");
                return;
            }
        }

        try {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}/auth/${url}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: username,
                        password: password,
                    }),
                }
            );
            const data = await response.json();

            if (response.ok) {
                login(data);
                setError('');
            } else {
                setError(data.error);
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setError(error.response.data.error);
            } else {
                setError("An error occurred");
            }
        }
    }

    const changeFormType = () => {
        isLoginOrRegister === 'register' ? setIsLoginOrRegister('login') : setIsLoginOrRegister('register');
        setError('');
        setUserName('');
        setPassword('');
        setconfirmPassword('');
    }

    useEffect(() => {
        setError("");
    }, [username, password, confirmPassword]);

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="w-96 bg-slate-300 p-10 rounded-md">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        {isLoginOrRegister === 'register' ? 'Sign Up' : 'Sign in '}
                    </h2>
                </div>

                <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                Username
                            </label>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    name="email"
                                    type="email"
                                    autoComplete="username"
                                    value={username}
                                    onChange={ev => setUserName(ev.target.value)}
                                    placeholder="Enter the Email"
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <div className="mt-2">
                                <input
                                    value={password}
                                    onChange={ev => setPassword(ev.target.value)}
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    placeholder="Password"
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        {isLoginOrRegister === 'register' ? <div>
                            <label htmlFor="passwordConfirm" className="block text-sm font-medium leading-6 text-gray-900">
                                Confirm Password
                            </label>
                            <div className="mt-2">
                                <input
                                    value={confirmPassword}
                                    onChange={ev => setconfirmPassword(ev.target.value)}
                                    id="passwordConfirm"
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Confirm Password"
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div> : null}

                        <div>
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                {isLoginOrRegister === 'register' ? 'Register' : 'Login'}
                            </button>
                        </div>
                        {isLoginOrRegister === 'register' && (
                            <div className="mt-1">
                                Already a member? <button className="ml-1 text-blue-600 hover:text-blue-900" onClick={changeFormType}>
                                    Sign In
                                </button>
                            </div>
                        )}
                        {isLoginOrRegister === 'login' && (
                            <div className="mt-1">
                                Don&apos;t have an account? <button className="ml-1 text-blue-600 hover:text-blue-900" onClick={changeFormType}>
                                    Sign Up
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
