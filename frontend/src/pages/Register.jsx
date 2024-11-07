import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../features/auth/authSlice";

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
    })

    const { name, email, password, password2 } = formData;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, isLoading, isError, isSuccess, message } = 
        useSelector(
            (state) => state.auth
        );

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        // Redirect if logged in successfully.
        if (isSuccess || user) {
            navigate("/");
        }

        dispatch(reset());
    }, [isError, isSuccess, user, message, navigate, dispatch])

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== password2) {
            toast.error("Incorrect password! Passwords do not match");
        } else {
            const userData = {
                name,
                email,
                password
            }

            dispatch(register(userData));
        }
    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaUser /> Register
                </h1>
                <p>Please create an account</p>
            </section>

            <section className="form" onSubmit={handleSubmit}>
                <form>
                    <div className="form-group">
                        <input 
                            type="text" 
                            className="form-control" 
                            id="name"
                            name="name"
                            value={name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="email" 
                            className="form-control" 
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            className="form-control" 
                            id="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            placeholder="Enter password"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            className="form-control" 
                            id="password2"
                            name="password2"
                            value={password2}
                            onChange={handleChange}
                            placeholder="Confirm password"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block">
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Register;
