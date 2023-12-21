import React from 'react'

import { IMovie } from '../apis/kino/types'
import { Card, CardContent, CardTitle } from './ui/card'
import { useGetMovieByIdQuery } from '@/apis/kino'
import { Skeleton } from './ui/skeleton'
import { Alert, AlertTitle } from './ui/alert'

type BaseMovieCardProps = Pick<
  IMovie,
  'title' | 'director' | 'description' | 'poster_url' | 'release_date'
>

const BaseMovieCard: React.FC<BaseMovieCardProps> = ({
  title,
  director,
  description,
  poster_url,
  release_date,
}) => {
  return (
    <Card className="max-w-sm shadow-sm w-fit break-inside-avoid">
      <img
        src={poster_url ?? '/placeholder.png'}
        className="w-full height-full object-cover overflow-hidden rounded-t-lg"
      />
      <CardContent className="py-4">
        <CardTitle className="pb-2">{title}</CardTitle>
        <p>{description}</p>
        <div className="pt-4">
          <p className="text-sm">Director: {director}</p>
          <p className="text-sm">Release Date: {release_date.toDateString()}</p>
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
