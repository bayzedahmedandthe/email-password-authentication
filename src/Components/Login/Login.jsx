import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.init";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";


const Login = () => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const emailRef = useRef();
    const handleLogin = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        setError("");
        setSuccess(false)
        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                console.log(result.user);
                
                if(!result.user.emailVerified){
                    setError("Please verify your email address");
                    return ;
                }
                setSuccess(true);
            })
            .catch((error) => {
                console.log("ERROR", error.message);
                setError("Invalid email")
            })
    }
    const handleForgetPassword = () => {
        const email = emailRef.current.value;
        if(email){
            sendPasswordResetEmail(auth, email)
            .then(() => {
                alert("Password reset email sent, please cheek your email")
            })
        }
    }

    return (

        <div className="card bg-base-100 w-full  shrink-0 shadow-2xl max-w-md mx-auto mt-10">
            <form onSubmit={handleLogin} className="card-body ">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input ref={emailRef} type="email" placeholder="email" name="email" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" placeholder="password" name="password" className="input input-bordered" required />
                    <label onClick={handleForgetPassword} className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Login</button>
                </div>
            </form>

            <div className="ml-8 mb-6">
                {
                    error && <p className="text-red-500">{error}</p>
                }
                {
                    success && <p className="text-green-500"> Login successfull</p>
                }
                <p>New to this website please <Link className="text-blue-500" to="/register">Register</Link></p>
            </div>
        </div>

    );
};

export default Login;