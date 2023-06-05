import React from "react";
import AppNavigator from "./navigation/StackNav";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import Store from "./store/configureStore";

export default class App extends React.Component {
	componentdidMount() {}
	render() {
		let persiStore = persistStore(Store);
		//persiStore.purge();
		return (
			<Provider store={Store}>
				<PersistGate persistor={persiStore}>
					<AppNavigator />
				</PersistGate>
			</Provider>
		);
	}
}
