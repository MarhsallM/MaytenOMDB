import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";

import Login from "../screens/Login";
import BottomNavigator from "./BottomNav";

type RootStackParamList = {
	Login: any;
	BottomNavigator: any;
};

const RootStack = createStackNavigator<RootStackParamList>();

const StackNavigator = (): JSX.Element => {
	return (
		<RootStack.Navigator screenOptions={{ headerShown: false }}>
			<RootStack.Screen name="Login" component={Login} />
			<RootStack.Screen name="BottomNavigator" component={BottomNavigator} />
		</RootStack.Navigator>
	);
};

const AppNavigator: FC = () => (
	<NavigationContainer>
		<StackNavigator />
	</NavigationContainer>
);

export default AppNavigator;
