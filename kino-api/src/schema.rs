// @generated automatically by Diesel CLI.

diesel::table! {
    movies (id) {
        id -> Int4,
        #[max_length = 255]
        title -> Varchar,
        release_date -> Date,
        #[max_length = 50]
        genre -> Nullable<Varchar>,
        #[max_length = 100]
        director -> Nullable<Varchar>,
        description -> Nullable<Text>,
        created_at -> Timestamp,
        updated_at -> Timestamp,
        #[max_length = 255]
        poster_url -> Nullable<Varchar>,
    }
}
