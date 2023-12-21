import { useGetAllMoviesQuery } from '@/apis/kino'
import Navbar from '../../components/navbar'
import { Alert, AlertTitle } from '@/components/ui/alert'
import MovieCard from '@/components/movie-card'
import AddMovieDialog from './add-movie-dialog'

export default function Catalog() {
  const { data, isError, isLoading } = useGetAllMoviesQuery()

  return (
    <div className="flex flex-col w-full min-h-screen overflow-x-hidden relative">
      <Navbar />

      <div className="flex flex-col w-full h-full py-8 px-8">
        <div className="flex items-center justify-center w-full h-full">
          {isLoading && !isError ? <p>Loading...</p> : null}
          {(isError || data === undefined) && !isLoading ? (
            <Alert variant="destructive" className="w-fit">
              <AlertTitle>Failed to load movies</AlertTitle>
            </Alert>
          ) : null}
          {data !== undefined && !isError && !isLoading ? (
            <div className="columns-1 sm:columns-3 lg:columns-4 gap-8">
              {data.map((movie) => (
                <div key={movie.id} className="pb-8 flex min-w-full">
                  <MovieCard id={movie.id} />
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <AddMovieDialog />
    </div>
  )
}
