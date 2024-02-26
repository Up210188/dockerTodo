import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { type UserRegister, register } from '../services/auth';

function Register() {
  const [userSave, setUserSave] = useState<UserRegister>({});
  const navigate = useNavigate();

  const handdleInputChange = (e: FormEvent<HTMLInputElement>) => {
    const { value: inputValue, name: inputName } = e.currentTarget;

    setUserSave(preventState => ({
      ...preventState,
      [inputName]: inputValue
    }));
  };

  const handdleSubmitInput = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      await register(userSave);

      navigate('/login');

    } catch (error) {
      console.error(error);
    }
  };


  return (
    <section className="card col-5 mt-5">
      <header className="card-header">
        <p className="h1 text-center">Register App</p>
      </header>
      <article className="card-body">
        <form onSubmit={handdleSubmitInput}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <div className="input-group">
              <div className='input-group-text'><i className='nf nf-fa-user_circle'></i></div>
              <input
                type="text"
                placeholder="Write your Name"
                className="form-control"
                name='name'
                onInput={handdleInputChange}
              />
            </div>
          </div>
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
            <label htmlFor="email" className="form-label">Email</label>
            <div className="input-group">
              <div className="input-group-text"><i className="nf nf-md-email"></i></div>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Write your email"
                name='email'
                onInput={handdleInputChange}
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="birthday" className="form-label">Birthday</label>
            <div className="input-group">
              <div className="input-group-text"><i className="nf nf-md-calendar"></i></div>
              <input
                type="date"
                className="form-control"
                id="birthday"
                placeholder="Write your email"
                name='birthday'
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

export default Register;