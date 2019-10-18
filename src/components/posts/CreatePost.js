import React, { Component } from 'react';
import Error from '../layouts/Error';
import { Link } from 'react-router-dom';

//styles
import '../../css/createPost.css';

//redux y firebase
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';

class CreatePost extends Component {
    state = {  
        body: '',
        error: false
    }

    handleChange = e => { 
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();

        //extraer el mensaje del state
        const body = this.state.body;

        //validar que no este vacio
        if(body === '' || /\s+$/.test(body) ) {
            this.setState({
                error: true
            });
            return;
        }


        this.setState({
            error: false
        });

        const { name, lastname } = this.props.profile;

        //crear nuevo objeto para agregarlo a los posts
        const newPost = {
            body: body,
            createAt: new Date(),
            userHandle: `${name} ${lastname}`
        }

        //extraer firestore de los props
        const { firestore, history } = this.props;
        
        firestore.add( {collection: 'posts'}, newPost)
            .then(() => history.push('/'));
            
    }

    render() { 

        const error = this.state.error;

        return (  
            <div className="new-post">
                <div className="">
                    <Link to={'/'} className="btn btn-back">
                        <i className="fas fa-long-arrow-alt-left"></i> Volver
                    </Link>
                </div>
                <div>
                    <h3><i className="fas fa-share-alt"></i> Comparte tu historia</h3>
                    <img src="../../../img/newpost.jpg" alt="Imagen del post"/>
   
                    <div className="post-form">
                        <form onSubmit={this.handleSubmit}>
                        
                            <div className="text-area">
                                <textarea 
                                    name="body"
                                    className="message"
                                    placeholder="Que estas pensando?"
                                    onChange={this.handleChange}
                                    >
                                </textarea>
                            </div>

                            <input 
                                type="submit" 
                                value="Publicar"
                                className="btn btn-share"
                            />
                        </form>

                        {/* Mostrar error en caso de que los campos esten vacios */}
                        {(error) ? <Error message="Debes escribir algo en tu historia" /> : null}

                    </div>
                 
                </div>
            </div>
        );
    }
}
 
export default compose(
    firestoreConnect(), 
    firebaseConnect(),
    connect((state, props) => ({
        profile: state.firebase.profile
    }))
)(CreatePost);