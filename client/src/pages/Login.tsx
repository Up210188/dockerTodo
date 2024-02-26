import { FormEvent, useState } from "react";
import { login, type UserLogin } from "../services/auth";

function Login() {
  const [userLogin, setUserLogin] = useState<UserLogin>({});

  const handdleSubmitInput = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const { token } = await login(userLogin);
      console.log(token);

    } catch (error) {
      console.error(error);
    }
  }

  const handdleInputChange = (e: FormEvent<HTMLInputElement>) => {
    const { value: inputValue, name: inputName } = e.currentTarget;

    setUserLogin(preventState => ({
      ...preventState,
      [inputName]: inputValue
    }));
  }

  return (
    <section className="card col-5 mt-5">
      <header className="card-header">
        <p className="h1 text-center">Login App</p>
      </header>
      <article className="card-body">
        <form onSubmit={handdleSubmitInput}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">UserName</label>
            <div className="input-group">
              <div className="input-group-text"><i className="nf nf-fa-user"></i></div>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Write some username"
                name='username'
                onInput={handdleInputChange}
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-group">
              <div className="input-group-text"><i className="nf nf-oct-passkey_fill"></i></div>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Write your new password"
                name='password'
                onInput={handdleInputChange}
              />
            </div>
          </div>
          <button className="btn btn-primary w-100">Register</button>
        </form>
      </article>
    </section>
  )
}

export default Login;