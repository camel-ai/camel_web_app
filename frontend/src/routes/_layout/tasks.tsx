import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  SkeletonText,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Progress,
} from "@chakra-ui/react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useEffect } from "react"
import { z } from "zod"

import {Task, TasksService} from "../../client"
import ActionsMenu from "../../components/Common/ActionsMenu"
import Navbar from "../../components/Common/Navbar"
import AddTask from "../../components/Tasks/AddTask"

const tasksSearchSchema = z.object({
  page: z.number().catch(1),
})

export const Route = createFileRoute("/_layout/tasks")({
  component: Tasks,
  validateSearch: (search) => tasksSearchSchema.parse(search),
})

interface AutoRefetchProps {
  refetch: () => void
  intervalMs: number
  shouldRefetch: boolean
}

export function useAutoRefetch({ refetch, intervalMs, shouldRefetch }: AutoRefetchProps) {
  useEffect(() => {
    if (!shouldRefetch) return

    const interval = setInterval(() => {
      refetch()
    }, intervalMs)

    return () => {
      clearInterval(interval) // 确保定时器被清理
    }
  }, [refetch, intervalMs, shouldRefetch])
}

const PER_PAGE = 5

function getTasksQueryOptions({ page }: { page: number }) {
  return {
    queryFn: () =>
      TasksService.getMyTasks({ skip: (page - 1) * PER_PAGE, limit: PER_PAGE }),
    queryKey: ["tasks", { page }],
  }
}

function TasksTable() {
  const queryClient = useQueryClient()
  const { page } = Route.useSearch()
  const navigate = useNavigate({ from: Route.fullPath })
  const setPage = (page: number) =>
    navigate({ search: (prev) => ({ ...prev, page }) })

  const {
    data: tasks,
    isPending,
    isPlaceholderData,
    refetch,
  } = useQuery({
    ...getTasksQueryOptions({ page }),
    placeholderData: (prevData) => prevData,
  })

  const hasNextPage = false
  const hasPreviousPage = page > 1

  const shouldRefetch = !!(tasks?.data && tasks.data.length > 0)

  useAutoRefetch({ refetch, intervalMs: 3000, shouldRefetch })

  useEffect(() => {
    if (hasNextPage) {
      queryClient.prefetchQuery(getTasksQueryOptions({ page: page + 1 }))
    }
  }, [page, queryClient, hasNextPage])

  return (
    <>
      <TableContainer>
        <Table size={{ base: "sm", md: "md" }}>
          <Thead>
            <Tr>
              <Th>Task ID</Th>
              <Th>Status</Th>
              <Th>SubTasks</Th>
              <Th>Progress</Th>
              <Th>Error</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          {isPending ? (
            <Tbody>
              {new Array(5).fill(null).map((_, rowIndex) => (
                <Tr key={rowIndex}>
                  {new Array(5).fill(null).map((_, colIndex) => (
                    <Td key={colIndex}>
                      <SkeletonText noOfLines={1} paddingBlock="16px" />
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          ) : (
            <Tbody>
              {tasks?.data && tasks?.data.map((task: Task) => (
                <Tr key={task.task_id} opacity={isPlaceholderData ? 0.5 : 1}>
                  <Td isTruncated maxWidth="150px">{task.task_id}</Td>
                  <Td>
                    <Flex gap={2}>
                      <Box
                        w="2"
                        h="2"
                        borderRadius="50%"
                        bg={task.status !== "PENDING" ? "ui.success" : "ui.danger"}
                        alignSelf="center"
                      />
                      {task.status}
                    </Flex>
                  </Td>
                  <Td isTruncated maxWidth="150px">
                    {task.progress?.total}
                  </Td>
                  <Td isTruncated maxWidth="150px">
                    <Progress
                      hasStripe
                      isAnimated
                      value={task.progress?.percentage}
                      colorScheme={"teal"}
                    /> {task.progress?.percentage || 0}%
                  </Td>
                  <Td isTruncated maxWidth="150px">
                    {task.error || "N/A"}
                  </Td>
                  <Td>
                    <ActionsMenu
                      type="Task"
                      value={task}
                      disabled={false}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          )}
        </Table>
      </TableContainer>
      <Flex
        gap={4}
        alignItems="center"
        mt={4}
        direction="row"
        justifyContent="flex-end"
      >
        <Button onClick={() => setPage(page - 1)} isDisabled={!hasPreviousPage}>
          Previous
        </Button>
        <span>Page {page}</span>
        <Button isDisabled={!hasNextPage} onClick={() => setPage(page + 1)}>
          Next
        </Button>
      </Flex>
    </>
  )
}

function Tasks() {
  return (
    <Container maxW="full">
      <Heading size="lg" textAlign={{ base: "center", md: "left" }} pt={12}>
        Tasks Management
      </Heading>

      <Navbar type={"Task"} addModalAs={AddTask} />
      <TasksTable />
    </Container>
  )
}
