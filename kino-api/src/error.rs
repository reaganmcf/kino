use std::io::Cursor;

use diesel::result::Error as DieselError;
use rocket::{
    http::{ContentType, Status},
    response::Responder,
    serde::json::Error as JsonError,
    Response,
};
use serde::Serialize;

#[derive(Serialize)]
pub enum ApiError {
    NotFound(String),
    JsonParseFailure(String),
    DbError(String),
    Unknown,
}

impl From<JsonError<'_>> for ApiError {
    fn from(value: JsonError) -> Self {
        Self::JsonParseFailure(value.to_string())
    }
}

impl From<DieselError> for ApiError {
    fn from(value: DieselError) -> Self {
        Self::DbError(value.to_string())
    }
}

impl ApiError {
    fn get_http_status(&self) -> Status {
        match self {
            Self::NotFound(_) => Status::NotFound,
            Self::JsonParseFailure(_) => Status::BadRequest,
            Self::DbError(_) => Status::InternalServerError,
            Self::Unknown => Status::BadRequest,
        }
    }
}

impl<'r> Responder<'r, 'static> for ApiError {
    fn respond_to(self, _request: &'r rocket::Request<'_>) -> rocket::response::Result<'static> {
        let err_response = serde_json::to_string(&self).unwrap();

        Response::build()
            .status(self.get_http_status())
            .header(ContentType::JSON)
            .sized_body(err_response.len(), Cursor::new(err_response))
            .ok()
    }
}
