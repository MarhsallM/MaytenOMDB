import { persistCombineReducers, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import autoMergeLevel1 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const initialState = {
	usersData: {},
	currentUser: "",
};
import * as types from "../actions/ActionsTypes";

function users(state = initialState, action) {
	let nextState: any;
	switch (action.type) {
		case types.CREATE_NEW_USER:
			nextState = {
				...state,
				usersData: { ...state.usersData, ...action.new_user },
				currentUser: action.username,
			};
			return nextState || state;
		case types.UPDATE_CURRENT_USER:
			nextState = {
				...state,
				currentUser: action.username,
			};
			return nextState || state;

		case types.UPDATE_MOVIE_RATING:
			nextState = {
				...state,
				usersData: { ...state.usersData, ...action.new_userData },
			};
			return nextState || state;
		default:
			return state;
	}
}

const mainPersistConfig = {
	key: "data",
	storage: AsyncStorage,
	blacklist: ["currentUser"],
};
const mainPersistReducer = persistReducer(mainPersistConfig, users);

export default mainPersistReducer;

/*
  Pour récupérer la donnée currentAsso dans un component il faut :
  I - Configurations nécessaires
    1. Copier ces lignes de code au début du component:
    import {connect} from 'react-redux'
    import * as types from '......./Actions/ActionsTypes'
    const mapStateToProps = function(state) {
      return state;
    };
  
    2. Remplacer l'export default à la fin par :
    export default connect(mapStateToProps)(Nom_Component);
  
  II - Comment changer le nom de la currentAsso
  
  1. Mettre la fonction suivante dans le component (c'est la fonction qui va permettre de changer le nom de la currentAsso):
  function _toggleCurrentAsso(){
    const action = {type : types.TOGGLE_ASSO, value : "Nouvelle asso de l'écran"}
    this.props.dispatch(action)
  }
  
  2. Appeler la fonction _toggleCurrentAsso() dans le component
  
  III - Comment récupérer le nom de la currentAsso
  
  
  On la récupère avec la commande :
  this.props.screen.currentAsso
  */
