import { Card } from "@tremor/react";
import { TaskTable } from "../../../shared/ui/task-table";

export const TasksPage = () => {
  return (
    <main className="max-w-4xl mx-auto my-12">
      <Card>
        <TaskTable />
      </Card>
    </main>
  );
};
