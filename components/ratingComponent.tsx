import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { connect } from "react-redux";

import { update_movie_rating } from "../store/actions/UsersActions";

const mapStateToProps = (state: any) => {
	return state;
};

interface Props {
	item: any;
	dispatch: any;
	currentUser: any;
	usersData: any;
}

const RatingComponent: React.FC<Props> = ({
	item,
	dispatch,
	currentUser,
	usersData,
}) => {
	const ratingPressed = (ratingType: string) => {
		dispatch(
			update_movie_rating(usersData[currentUser], currentUser, item, ratingType)
		);
	};

	if (Object.keys(usersData[currentUser]["watchlist"]).includes(item.imdbID)) {
		return (
			<View style={styles.mainContainerOnly}>
				<TouchableOpacity
					style={styles.watchlist}
					onPress={() => ratingPressed("watchlist")}
				>
					<Icon name="glasses" color="white" size={25} />

					<Text style={{ color: "white", marginLeft: 15 }}>
						Already Added to Watchlist !{" "}
					</Text>
				</TouchableOpacity>
			</View>
		);
	} else if (
		Object.keys(usersData[currentUser]["liked"]).includes(item.imdbID)
	) {
		return (
			<View style={styles.mainContainerOnly}>
				<TouchableOpacity
					style={styles.likeOnly}
					onPress={() => ratingPressed("liked")}
				>
					<Icon name="thumbs-up" color="#1dcd0a" size={25} />

					<Text style={{ color: "#1dcd0a", marginLeft: 15 }}>
						Already liked !{" "}
					</Text>
				</TouchableOpacity>
			</View>
		);
	} else if (
		Object.keys(usersData[currentUser]["disliked"]).includes(item.imdbID)
	) {
		return (
			<View style={styles.mainContainerOnly}>
				<TouchableOpacity
					style={styles.dislikeOnly}
					onPress={() => ratingPressed("disliked")}
				>
					<Icon name="thumbs-down" color="#c81c09" size={25} />

					<Text style={{ color: "#c81c09", marginLeft: 15 }}>
						Already disliked !{" "}
					</Text>
				</TouchableOpacity>
			</View>
		);
	}

	return (
		<View style={styles.mainContainer}>
			<View style={{ flexDirection: "row" }}>
				<TouchableOpacity
					style={styles.like}
					onPress={() => ratingPressed("liked")}
				>
					<Icon name="thumbs-up" color="#1dcd0a" size={25} />
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.dislike}
					onPress={() => ratingPressed("disliked")}
				>
					<Icon name="thumbs-down" color="#c81c09" size={25} />
				</TouchableOpacity>
			</View>
			<TouchableOpacity
				style={styles.watchlist}
				onPress={() => ratingPressed("watchlist")}
			>
				<Icon name="glasses" color="white" size={25} />
			</TouchableOpacity>
		</View>
	);
};

export default connect(mapStateToProps)(RatingComponent);

const styles = StyleSheet.create({
	mainContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	mainContainerOnly: {
		alignItems: "center",
	},
	like: {
		padding: 20,
		paddingVertical: 5,
		borderWidth: 1,
		borderColor: "#1dcd0a",
		borderTopLeftRadius: 10,
		borderBottomLeftRadius: 10,
		borderRightWidth: 0,
		backgroundColor: "#093f03",
	},
	likeOnly: {
		padding: 20,
		paddingVertical: 5,
		borderWidth: 1,
		borderColor: "#1dcd0a",
		borderRadius: 10,
		backgroundColor: "#093f03",
		flexDirection: "row",
		alignItems: "center",
	},
	dislike: {
		padding: 20,
		paddingVertical: 5,
		borderWidth: 1,
		borderColor: "#c81c09",
		borderTopRightRadius: 10,
		borderBottomRightRadius: 10,
		borderLeftWidth: 0,
		backgroundColor: "#3a0803",
	},
	dislikeOnly: {
		padding: 20,
		paddingVertical: 5,
		borderWidth: 1,
		borderColor: "#c81c09",
		borderRadius: 10,
		backgroundColor: "#3a0803",
		flexDirection: "row",
		alignItems: "center",
	},
	watchlist: {
		padding: 10,
		paddingVertical: 5,
		borderColor: "white",
		backgroundColor: "grey",
		borderRadius: 20,
		flexDirection: "row",
		alignItems: "center",
	},
});
