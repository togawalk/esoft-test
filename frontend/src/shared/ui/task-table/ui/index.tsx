import {
  DatePicker,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Select,
  SelectItem,
} from "@tremor/react";
import { Dialog, DialogPanel, TextInput } from "@tremor/react";
import { RiCloseLine } from "@remixicon/react";
import { useState } from "react";
import { tasksService } from "../../../../api.tasks";
import { useQuery } from "react-query";
import { AxiosError } from "axios";
import { getTaskHeaderColor } from "../../../../utils/getTaskHeaderColor";

export const TaskTable = () => {
  const role = localStorage.getItem("role");
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading, isError, error } = useQuery(["data"], () =>
    tasksService.getTasks(),
  );

  if (isError) {
    const errorData = error as Error | AxiosError;
    return (
      <div className="flex justify-center">
        <p className="text-4xl font-medium text-foreground-lighter">
          {errorData.message}
        </p>
      </div>
    );
  }

  const tasks = data?.data ?? [];
  console.log("Data:", tasks);

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        static={true}
        className="z-[100]"
      >
        <DialogPanel className="sm:max-w-md">
          <div className="absolute right-0 top-0 pr-3 pt-3">
            <button
              type="button"
              className="rounded-tremor-small p-2 text-tremor-content-subtle hover:bg-tremor-background-subtle hover:text-tremor-content dark:text-dark-tremor-content-subtle hover:dark:bg-dark-tremor-background-subtle hover:dark:text-tremor-content"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
            >
              <RiCloseLine className="h-5 w-5 shrink-0" aria-hidden={true} />
            </button>
          </div>
          <form action="#" method="POST">
            <h4 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Создать задачу
            </h4>
            <p className="mt-2 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
              Lorem ipsum dolor sit amet.
            </p>
            <div className="mt-4 space-y-3">
              <div>
                <label
                  htmlFor="transfer-ownership"
                  className="block text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                >
                  Title
                </label>
                <TextInput
                  id="transfer-ownership"
                  name="transfer-ownership"
                  type="text"
                  className="mt-2"
                  placeholder=""
                />
              </div>
              <div>
                <label
                  htmlFor="transfer-ownership"
                  className="block text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                >
                  Description
                </label>
                <TextInput
                  id="transfer-ownership"
                  name="transfer-ownership"
                  type="text"
                  className="mt-2"
                  placeholder=""
                />
              </div>
              <div>
                <label
                  htmlFor="transfer-ownership"
                  className="block text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                >
                  Description
                </label>
                <DatePicker className="mt-2" />
              </div>
              <div>
                <label
                  htmlFor="transfer-ownership"
                  className="block text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                >
                  Priority
                </label>
                <Select defaultValue="HIGH" className="mt-2">
                  <SelectItem value="HIGH">High</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="LOW">Low</SelectItem>
                </Select>
              </div>
              <div>
                <label
                  htmlFor="transfer-ownership"
                  className="block text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                >
                  Status
                </label>
                <Select defaultValue="TODO" className="mt-2">
                  <SelectItem value="TODO">Todo</SelectItem>
                  <SelectItem value="IN_PROGRESS">In progress</SelectItem>
                  <SelectItem value="DONE">Done</SelectItem>
                  <SelectItem value="CANCELED">Canceled</SelectItem>
                </Select>
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 w-full whitespace-nowrap rounded-tremor-default bg-tremor-brand px-4 py-2 text-center text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis"
            >
              Создать
            </button>
          </form>
        </DialogPanel>
      </Dialog>

      <div className="sm:flex sm:items-center sm:justify-between sm:space-x-10">
        <div>
          <h3 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
            Задачи
          </h3>
          <p className="mt-1 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Dignissimos, itaque.
          </p>
        </div>
        {role === "ADMIN" ? (
          <button
            type="button"
            className="mt-4 w-full whitespace-nowrap rounded-tremor-small bg-tremor-brand px-4 py-2.5 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis sm:mt-0 sm:w-fit"
            onClick={() => setIsOpen(true)}
          >
            Создать задачу
          </button>
        ) : null}
      </div>
      <Table className="mt-8">
        <TableHead>
          <TableRow className="border-b border-tremor-border dark:border-dark-tremor-border">
            <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Заголовок
            </TableHeaderCell>
            <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Приоритет
            </TableHeaderCell>
            <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Дата окончания
            </TableHeaderCell>
            <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Ответственный
            </TableHeaderCell>
            <TableHeaderCell className="text-right text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Статус
            </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task, index) => (
            <TableRow key={index}>
              <TableCell
                className={`font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong ${getTaskHeaderColor(task)}`}
              >
                {task.title}
              </TableCell>
              <TableCell>{task.priority}</TableCell>
              <TableCell>
                {new Date(task.dueDate).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {task.responsible.firstName} {task.responsible.lastName}
              </TableCell>
              <TableCell className="text-right">{task.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
