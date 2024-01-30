import { React, useEffect, useState } from "react";
import { axiosClinet } from "./Api/axios";
import { Link, useNavigate } from "react-router-dom";
// import { Loader, Loader2 } from "lucide-react";
// import $ from "jquery";

function Login() {

    useEffect(() => {
        if (window.localStorage.getItem('ACCESS_TOKEN')) {
            navigate('/')
        }
    }, [])

    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState();
    const [errorBack, setErrorBack] = useState('');
    const [isValide, setIsValide] = useState(false);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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
            errors.password = "الرمز السري يجب ان يتكون على ارقام وحروف";
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        setTimeout(() => {
            setLoading(false);
            setErrors(Validation(values))
        }, 100)

        // alert(isValide)
        if (isValide) {
            // console.log(isValide)
            axiosClinet.get('/sanctum/csrf-cookie')
            await axiosClinet.post('/api/login', values).then(
                (response) => {

                    console.log('full responce', response)

                    const {status} = response;

                    if (status === 204) {
                        // window.localStorage.setItem('ACCESS_TOKEN' , 'test');
                        const authToken = response.headers['authorization']
                        console.log('data.token',authToken)

                        window.localStorage.setItem('ACCESS_TOKEN', 'true')
                        
                        navigate('/');
                        setAuthenticated(true)
                    }
                }
            ).catch(({ response }) => {
                setErrorBack(response?.data?.errors?.email.join())
            })

            // console.log('values', values, 'data', data)
        }

        // const setAuthenticated = (isAuthenticated) => {
        //     // _setAuthenticated(isAuthenticated)
        //     window.localStorage.setItem('AUTHENTICATED', isAuthenticated)
        //   }
        // alert(isValide)
        // const emailVlaue = email.current.value;
        // const passwordVlaue = password.current.value;
        // validateForm()
    }

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
                    <div className="container-fluid">
                        <div className="row h-100 align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
                            <div className="col-4 col-sm-8 col-md-8 col-lg-5 col-xl-5">
                                <div className="bg-secondary rounded p-4 p-sm-5 my-4 mx-3">
                                    <div className="d-flex align-items-center justify-content-between mb-3">
                                        <a href="index.html" className="">
                                            <h3 className="text-primary"><Link className="fa fa-user-edit me-2"></Link> ArbiTre</h3>

                                        </a>
                                        <h3>Sign In</h3>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="email" name="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={handelCHange} />
                                        <label for="floatingInput">البريد الالكتروني</label>
                                    </div>
                                    {errorBack ? <p dir="ltr" className="text-danger me-3">{errorBack}</p> : errors?.email && <p className="text-danger me-3">{errors?.email}</p>}
                                    <div className="form-floating d-flex align-items-center justify-content-between mb-4">
                                        <div className="form-floating col-11">
                                            <input type={inputType} name="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={handelCHange} />
                                            <label for="floatingPassword">الرمز السري</label>
                                        </div>
                                        <i className={iconType} onClick={togglePassword} ></i>
                                    </div>
                                    {errors?.password && <p className="text-danger me-3">{errors?.password}</p>}
                                    <div className="d-flex align-items-center justify-content-between mb-4">
                                        <div className="form-check">
                                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                            <label className="form-check-label" for="exampleCheck1" >Check me out</label>
                                        </div>
                                        <a href="">Forgot Password</a>
                                    </div>
                                    <button type="submit" className="btn btn-danger py-3 w-100 mb-4 fw-bold">بغيت ندخل
                                        {loading ? (
                                            <div className="spinner-border spinner-border-sm me-3 fs-2" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>) : ''}
                                    </button>
                                    <p className="text-center mb-0">Don't have an Account? <a href="">Sign Up</a></p>
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