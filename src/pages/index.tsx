import { CheckIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  HStack,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { type inferTransformedProcedureOutput } from "@trpc/server/shared";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";
import { type AppRouter } from "~/server/api/root";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { data: session } = useSession();

  return (
    <>
      <Navbar />
      {session ? <Dashboard /> : <Landing />}
      <Footer />
    </>
  );
};

export default Home;

const Landing: React.FC = () => {
  return (
    <div>
      <h1>Landing</h1>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const taskQuery = api.task.getAll.useQuery();

  return (
    <div>
      <h1>Dashboard</h1>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Task</Th>
              <Th>Created</Th>
              <Th>Completed</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {taskQuery.data?.map((task) => (
              <TodoItem key={task.id} task={task} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

const TodoItem: React.FC<{
  task: inferTransformedProcedureOutput<AppRouter["task"]["get"]>;
}> = ({ task }) => {
  const deleteTask = api.task.delete.useMutation();
  const completeTask = api.task.complete.useMutation();

  return (
    <Tr width="full">
      <Td>{task.title}</Td>
      <Td>{task.createdAt.toLocaleDateString()}</Td>
      <Td>{task.completed ? "True" : "False"}</Td>
      <Td as={HStack} spacing={1}>
        <IconButton
          onClick={() => void completeTask.mutate({ id: task.id })}
          icon={<CheckIcon />}
          size="sm"
          aria-label="complete task"
        />
        <IconButton
          onClick={() => void deleteTask.mutate({ id: task.id })}
          icon={<DeleteIcon />}
          size="sm"
          aria-label="delete task"
        />
      </Td>
    </Tr>
  );
};
