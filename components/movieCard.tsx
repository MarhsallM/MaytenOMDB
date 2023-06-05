import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, Image } from "react-native";

import RatingComponent from "./ratingComponent";
import MovieModal from "./movieModal";
import { get_full_infos } from "../assets/functions/OMDB";
interface Props {
	item: any;
}

const MovieCard: React.FC<Props> = ({ item }) => {
	const [modalVisible, setModalvisible] = useState(false);
	const [fullItem, setFullItem] = useState({ Title: "" });

	const changeModalVisible = (): void => {
		setModalvisible(!modalVisible);
		if (fullItem.Title.length === 0) {
			get_full_infos(item.imdbID).then((data: any) => setFullItem(data));
		} else {
			setFullItem({ Title: "" });
		}
	};

	const img_uri =
		item.Poster === "N/A"
			? require("../assets/images/movie_img.jpg")
			: { uri: item.Poster };

	return (
		<TouchableOpacity style={styles.mainContainer} onPress={changeModalVisible}>
			<MovieModal
				modalVisible={modalVisible}
				item={fullItem}
				changeModalVisible={changeModalVisible}
			/>
			<Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
				{item.Title}
			</Text>
			<Image source={img_uri} style={styles.img} />
			<RatingComponent item={item} />
		</TouchableOpacity>
	);
};

export default MovieCard;

const styles = StyleSheet.create({
	mainContainer: {
		margin: 15,
		padding: 15,
		borderRadius: 20,
		shadowOffset: {
			width: 5,
			height: 3,
		},
		shadowRadius: 5,
		shadowOpacity: 1.0,
		backgroundColor: "#181818",
	},
	title: {
		color: "white",
		fontSize: 20,
		textAlign: "center",
		fontWeight: "bold",
		marginBottom: 10,
	},
	img: { width: 300, height: 300, resizeMode: "contain", marginBottom: 10 },
});
