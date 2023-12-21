import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface AddMovieDialogStepOneProps {
  onNextStep: (title: string) => void
}

const AddMovieDialogStepOne: React.FC<AddMovieDialogStepOneProps> = ({
  onNextStep,
}) => {
  const [title, setTitle] = useState('')

  return (
    <>
      <DialogDescription>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          type="text"
          className="mt-2"
          onChange={(e) => setTitle(e.target.value)}
        />
      </DialogDescription>

      <DialogFooter>
        <DialogClose asChild>
          <Button type="submit" variant="secondary">
            Close
          </Button>
        </DialogClose>
        <Button
          type="button"
          onClick={() => onNextStep(title)}
          disabled={title.trim().length === 0}
        >
          Next
        </Button>
      </DialogFooter>
    </>
  )
}

export default AddMovieDialogStepOne
