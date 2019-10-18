import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';

//styles
import '../../css/navbar.css';  

//redux y firebase
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

class Navbar extends Component {
    
    state = {  
        isAuthenticated: false
    }

    static getDerivedStateFromProps(props, state) {
        const { auth } = props;
        if (auth.uid) {
            return { isAuthenticated: true}
        } else {
            return {isAuthenticated: false}
        }

    }

    logOut = () => {
        const { firebase } = this.props;
        firebase.logout();
    }

    render() { 

        const { isAuthenticated } = this.state;

        return (
            <nav className="navbar">
                <div className="bar">
                    
                    <Link to={'/'} className="logo">
                        <i className="fas fa-paper-plane"></i>
                        <h1>WallApp</h1>
                    </Link>
                    

                    <div className="nav-items">

                        <NavLink    
                            to={'/'}
                            className="nav-item"
                            activeClassName="active"
                        >
                            <i className="fas fa-home"></i> 
                        </NavLink>

                        {
                            (isAuthenticated) ? 
                            <NavLink
                                to={'/posts/new'}
                                className="nav-item"
                                activeClassName="active"
                            >
                                <i className="far fa-sticky-note"></i> 
                                <span>Postear</span>
                            </NavLink> :
                            null
                        }

                        


                        {
                            (isAuthenticated) ?

                             <button
                                type="button"
                                className="nav-item btn btn-logout"
                                onClick={this.logOut}
                             >
                                <i className="fas fa-reply"></i>
                                <span>Salir</span>
                             </button> :

                             <NavLink
                                to={'/login'}
                                className="nav-item btn btn-login"
                                activeClassName="active"
                            >
                                <i className="fas fa-sign-in-alt"></i> 
                                <span>Acceder</span> 
                            </NavLink>
                        }
                    </div>
                </div>
            </nav>
        );
    }
}
 
export default compose(
    firebaseConnect(),
    connect((state, props) => ({
        auth: state.firebase.auth
    }))
)(Navbar);