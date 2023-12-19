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
