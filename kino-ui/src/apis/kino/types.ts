import { z } from 'zod'

const isNA = (s: string) => s.trim().toUpperCase() === 'N/A'

export const OMDBMovieSchema = z.object({
  title: z.string(),
  year: z.string().transform((year) => parseInt(year)),
  released: z.string().transform((released) => {
    if (isNA(released)) return null

    return new Date(released)
  }),
  director: z.string().transform((director) => {
    if (isNA(director)) return null

    return director
  }),
  genre: z.string().transform((genre) => {
    if (isNA(genre)) return null

    return genre
  }),
  plot: z.string().transform((plot) => {
    if (isNA(plot)) return null

    return plot
  }),
  poster: z.string().transform((poster) => {
    if (isNA(poster)) return null

    return poster
  }),
})

export type IOMDBMovie = z.infer<typeof OMDBMovieSchema>

export const MovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  release_date: z
    .string()
    .nullable()
    .transform((d) => (d !== null ? new Date(d) : null)),
  genre: z.string().nullable(),
  director: z.string().nullable(),
  description: z.string().nullable(),
  poster_url: z.string().nullable(),
  created_at: z.string().transform((d) => new Date(d)),
  updated_at: z.string().transform((d) => new Date(d)),
})

export type IMovie = z.infer<typeof MovieSchema>
