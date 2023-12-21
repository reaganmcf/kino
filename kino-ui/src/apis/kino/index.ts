import { z } from 'zod'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IMovie, IOMDBMovie, MovieSchema, OMDBMovieSchema } from './types'

export const kinoApi = createApi({
  reducerPath: 'kinoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  endpoints: (builder) => ({
    getAllMovies: builder.query<IMovie[], void>({
      query: () => `/movies`,
      transformResponse: (data: unknown) => z.array(MovieSchema).parse(data),
    }),
    getMovieById: builder.query<IMovie, IMovie['id']>({
      query: (id) => `/movies/${id}`,
      transformResponse: (data: unknown) => MovieSchema.parse(data),
    }),
    searchOMDBMovieByTitle: builder.query<IOMDBMovie, string>({
      query: (title) => `/omdb/search/${title}`,
      transformResponse: (data: unknown) => OMDBMovieSchema.parse(data),
    }),
  }),
})

export const {
  useGetAllMoviesQuery,
  useGetMovieByIdQuery,
  useSearchOMDBMovieByTitleQuery,
} = kinoApi
