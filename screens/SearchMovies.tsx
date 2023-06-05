import React, { useState, useRef } from "react";
import {
	StyleSheet,
	SafeAreaView,
	Button,
	TextInput,
	View,
	FlatList,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";

import { search_movie } from "../assets/functions/OMDB";
import MovieCard from "../components/movieCard";

const SearchMovies: React.FC = () => {
	const [title, setTitle] = useState("");
	const [year, setYear] = useState("");
	const [movies, setMovies] = useState([]);
	const [focused, setFocused] = useState(false);
	const titleRef = useRef<TextInput>(null);
	const yearRef = useRef<TextInput>(null);

	const launch_search = (title: string, year: string): void => {
		Keyboard.dismiss();
		search_movie(title, year).then((data: any) => setMovies(data.Search));
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.searchContainer}>
				<View style={styles.inputsContainer}>
					<TextInput
						ref={titleRef}
						onChangeText={setTitle}
						value={title}
						placeholder="Enter a title"
						style={styles.input}
						onFocus={() => setFocused(true)}
						onBlur={() => setFocused(false)}
						placeholderTextColor={"grey"}
					/>
					<TextInput
						ref={yearRef}
						onChangeText={setYear}
						value={year}
						placeholder="Enter a year (optional)"
						style={styles.input}
						inputMode="numeric"
						onFocus={() => setFocused(true)}
						onBlur={() => setFocused(false)}
						placeholderTextColor={"grey"}
					/>
				</View>
				<View style={styles.buttonContainer}>
					<Button
						title="Search for a movie"
						onPress={() => launch_search(title, year)}
						disabled={title.length < 3}
					/>
				</View>
			</View>
			<TouchableWithoutFeedback
				onPress={() => Keyboard.dismiss()}
				disabled={!focused}
			>
				<View style={{ flex: 8 }}>
					<FlatList
						data={movies}
						keyExtractor={(item: any) => item.imdbID}
						renderItem={({ item }) => <MovieCard item={item} />}
					/>
				</View>
			</TouchableWithoutFeedback>
		</SafeAreaView>
	);
};

export default SearchMovies;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#070707",
		alignItems: "center",
		justifyContent: "center",
	},
	searchContainer: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 10,
		paddingBottom: 20,
		borderBottomWidth: 0.4,
		borderColor: "grey",
	},
	inputsContainer: { flex: 3, alignItems: "center" },
	input: {
		borderWidth: 1,
		borderRadius: 25,
		padding: 10,
		width: "80%",
		textAlign: "center",
		marginVertical: 5,
		borderColor: "white",
		color: "white",
	},
	buttonContainer: { flex: 1 },
});
