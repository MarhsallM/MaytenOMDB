import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	Modal,
	Image,
	View,
	Pressable,
	TouchableWithoutFeedback,
	ScrollView,
} from "react-native";

import RatingComponent from "./ratingComponent";

interface Props {
	item: any;
	modalVisible: boolean;
	changeModalVisible: any;
}

const MovieModal: React.FC<Props> = ({
	item,
	modalVisible,
	changeModalVisible,
}) => {
	const img_uri =
		item.Poster === "N/A"
			? require("../assets/images/movie_img.jpg")
			: { uri: item.Poster };

	if (item.Title.length === 0) {
		return null;
	}
	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={modalVisible}
			onRequestClose={changeModalVisible}
		>
			<View style={styles.centeredView}>
				<View style={styles.modalViewPrincipal}>
					<View style={styles.modalView}>
						<View style={styles.infosContainer}>
							<View style={styles.ratingYearContainer}>
								<Text style={styles.infosText}>{item.Released}</Text>
								<Text style={styles.infosText}>
									{"Rating : " + item.imdbRating}
								</Text>
							</View>
							<View style={styles.titleContainer}>
								<Text style={styles.title}>{item.Title}</Text>
							</View>
							<ScrollView style={styles.plotContainer}>
								<Text style={styles.plot}>{item.Plot}</Text>
							</ScrollView>
						</View>

						<View style={styles.buttonsContainer}>
							<RatingComponent item={item} />
							<Pressable
								style={styles.buttonClose}
								onPress={changeModalVisible}
							>
								<Text style={styles.closeText}>Close</Text>
							</Pressable>
						</View>
					</View>
					<Image source={img_uri} style={styles.img} />
				</View>
			</View>
		</Modal>
	);
};

export default MovieModal;

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		marginTop: 22,
	},
	modalViewPrincipal: {
		paddingTop: 75,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.5,
		shadowRadius: 3.84,
		elevation: 5,
	},
	modalView: {
		margin: 20,
		backgroundColor: "#181818",
		borderRadius: 20,
		height: "85%",
		alignItems: "center",
		borderWidth: 4,
		borderColor: "#f2f2f2",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.5,
		shadowRadius: 3.84,
		elevation: 5,
	},
	infosContainer: {
		flex: 5,
		marginBottom: 20,
	},
	ratingYearContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 10,
		paddingVertical: 15,
		flex: 2,
	},
	infosText: { fontSize: 13, fontWeight: "bold", color: "#aaa" },
	titleContainer: {
		flex: 1,
	},
	title: {
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 20,
		color: "white",
	},
	plotContainer: {
		height: "50%",
		borderBottomColor: "#aaa",
		borderBottomWidth: 0.5,
		paddingBottom: 5,
		marginHorizontal: 10,
		marginTop: 10,
	},
	plot: { color: "white", textAlign: "justify" },
	buttonsContainer: {
		flex: 1.5,
		justifyContent: "space-between",
		marginVertical: 10,
		width: "80%",
	},
	buttonClose: {
		backgroundColor: "#007bff",
		borderRadius: 20,
		padding: 15,
		width: "50%",
		alignSelf: "center",
	},
	closeText: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
	img: {
		width: 150,
		height: 200,
		borderRadius: 60,
		borderWidth: 4,
		borderColor: "white",
		alignSelf: "center",
		position: "absolute",
	},
});
