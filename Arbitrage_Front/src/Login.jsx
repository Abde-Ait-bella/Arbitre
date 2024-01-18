import { React, useEffect, useRef, useState } from "react";
// import $ from "jquery";

function Login() {

    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState();
    const [isValide, setIsValide] = useState(false);
    const [visible, setVisible] = useState(false);

    const handelCHange = (e) => {
        const newObject = { ...values, [e.target.name]: e.target.value };
        setValues(newObject);
        Validation(values);
    }

    const Validation = (values) => {
        const errors = {}
        let formIsValid = true

        const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;
        const password_pattern = /^(?=.*\d)(?=.*[a-z])[a-zA-Z0-9]{8,}$/;

        if (values?.email === "") {
            errors.email = "ادخل البريد الالكتروني";
            formIsValid = false
        }
        else if (!email_pattern.test(values?.email)) {
            errors.email = "البريد الالكتروني غير صحيح";
            formIsValid = false
        }

        if (values?.password === "") {
            errors.password = "ادخل الرمز السري";
            formIsValid = false
        }
        else if (!password_pattern.test(values?.password)) {
            errors.password = "الرمز السري غير مكتمل";
            formIsValid = false
        }
        
        setIsValide(formIsValid)
        return errors;
    }

    const togglePassword = () => {
        setVisible((visible) => !visible)
    }
    const inputType = visible ? "text" : "password"
    const iconType = visible ? "fa-regular fa-eye" : "fa-regular fa-eye-slash"

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(Validation(values))
        alert(isValide)
        // const emailVlaue = email.current.value;
        // const passwordVlaue = password.current.value;
        // validateForm()
    }

    // useEffect(() => {
    //     const spinner = () => {
    //         setTimeout(() => {
    //             const $spinner = $('#spinner');
    //             // if ($spinner.length > 0) {
    //             $spinner.removeClass('show');
    //             // }
    //         }, 10);
    //     }
    //     spinner();  // Call the spinner function when the component mounts

    //     // Clean up (optional): If you want to clear the timeout when the component unmounts
    //     return () => clearTimeout(spinner);
    // }, []);

    return (
        <>
            <div>
                {/* <!-- Spinner Start --> */}
                {/* <div id="spinner" className="show bg-dark position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
                    <div class="spinner-border text-primary" style={{width: '3rem', height: '3rem'}} role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div> */}
                {/* <!-- Spinner End --> */}

                {/* <!-- Sign In Start --> */}
                <form action="" onSubmit={handleSubmit}>
                    <div class="container-fluid">
                        <div class="row h-100 align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
                            <div class="col-12 col-sm-8 col-md-8 col-lg-5 col-xl-5">
                                <div class="bg-secondary rounded p-4 p-sm-5 my-4 mx-3">
                                    <div class="d-flex align-items-center justify-content-between mb-3">
                                        <a href="index.html" class="">
                                            <h3 class="text-primary"><i class="fa fa-user-edit me-2"></i> ArbiTre</h3>

                                        </a>
                                        <h3>Sign In</h3>
                                    </div>
                                    <div class="form-floating mb-3">
                                        <input type="email" name="email" class="form-control" id="floatingInput" placeholder="name@example.com" onChange={handelCHange} />
                                        <label for="floatingInput">البريد الالكتروني</label>
                                    </div>
                                    {errors?.email && <p className="text-danger me-3">{errors?.email}</p>}
                                    <div className="form-floating d-flex align-items-center justify-content-between mb-4">
                                        <div class="form-floating col-11">
                                            <input type={inputType} name="password" class="form-control" id="floatingPassword" placeholder="Password" onChange={handelCHange} />
                                            <label for="floatingPassword">الرمز السري</label>
                                        </div>
                                        <i class={iconType} onClick={togglePassword} ></i>
                                    </div>
                                    {errors?.password && <p className="text-danger me-3">{errors?.password}</p>}
                                    <div class="d-flex align-items-center justify-content-between mb-4">
                                        <div class="form-check">
                                            <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                            <label class="form-check-label" for="exampleCheck1" >Check me out</label>
                                        </div>
                                        <a href="">Forgot Password</a>
                                    </div>
                                    <button type="submit" class="btn btn-primary py-3 w-100 mb-4">Sign In</button>
                                    <p class="text-center mb-0">Don't have an Account? <a href="">Sign Up</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                {/* <!-- Sign In End --> */}
            </div>
        </>
    )
}
export default Login;