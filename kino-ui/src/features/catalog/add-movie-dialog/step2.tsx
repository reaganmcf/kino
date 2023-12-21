import { useMemo } from 'react'

import {
  DialogClose,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  useCreateMovieMutation,
  useSearchOMDBMovieByTitleQuery,
} from '@/apis/kino'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertTitle } from '@/components/ui/alert'
import MovieCard from '@/components/movie-card'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

interface AddMovieDialogStepTwoProps {
  movieTitle: string
  onClose: () => void
  onGoBack: () => void
}

const AddMovieDialogStepTwo: React.FC<AddMovieDialogStepTwoProps> = ({
  movieTitle,
  onGoBack,
  onClose,
}) => {
  const { data, isLoading, isError } =
    useSearchOMDBMovieByTitleQuery(movieTitle)
  const [createMovie, { isLoading: isLoadingCreateMovie }] =
    useCreateMovieMutation()
  const { toast } = useToast()

  const canAddMovie = data !== undefined

  const handleConfirm = () => {
    if (!canAddMovie) return

    createMovie(data)
      .unwrap()
      .then((result) => {
        toast({
          title: `Successfully added ${result.title}`,
        })
        setTimeout(onClose, 400)
      })
      .catch(() =>
        toast({
          title: `Failed to add ${data.title}. Please try again`,
          variant: 'destructive',
        })
      )
  }

  const Inner = useMemo(() => {
    if (isLoading) return <Skeleton className="w-96 h-96" />

    if (isError || data === undefined)
      return (
        <Alert className="w-fit">
          <AlertTitle>No movie found</AlertTitle>
        </Alert>
      )

    return (
      <MovieCard
        title={data.title}
        release_date={data.released}
        poster_url={data.poster}
        director={data.director}
        description={data.plot}
      />
    )
  }, [data, isLoading, isError])

  return (
    <>
      <DialogDescription className="min-h-[40vh] flex items-center justify-center">
        {Inner}
      </DialogDescription>

      <DialogFooter>
        <Button type="button" onClick={() => onGoBack()} variant="secondary">
          Back
        </Button>
        <DialogClose asChild>
          <Button
            type="submit"
            onClick={handleConfirm}
            disabled={!canAddMovie || isLoadingCreateMovie}
          >
            {isLoadingCreateMovie ? (
              <FontAwesomeIcon icon={faSpinner} />
            ) : (
              'Confirm'
            )}
          </Button>
        </DialogClose>
      </DialogFooter>
    </>
  )
}

export default AddMovieDialogStepTwo
