import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import React, { useState } from 'react'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { createMachine } from 'xstate'
import { useMachine } from '@xstate/react'
import AddMovieDialogStepOne from './step1'
import AddMovieDialogStepTwo from './step2'
import { flushSync } from 'react-dom'

const dialogMachine = createMachine({
  id: 'addMovieDialog',
  context: { movieTitle: '' },
  initial: 'StepOne',
  states: {
    StepOne: {
      on: {
        next: {
          target: 'StepTwo',
          actions: ({ context, event }) =>
            (context.movieTitle = event.movieTitle),
        },
        reset: {
          target: 'StepOne',
          actions: ({ context }) => (context.movieTitle = ''),
        },
      },
    },
    StepTwo: {
      on: {
        back: 'StepOne',
        reset: {
          target: 'StepOne',
          actions: ({ context }) => (context.movieTitle = ''),
        },
      },
    },
  },
})

const AddMovieDialog: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [current, send] = useMachine(dialogMachine)

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) send({ type: 'reset' })
        setOpen(open)
      }}
    >
      <Button
        className="fixed bottom-4 left-4 drop-shadow-2xl w-12 h-12 rounded-full"
        onClick={() => setOpen(true)}
      >
        <FontAwesomeIcon icon={faPlus} size="2xl" />
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Movie</DialogTitle>
        </DialogHeader>
        {current.value === 'StepOne' && (
          <AddMovieDialogStepOne
            onNextStep={(title) => send({ type: 'next', movieTitle: title })}
          />
        )}
        {current.value === 'StepTwo' && (
          <AddMovieDialogStepTwo
            movieTitle={current.context.movieTitle}
            onClose={() => {
              send({ type: 'reset' })
              flushSync(() => {
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                })
              })
            }}
            onGoBack={() => send({ type: 'back' })}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

export default AddMovieDialog
