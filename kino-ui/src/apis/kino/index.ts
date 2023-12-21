import { z } from 'zod'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IMovie, IOMDBMovie, MovieSchema, OMDBMovieSchema } from './types'
import { dateToDateString } from '@/utils'

export const kinoApi = createApi({
  reducerPath: 'kinoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  tagTypes: ['Movies'],
  endpoints: (builder) => ({
    getAllMovies: builder.query<IMovie[], void>({
      query: () => `/movies`,
      transformResponse: (data: unknown) => z.array(MovieSchema).parse(data),
      providesTags: ['Movies'],
    }),

    getMovieById: builder.query<IMovie, IMovie['id']>({
      query: (id) => `/movies/${id}`,
      transformResponse: (data: unknown) => MovieSchema.parse(data),
      providesTags: (_result, _err, arg) => [{ type: 'Movies', id: arg }],
    }),

    createMovie: builder.mutation<IMovie, IOMDBMovie>({
      query: (params) => ({
        url: `/movies`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          title: params.title,
          release_date:
            params.released !== null ? dateToDateString(params.released) : null,
          genre: params.genre,
          director: params.director,
          description: params.plot,
          poster_url: params.poster,
        },
      }),
      transformResponse: (data: unknown) => MovieSchema.parse(data),
      invalidatesTags: ['Movies'],
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
  useCreateMovieMutation,
  useSearchOMDBMovieByTitleQuery,
} = kinoApi
