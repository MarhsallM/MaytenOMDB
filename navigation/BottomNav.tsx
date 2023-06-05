import React, { FC } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome5";

import SearchMovies from "../screens/SearchMovies";
import MyMovies from "../screens/MyMovies";

type BottomParamList = {
	SearchMovies: any;
	MyMovies: any;
};

const BottomTab = createBottomTabNavigator<BottomParamList>();

const BottomNavigator = (): JSX.Element => {
	return (
		<BottomTab.Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName="SearchMovies"
		>
			<BottomTab.Screen
				name="SearchMovies"
				component={SearchMovies}
				options={{
					tabBarLabel: "Search Movies",
					tabBarIcon: ({ color }) => (
						<Icon name="search" color={color} size={26} />
					),
				}}
			/>
			<BottomTab.Screen
				name="MyMovies"
				component={MyMovies}
				options={{
					tabBarLabel: "My Movies",
					tabBarIcon: ({ color }) => (
						<Icon name="film" color={color} size={26} />
					),
				}}
			/>
		</BottomTab.Navigator>
	);
};

export default BottomNavigator;
