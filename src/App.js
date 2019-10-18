import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route  } from 'react-router-dom';

import Navbar from './components/layouts/Navbar';
import Posts from './components/posts/Posts';
import CreatePost from './components/posts/CreatePost';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import UserProfile from './components/auth/UserProfle';

//styles
import './css/main.css';

import { UserIsAuthenticated, UserIsNotAuthenticated } from './helpers/auth';
 
class App extends Component {

   render() { 
      return (  
         <Router>
            <Navbar />

            <div className="container">
               
               <main className="main-content">
                  <Switch> 
                     <Route exact path='/' component={Posts} />
                     <Route exact path='/posts/new' component={UserIsAuthenticated(CreatePost)} />
                  </Switch>
                  
                  <UserProfile />
               </main>
               
                  <Switch>
                     <Route exact path="/login" component={UserIsNotAuthenticated(Login)} />
                     <Route exact path="/signup" component={UserIsNotAuthenticated(SignUp)} />
                  </Switch>
                  
             
               
            </div>
         </Router>
      );
   }
}

export default App;
