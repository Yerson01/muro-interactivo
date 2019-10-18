import React, { Component } from 'react';
import Error from '../layouts/Error';
import Swal from 'sweetalert2';

//firebase
import { firebaseConnect } from 'react-redux-firebase';

//styles
import '../../css/form.css';

class SignUp extends Component {

    state = {  
        name: '',
        lastname: '',
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

        const { name, lastname, email, password } = this.state;

        if (name === '' || /\s+$/.test(name) || lastname === '' || /\s+$/.test(lastname) || email === '' || /\s+$/.test(email) || password === '' || /\s+$/.test(password)) {
            this.setState({
                error: true
            });
            return;
        }

        this.setState({
            error: false
        });


        const { firebase, history } = this.props;

       
        firebase.createUser(
            { email, password },
            { name, lastname, email }
        )
        .then(() => {
            Swal.fire(
                'Bien hecho!',
                'Cuenta creada existosamente!',
                'success'
              )
              history.push('/');
        });

        

    }

    render() { 
        const { error } = this.state;
        return (  
            <div className="flex">
                <div className="form-wrap">
                    <h2>
                        <i className="far fa-user-circle"></i>
                        Regístrate
                    </h2>

                    <span>
                       <i className="fas fa-paper-plane"></i> 
                    </span>

                    <form
                        onSubmit={this.handleSubmit}  
                    >

                        <div className="form-group name">
                            <input 
                                type="text"
                                className="input-text"
                                placeholder="Nombre"
                                name="name"
                                onChange={this.handleChange}
                            />
                        </div>

                        <div className="form-group lastname">
                            <input 
                                type="text"
                                className="input-text"
                                placeholder="Apellido"
                                name="lastname"
                                onChange={this.handleChange}
                            />
                        </div>

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
                        {(error) ? <Error message="Todos los campos son obligatorios!" /> : null}
                        
                            <div className="button">
                                <button 
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    <i className="fas fa-sign-in-alt"></i>Continuar
                                </button>
                            </div>
                        
                    </form>

                    

                </div>         
            </div>
        );
    }
}
 
export default firebaseConnect() (SignUp);