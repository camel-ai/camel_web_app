import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { type SubmitHandler, useForm } from "react-hook-form"

import { type ApiError, type TaskCreate, TasksService } from "../../client"
import useCustomToast from "../../hooks/useCustomToast"
import { handleError } from "../../utils"

interface AddTaskProps {
  isOpen: boolean
  onClose: () => void
}

const AddTask = ({ isOpen, onClose }: AddTaskProps) => {
  const queryClient = useQueryClient()
  const showToast = useCustomToast()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TaskCreate>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      subtasks: 2,
      duration: 5,
    },
  })

  const mutation = useMutation({
    mutationFn: (data: TaskCreate) =>
      TasksService.createTask({ requestBody: data }),
    onSuccess: () => {
      showToast("Success!", "Task created successfully.", "success")
      reset()
      onClose()
    },
    onError: (err: ApiError) => {
      handleError(err, showToast)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
    },
  })

  const onSubmit: SubmitHandler<TaskCreate> = (data) => {
    mutation.mutate(data)
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "sm", md: "md" }}
        isCentered
      >
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Add Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired isInvalid={!!errors.subtasks}>
              <FormLabel htmlFor="subtasks">Subtasks</FormLabel>
              <Input
                id="subtasks"
                {...register("subtasks", {
                  required: "The number of subtasks is required.",
                })}
                placeholder="Title"
                type="text"
              />
              {errors.subtasks && (
                <FormErrorMessage>{errors.subtasks.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.duration}>
              <FormLabel htmlFor="duration">Duration</FormLabel>
              <Input
                id="duration"
                {...register("duration", {
                  required: "The duration of each subtask is required.",
                })}
                placeholder="Duration"
                type="text"
              />
              {errors.duration && (
                <FormErrorMessage>{errors.duration.message}</FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter gap={3}>
            <Button variant="primary" type="submit" isLoading={isSubmitting}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddTask
