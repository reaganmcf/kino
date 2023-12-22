use chrono::{NaiveDate, NaiveDateTime};
use diesel::prelude::*;
use serde::{Serialize, Deserialize};

#[derive(Queryable, Selectable, Serialize)]
#[diesel(table_name = crate::schema::movies)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct Movie {
    pub id: i32,
    pub title: String,
    pub release_date: Option<NaiveDate>,
    pub genre: Option<String>,
    pub director: Option<String>,
    pub description: Option<String>,
    pub poster_url: Option<String>,
    pub created_at: NaiveDateTime,
    pub updated_at: NaiveDateTime,
}

#[derive(Insertable, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::movies)]
pub struct NewMovie<'a> {
    pub title: &'a str,
    pub release_date: Option<NaiveDate>,
    pub genre: Option<&'a str>,
    pub director: Option<&'a str>,
    pub description: Option<&'a str>,
    pub poster_url: Option<&'a str>
}
