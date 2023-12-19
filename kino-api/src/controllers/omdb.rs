use rocket::serde::json::Json;
use rocket::Route;
use std::env;

use crate::{error::ApiError, models::OMDBMovie};

fn get_omdb_api_key() -> String {
    env::var("OMDB_API_KEY").expect("OMDB_API_KEY must be set")
}

#[get("/search/<title>")]
async fn search_omdb_movies_by_title(title: &str) -> Result<Json<OMDBMovie>, ApiError> {
    let apikey = get_omdb_api_key();
    let url = format!("https://omdbapi.com/?t={title}&apikey={apikey}");
    let req = reqwest::get(url).await?;
    let resp = req.json::<OMDBMovie>().await?;

    Ok(Json(resp))
}

pub fn routes() -> Vec<Route> {
    routes![search_omdb_movies_by_title]
}
