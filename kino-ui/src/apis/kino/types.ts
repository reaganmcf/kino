import { z } from 'zod'

export const OMDBMovieSchema = z.object({
  title: z.string(),
  year: z.string().transform((year) => parseInt(year)),
  released: z.string().transform((released) => new Date(released)),
  director: z.string(),
  genre: z.string(),
  plot: z.string(),
  poster: z.string(),
})

export type IOMDBMovie = z.infer<typeof OMDBMovieSchema>

export const MovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  release_date: z.string().transform((d) => new Date(d)),
  director: z.string(),
  description: z.string(),
  created_at: z.string().transform((d) => new Date(d)),
  updated_at: z.string().transform((d) => new Date(d)),
  poster_url: z.string().nullable(),
})

export type IMovie = z.infer<typeof MovieSchema>
