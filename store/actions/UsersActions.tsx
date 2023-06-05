import * as types from "./ActionsTypes";

export const create_new_user = (username: string) => {
	const new_user = {};
	new_user[username] = { watchlist: {}, liked: {}, disliked: {} };
	return {
		type: types.CREATE_NEW_USER,
		new_user,
		username,
	};
};

export const update_current_user = (username: string) => ({
	type: types.UPDATE_CURRENT_USER,
	username,
});

export const update_movie_rating = (
	userData: any,
	username: string,
	movie: any,
	rating: string
) => {
	let userData_temp = userData;

	const ID = movie.imdbID;
	console.log(ID);
	if (
		userData_temp[rating] &&
		Object.keys(userData_temp[rating]).includes(ID)
	) {
		delete userData_temp[rating][ID];
	} else {
		userData_temp[rating][ID] = movie;
	}

	let user_temp = {};
	user_temp[username] = userData_temp;

	console.log(user_temp);
	return {
		type: types.UPDATE_MOVIE_RATING,
		new_userData: user_temp,
	};
};
