use rocket::serde::json::Error as JsonError;
use rocket::serde::json::Json;
use rocket::Route;

use crate::error::ApiError;
use crate::models::Movie;
use crate::models::NewMovie;
use crate::services::movies as movie_service;

#[get("/")]
fn get_movies() -> Result<Json<Vec<Movie>>, ApiError> {
    let all_movies = movie_service::get_all_movies()?;

    Ok(Json(all_movies))
}

#[get("/<movie_id>")]
fn get_movie_by_id(movie_id: i32) -> Result<Json<Movie>, ApiError> {
    match movie_service::get_movie_by_id(movie_id)? {
        Some(movie) => Ok(Json(movie)),
        None => Err(ApiError::NotFound(format!("id {} was not found", movie_id))),
    }
}

#[post("/", data = "<movie>")]
fn create_movie(movie: Result<Json<NewMovie>, JsonError>) -> Result<Json<Movie>, ApiError> {
    let new_movie = movie?;
    let result = movie_service::create_movie(new_movie.into_inner())?;

    Ok(Json(result))
}

#[delete("/<movie_id>")]
fn delete_movie_by_id(movie_id: i32) -> Result<Json<bool>, ApiError> {
    if movie_service::get_movie_by_id(movie_id)?.is_none() {
        return Err(ApiError::NotFound(format!("id {} was not found", movie_id)));
    }

    let result = movie_service::delete_movie_by_id(movie_id)?;

    Ok(Json(result))
}

pub fn routes() -> Vec<Route> {
    routes![
        get_movies,
        get_movie_by_id,
        create_movie,
        delete_movie_by_id
    ]
}
