#[macro_use]
extern crate rocket;

pub mod controllers;
pub mod db;
pub mod error;
pub mod models;
pub mod schema;
pub mod services;

use dotenvy::dotenv;
use rocket::http::Method;
use rocket_cors::{AllowedOrigins, CorsOptions};

#[launch]
fn rocket() -> _ {
    dotenv().ok();

    let cors = CorsOptions::default()
        .allowed_origins(AllowedOrigins::All)
        .allowed_methods(
            vec![Method::Get, Method::Post, Method::Patch, Method::Delete]
                .into_iter()
                .map(From::from)
                .collect(),
        )
        .allow_credentials(true)
        .to_cors()
        .expect("Failed to build CORS");

    rocket::build()
        .attach(cors)
        .mount("/movies", controllers::movies::routes())
        .mount("/omdb", controllers::omdb::routes())
}
