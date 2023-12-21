use diesel::result::Error;
use diesel::{ExpressionMethods, QueryDsl, RunQueryDsl, SelectableHelper};

use crate::models::NewMovie;
use crate::{db::establish_connection, models::Movie};

use crate::schema::movies::dsl::*;

pub fn get_all_movies() -> Result<Vec<Movie>, Error> {
    let conn = &mut establish_connection();

    let mut result = movies.select(Movie::as_select()).load(conn)?;
    result.sort_by_key(|m| -m.id);

    Ok(result)
}

pub fn get_movie_by_id(movie_id: i32) -> Result<Option<Movie>, Error> {
    let conn = &mut establish_connection();

    let results = movies
        .filter(id.eq(movie_id))
        .limit(1)
        .select(Movie::as_select())
        .load::<Movie>(conn)?;

    Ok(results.into_iter().nth(0))
}

pub fn create_movie(movie: NewMovie) -> Result<Movie, Error> {
    let conn = &mut establish_connection();

    diesel::insert_into(movies)
        .values(&movie)
        .returning(Movie::as_returning())
        .get_result(conn)
}

pub fn delete_movie_by_id(movie_id: i32) -> Result<bool, Error> {
    let conn = &mut establish_connection();

    let num_deleted = diesel::delete(movies.filter(id.eq(movie_id))).execute(conn)?;

    return Ok(num_deleted == 1);
}
