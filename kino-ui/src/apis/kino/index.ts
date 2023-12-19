import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IOMDBMovie, OMDBMovieSchema } from "./types";

export const kinoApi = createApi({
  reducerPath: 'kinoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000',  }),
  endpoints: (builder) => ({
    searchOMDBMovieByTitle: builder.query<IOMDBMovie, string>({
      query: (title) => `/omdb/search/${title}`,
      transformResponse: (data: unknown) => OMDBMovieSchema.parse(data),
    })
  })
});

export const { useSearchOMDBMovieByTitleQuery } = kinoApi;
