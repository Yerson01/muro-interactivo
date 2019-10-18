import { createStore, combineReducers, compose } from 'redux';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

//configurar firestore
const firebaseConfig = {
    apiKey: "AIzaSyAHz40fPs7z8xJEa03htK0icv9oo8-JOII",
    authDomain: "wallapp-80d83.firebaseapp.com",
    databaseURL: "https://wallapp-80d83.firebaseio.com",
    projectId: "wallapp-80d83",
    storageBucket: "",
    messagingSenderId: "301989819734",
    appId: "1:301989819734:web:1e23822e0a71ac38"
}

//inicializar firebase
firebase.initializeApp(firebaseConfig);

//configuracion de react-redux
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true
}

//crear el enhancer con compose de redux y firestore
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
)(createStore);

//reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer
});

//state inicial
const initialState = {};

//crear el store
const store = createStoreWithFirebase(rootReducer, initialState, compose(
    reactReduxFirebase(firebase)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;