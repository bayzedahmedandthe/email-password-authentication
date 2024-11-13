import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.init";
import { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
    const [errormessage, setErrormessage] = useState("");
    const [success, setSuccess] = useState(false);
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    const handleSignUp = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        setErrormessage("");
        setSuccess(false);
        if(password.length < 6){
            setErrormessage("passwoed should be 6 characthers or longer");
            return ;
        }
        if(!passwordPattern.test(password)){
            setErrormessage("At least one uppercase, one lowercase, at least one number, at least one special character")
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
            console.log(result.user);
            setSuccess(true);
        })
        .catch((error) => {
            console.log("ERROR", error);
            setErrormessage("This email already exists")
        })

    }
    return (
        <div className="w-[350px] mx-auto mt-20">
            <h2 className="text-3xl font-semibold py-4">SignUp</h2>
            <form onSubmit={handleSignUp}>
                <label className="input input-bordered flex items-center gap-2 my-6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path
                            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input type="email" className="grow" name="email" placeholder="Email" />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            fillRule="evenodd"
                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                            clipRule="evenodd" />
                    </svg>
                    <input type="password" name="password" className="grow" placeholder="password"  />
                    <button><FaEyeSlash /></button>
                </label>
                <button className="btn btn-primary px-[150px] my-6">SignUp</button>
            </form>
            {
                errormessage && <p className="text-red-500">{errormessage}</p>
            }
            {
                success && <p className="text-green-500">Sign Up successfull</p>
            }
        </div>
    );
};

export default SignUp;