import { type NextPage } from "next";
import { useState } from "react";
import Navbar from "~/components/Navbar";
import { api } from "~/utils/api";

const Tasks: NextPage = () => {
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");

  const taskQuery = api.task.getAll.useQuery();
  const taskMutation = api.task.create.useMutation();
  const deleteTaskMutation = api.task.delete.useMutation();

  return (
    <div>
      <Navbar />
      <h1>Tasks</h1>
      <ul>
        {taskQuery.data?.map((task) => (
          <li key={task.id}>
            {task.title}{" "}
            <button
              className="text-red-500"
              onClick={() => void deleteTaskMutation.mutate({ id: task.id })}
            >
              delete
            </button>
          </li>
        ))}
      </ul>

      <h2>Submit Task</h2>
      <input type="text" onChange={(e) => setNewTaskTitle(e.target.value)} />
      <button onClick={() => void taskMutation.mutate({ title: newTaskTitle })}>
        Submit
      </button>
    </div>
  );
};

export default Tasks;
