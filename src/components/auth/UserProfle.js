import React from 'react';
import Spinner from '../layouts/Spinner';

//react y firebase
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

const UserProfile = (props) => {

    const { name, lastname, email, isEmpty} = props.profile;

    if (isEmpty) return null;

    return (
        <div className="user-profile">
            <div className="card">
                <div className="photo">
                    <img src="../../../img/user.png" alt="Profile"/>
                </div>  
                <div className="user-info">
                    <h3><i class="far fa-user"></i> {`${name} ${lastname}` }</h3>
                    <h3><i class="far fa-envelope"></i> {email}</h3>
                </div>
            </div>
        </div>
    );
}

export default compose(
    firebaseConnect(),
    connect((state, props) => ({
        profile: state.firebase.profile
    }))
) (UserProfile);