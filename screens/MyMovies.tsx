import React, { useState } from "react";
import {
	StyleSheet,
	SafeAreaView,
	View,
	FlatList,
	TouchableWithoutFeedback,
	Keyboard,
	Text,
	TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

import { connect } from "react-redux";

const mapStateToProps = (state: any) => {
	return state;
};

import MovieCard from "../components/movieCard";

interface Props {
	currentUser: any;
	usersData: any;
}

const MyMovies: React.FC<Props> = ({ currentUser, usersData }) => {
	const [category, setCategory] = useState("Liked");
	const [movies, setMovies] = useState(
		Object.values(usersData[currentUser].liked)
	);

	const changeTab = (cat: string) => {
		setCategory(cat);
		setMovies(Object.values(usersData[currentUser][cat.toLowerCase()]));
	};

	const render_tab = (name: string, position: string) => {
		const color = category === name ? "orange" : "white";
		const catStyleBis = { color: category === name ? "orange" : "white" };
		const contStyleBis = {
			borderRightWidth: position === "right" && category != name ? 0 : 1,
			borderLeftWidth: position === "left" && category != name ? 0 : 1,
			borderWidth: category === name ? 1 : 0,
			borderColor: color,
		};

		return (
			<TouchableOpacity
				style={[styles.categoriesContainer, contStyleBis]}
				onPress={() => changeTab(name)}
			>
				<Text style={[styles.categories, catStyleBis]}>{name}</Text>
			</TouchableOpacity>
		);
	};

	let movies_content = (
		<Text style={styles.replacementText}>
			{"There is no movie in your " +
				category.toLowerCase() +
				" movies! Start liking movies by using the search Movies tab!"}
		</Text>
	);

	if (movies.length != 0) {
		movies_content = (
			<FlatList
				data={movies}
				keyExtractor={(item: any) => item.imdbID}
				renderItem={({ item }) => <MovieCard item={item} />}
			/>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.searchContainer}>
				{render_tab("Liked", "left")}
				{render_tab("Disliked", "center")}
				{render_tab("Watchlist", "right")}
			</View>
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
				<View style={{ flex: 8, justifyContent: "center" }}>
					{movies_content}
				</View>
			</TouchableWithoutFeedback>
		</SafeAreaView>
	);
};

export default connect(mapStateToProps)(MyMovies);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#070707",
	},
	searchContainer: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 10,
		borderBottomWidth: 0.4,
		borderColor: "#aaa",
		justifyContent: "space-between",
	},
	buttonContainer: { flex: 1 },
	categories: {
		color: "white",
		fontWeight: "bold",
		fontSize: 15,
		marginBottom: 5,
	},
	categoriesContainer: {
		alignItems: "center",
		flex: 1,
		borderRightWidth: 1,
		borderColor: "#aaa",
		padding: 10,
		borderLeftWidth: 1,
	},
	replacementText: {
		color: "white",
		textAlign: "center",
		fontSize: 18,
	},
});
