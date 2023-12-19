use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct OMDBMovie {
    #[serde(rename(deserialize = "Title"))]
    pub title: String,
    #[serde(rename(deserialize = "Year"))]
    pub year: String,
    #[serde(rename(deserialize = "Released"))]
    pub released: String,
    #[serde(rename(deserialize = "Director"))]
    pub director: String,
    #[serde(rename(deserialize = "Genre"))]
    pub genre: String,
    #[serde(rename(deserialize = "Plot"))]
    pub plot: String,
    #[serde(rename(deserialize = "Poster"))]
    pub poster: String,
}
