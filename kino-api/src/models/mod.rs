use chrono::{NaiveDate, NaiveDateTime};
use diesel::prelude::*;
use rocket::serde::Serialize;

#[derive(Queryable, Selectable, Serialize)]
#[serde(crate = "rocket::serde")]
#[diesel(table_name = crate::schema::movies)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct Movie {
    pub id: i32,
    pub title: String,
    pub release_date: NaiveDate,
    pub genre: Option<String>,
    pub director: Option<String>,
    pub description: Option<String>,
    pub created_at: NaiveDateTime,
    pub updated_at: NaiveDateTime,
}
