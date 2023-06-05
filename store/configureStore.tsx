import { createStore, applyMiddleware } from "redux";
import mainPersistReducer from "./reducers/UsersReducer";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";

const loggerMiddleware = createLogger();
const Store = createStore(
	mainPersistReducer,
	applyMiddleware(thunkMiddleware, loggerMiddleware)
);

export default Store;
