#[macro_use]
extern crate rocket;

pub mod controllers;
pub mod db;
pub mod error;
pub mod models;
pub mod schema;
pub mod services;

#[launch]
fn rocket() -> _ {
    rocket::build().mount("/movies", controllers::movies::routes())
}
