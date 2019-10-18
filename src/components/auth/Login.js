import React, { Component } from 'react';
import Error from '../layouts/Error';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

//firestore
import { firebaseConnect } from 'react-redux-firebase';

class Login extends Component {
    state = {  
        email: '',
        password: '',
        error: false
    }

    handleChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();

        const { email, password } = this.state;

        //validar campos
        if (email === '' || /\s+$/.test(email) || password === '' || /\s+$/.test(password)) {
            this.setState({
                error: true
            });
            return;
        }

        this.setState({
            error: false
        });

        //extraer firestore
        const { firebase, history } = this.props;

        //autenticar usuario
        firebase.login({email, password})
            .then(response => {
                history.push('/')
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                  });
                  
                  Toast.fire({
                    type: 'success',
                    title: 'Registrado correctamente!'
                  })
            })
            .catch(error => {
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: 'El usuario y la contraseña no coinciden!',
                    footer: '¿Estas registrado?',
                    heightAuto: true
                  })
            });

            
     
    }

    render() { 
        const { error } = this.state;
        return (  
            <div className="flex">
                <div className="form-wrap">
                    <h2>
                        <i className="far fa-user-circle"></i>
                        Iniciar Sesión
                    </h2>

                    <span>
                       <i className="fas fa-paper-plane"></i> 
                    </span>

                    <form
                        onSubmit={this.handleSubmit}  
                    >
                        <div className="form-group email">
                            <input 
                                type="email"
                                className="input-text"
                                placeholder="Correo electrónico"
                                name="email"
                                onChange={this.handleChange}
                            />
                        </div>

                        <div className="form-group password">
                            <input 
                                type="password"
                                className="input-text"
                                placeholder="Contraseña"
                                name="password"
                                onChange={this.handleChange}
                            />
                        </div>

                        {/* Mostrar error en caso de que los campos esten vacios */}
                        {(error) ? <Error message="Debes completar ambos campos!" /> : null}

                        <div className="button">
                            <button 
                                type="submit"
                                className="btn btn-secondary"
                            >
                                <i className="fas fa-sign-in-alt"></i>Acceder
                            </button>
                        </div>
                        <p className="form-wrap-footer">
                            ¿Aún no tienes cuenta? <Link to={'/signup'}>Regístrate</Link>
                        </p>
                    </form>
                    
                </div>
                
            </div>
        );
    }
}
 
export default firebaseConnect() (Login);