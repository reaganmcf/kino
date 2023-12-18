use diesel::prelude::*;
use rocket::Route;
use rocket::serde::json::Json;

use crate::{db::establish_connection, models::Movie};

use crate::schema::movies::dsl::*;

#[get("/")]
pub fn get_movies() -> Json<Vec<Movie>> {
    let conn = &mut establish_connection();

    let results = movies
        .select(Movie::as_select())
        .load::<Movie>(conn);

    match results {
        Ok(other_movies) => Json(other_movies),
        Err(_) => Json(vec![]),
    }
}

pub fn routes() -> Vec<Route> {
    routes![get_movies]
}
