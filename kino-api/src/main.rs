#[macro_use]
extern crate rocket;

pub mod db;
pub mod models;
pub mod controllers;
pub mod schema;

use rocket::tokio::time::{sleep, Duration};

#[get("/")]
fn index() -> &'static str {
    "Hello, world!"
}

#[get("/delay/<seconds>")]
async fn delay(seconds: u64) -> String {
    sleep(Duration::from_secs(seconds)).await;
    format!("Waited for {} seconds", seconds)
}

#[launch]
fn rocket() -> _ {
    rocket::build().mount("/", routes![index, delay])
        .mount("/movies", controllers::movies::routes())
}
