import "./Login.css";
import { Form } from "react-router-dom";

const Login = () => {

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Sign in</h2>
                <Form className="login-form" method="post">
                    <input type="text" name="username" id="username" placeholder="Username"/>
                    <input type="password" name="password" id="password" placeholder="Password"/>
                    <button type="submit">Sign in</button>
                </Form>
            </div>
        </div>
    );
};

export default Login;