import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	SafeAreaView,
	Button,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Keyboard,
	KeyboardAvoidingView,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { connect } from "react-redux";

import {
	create_new_user,
	update_current_user,
} from "../store/actions/UsersActions";

const mapStateToProps = (state: any) => {
	return state;
};

/*
type RootStackParamList = {
	Login: undefined;
	BottomNavigator: undefined;
};

type NavigationProps = NativeStackScreenProps<RootStackParamList, "Login">;
*/

const Login: React.FC = (props: any) => {
	const [username, setUsername] = useState("");

	const start_connexion = () => {
		if (Object.keys(props.usersData).includes(username)) {
			props.dispatch(update_current_user(username));
		} else {
			props.dispatch(create_new_user(username));
		}
		props.navigation.navigate("BottomNavigator");
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<SafeAreaView style={styles.container}>
				<Text style={{ color: "white" }}>Tell me who are you ! </Text>
				<TextInput
					onChangeText={setUsername}
					value={username}
					placeholder="Username"
					style={styles.input}
					placeholderTextColor={"grey"}
				/>
				<TouchableOpacity
					style={styles.button}
					onPress={start_connexion}
					disabled={username === ""}
				>
					<Text style={styles.buttonText}>Let's connect me ! </Text>
				</TouchableOpacity>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
};

export default connect(mapStateToProps)(Login);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#070707",
		alignItems: "center",
		justifyContent: "center",
	},
	input: {
		borderWidth: 1,
		borderRadius: 25,
		padding: 15,
		width: "80%",
		textAlign: "center",
		marginVertical: 15,
		borderColor: "white",
		color: "white",
	},
	button: {
		backgroundColor: "#007bff",
		borderRadius: 20,
		padding: 15,
		width: "50%",
		alignSelf: "center",
		marginBottom: 100,
	},
	buttonText: {
		color: "white",
		textAlign: "center",
	},
});
