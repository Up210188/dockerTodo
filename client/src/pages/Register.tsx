import { FormEvent, useState } from 'react';
import { register, type UserRegister } from "../services/auth";
import {useNavigate} from 'react-router-dom';

function Register() {
    const [user, setUser] = useState<UserRegister>({});
    const [password2Display, setPassword2Display] = useState("d-none");
    const navigate = useNavigate();
    //const [name, setName] = useState<string>();


    const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
        //console.log(e.currentTarget.name)
        const { value: inputValue, name: inputName } = e.currentTarget;
        setUser(preventState => ({
            ...preventState,
            [inputName]: inputValue
        }))
        if (inputName === "password2") {
            const originalPassword = user.password;
            const confirmPassword = inputValue;

            setPassword2Display(originalPassword && originalPassword === confirmPassword
                ? "d-none"
                : "d-block");
        }
    }
    const handleSumbitInput = async (e: FormEvent<HTMLFormElement>) => {

        try {
            e.preventDefault();
            await register(user);
            navigate('/login')
            console.log(user)
        } catch (error) {
            
        }
    }



    //values[0] // -> Valor del estado actual
    //values[1] // -> Funcion para cambiar el estado

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-sm-4">
                    <h2 className="mb-4">Registro</h2>
                    <form className="mb-3" onSubmit={handleSumbitInput}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Nombre Completo</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                onInput={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Usuario</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                name="username"
                                onInput={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Correo electrónico</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                onInput={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="birthday" className="form-label">Fecha de nacimiento</label>
                            <input
                                type="date"
                                className="form-control"
                                id="birthday"
                                name="birthday"
                                onInput={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                onInput={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password2" className="form-label">Confirmar contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password2"
                                name="password2"
                                onInput={handleInputChange} />
                        </div>
                        <div className={`alert alert-dismissible alert-danger ${password2Display}`}>
                            {/* <button type="button" className="btn-close" data-bs-dismiss="alert"></button> */}
                            <a href="#password2" className="alert-link">Parece que hay un error
                            </a><br />
                            Las contraseñas no coinciden
                        </div>
                        <div className="row justify-content-center">
                            <button type="submit" className="btn btn-primary btn-block">Registrarse</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}



export default Register;