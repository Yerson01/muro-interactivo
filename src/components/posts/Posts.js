import React, { Component } from 'react';
import Post from './Post';
import Spinner from '../layouts/Spinner';

//styles
import '../../css/posts.css';

//redux y firebase
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

class Posts extends Component {
    
    render() {
        const { posts } = this.props;
    
        if (!posts) return <Spinner />;

        return (  
            <div className="posts">
                <h2><i className="fas fa-history"></i>Ultimas Publicaciones</h2>
                {posts.map(post => (
                    <Post 
                        key={post.id}
                        postInfo={post}
                    />
                ))}
            </div>
        );
    }
}
 
export default compose(
    firestoreConnect([
        { collection: 'posts', orderBy: ['createAt', 'desc'] }
    ]),
    connect( (state, props ) => ({
        posts: state.firestore.ordered.posts 
    }))
)(Posts);