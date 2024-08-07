import { Link } from 'react-router-dom'
import './public/style.css'
export default function Login() {
    return (
        <>
            <Link to={"/dashboard"}>
                <div className="loginDiv border">
                    <div className="loginIconDiv">
                        <i className="fa-solid fa-user-secret"></i>
                    </div>

                    <div className="loginText">
                        Login
                    </div>

                    <div className="loginIconDiv">
                        <i className="fa-solid fa-right-from-bracket"></i>
                    </div>
                </div>
            </Link>
        </>
    )
}