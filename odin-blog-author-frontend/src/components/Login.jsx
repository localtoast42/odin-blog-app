import "./Login.css";

const Login = () => {

    return (
        <div className="login-card">
            <form className="login-form" method="POST" action="http://localhost:3000/api/v1/login">
                <input type="text" name="username" id="username" placeholder="Username"/>
                <input type="password" name="password" id="password" placeholder="Password"/>
                <button>Sign in</button>
            </form>
        </div>
    );
};

export default Login;