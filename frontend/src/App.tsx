import { Card } from "@tremor/react";
import { TaskTable } from "./shared/ui/task-table";

function App() {
  return (
    <div className="container mx-auto my-12">
      <Card>
        <TaskTable />
      </Card>

    </div>
  );
}

export default App;
