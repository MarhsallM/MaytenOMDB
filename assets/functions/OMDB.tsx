const APIkey = "74f58c22";
const og_uri = "http://www.omdbapi.com/?apikey=" + APIkey + "&s=";
const img_og_uri = "http://img.omdbapi.com/?apikey=" + APIkey + "&s=";
const og_uri_full_plot =
	"http://www.omdbapi.com/?apikey=" + APIkey + "&plot=full&i=";

export const search_movie = (title: string, year: string): any => {
	let uri = og_uri + title;

	if (year.length == 4) {
		uri = uri + "&y=" + year;
	}

	return fetch(uri)
		.then((response) => response.json())
		.catch((error) => console.error(error));
};

export const get_full_infos = (id: string): any => {
	let uri = og_uri_full_plot + id;

	return fetch(uri)
		.then((response) => response.json())
		.catch((error) => console.error(error));
};
