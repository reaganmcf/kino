import React, { useState } from 'react'

import { IMovie } from '../apis/kino/types'
import { Card, CardContent, CardTitle } from './ui/card'
import { useGetMovieByIdQuery } from '@/apis/kino'
import { Skeleton } from './ui/skeleton'
import { Alert, AlertTitle } from './ui/alert'

type BaseMovieCardProps = Pick<
  IMovie,
  'title' | 'director' | 'description' | 'genre' | 'poster_url' | 'release_date'
>

const BaseMovieCard: React.FC<BaseMovieCardProps> = ({
  title,
  director,
  description,
  genre,
  poster_url,
  release_date,
}) => {
  const [imageUrl, setImageUrl] = useState(poster_url ?? '/placeholder.png')

  return (
    <Card className="max-w-sm shadow-sm min-w-full break-inside-avoid">
      <img
        src={imageUrl}
        onError={() => setImageUrl('/placeholder.png')}
        className="w-full height-full object-cover overflow-hidden rounded-t-lg"
      />
      <CardContent className="py-4">
        <CardTitle className="pb-2">{title}</CardTitle>
        {genre ? <Badge>{genre}</Badge> : null}
        <div className="pt-2">
          {description ? <p>{description}</p> : null}
          {director ? <p className="text-sm">Director: {director}</p> : null}
          {release_date ? <p className="text-sm">Release Date: {release_date.toDateString()}</p> : null}
        </div>
      </CardContent>
    </Card>
  )
}

type MovieCardFromIdProps = Pick<IMovie, 'id'>

const MovieCardFromId: React.FC<MovieCardFromIdProps> = ({ id }) => {
  const { data, isLoading, isError } = useGetMovieByIdQuery(id)

  if (isLoading) return <Skeleton className="w-20 h-40" />

  if (isError || data === undefined)
    return (
      <Alert variant="destructive">
        <AlertTitle>Failed to load movie</AlertTitle>
      </Alert>
    )

  return <BaseMovieCard {...data} />
}

type MovieCardProps = MovieCardFromIdProps | BaseMovieCardProps

const MovieCard: React.FC<MovieCardProps> = (props) => {
  if ('title' in props) return <BaseMovieCard {...props} />

  return <MovieCardFromId id={props.id} />
}

export default MovieCard
import { Badge } from './ui/badge'

