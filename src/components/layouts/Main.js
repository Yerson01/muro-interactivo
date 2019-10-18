import React from 'react';
import UserProfile from '../auth/UserProfle';
import Posts from '../posts/Posts';
import CreatePost from '../posts/CreatePost';
import { BrowserRouter as Router, Switch, Route  } from 'react-router-dom';
import { UserIsAuthenticated, UserIsNotAuthenticated } from '../../helpers/auth';

//styles
import '../../css/main.css';

const Main = () => {
    return (  
        <main className="main-content">
            <Router>
                <Switch>
                    <Route exact path='/' component={UserIsNotAuthenticated(Posts)} />
                    <Route exact path='/posts/new' component={UserIsAuthenticated(CreatePost)} />
                  
                </Switch>
                   
                    <UserProfile />
                   
            </Router>
            
        </main>
    );
}
 
export default Main;