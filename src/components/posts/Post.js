import React from 'react';
import TimeAgo from 'react-timeago';

const Post = (props) => {

    const { body, createAt, userHandle } = props.postInfo;  
    const date = new Date(createAt.seconds * 1000);

    return (
        <div className="card post">
            <div className="card-head">
                <div className="image">
                    <img src="../../../img/user.png" alt="Profile"/>  
                </div>
                <div className="info">
                    <h4>{userHandle}</h4>
                    <span className="badge"><TimeAgo date={date} /></span>
                </div>
            </div>

            <div className="body-flex">
                <i class="fas fa-quote-left quote"></i>
                <div className="body">
                    <div className="card-body"> 
                        <p>{body}</p>
                    </div>

                    <div className="card-footer">
                        <span className="hearts">
                            <i className="far fa-heart"></i>0
                        </span>
                        
                        <span className="dislikes">
                            <i className="far fa-angry"></i>0
                        </span>

                        <span className="comments">
                            <i className="far fa-comment-dots"></i>0
                        </span>  
                    </div>
                </div>
                
            </div>
            
        </div>
    );
}

export default Post;