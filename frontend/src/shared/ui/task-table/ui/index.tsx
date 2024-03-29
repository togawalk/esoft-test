import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@tremor/react';

const data = [
  {
    title: 'Покормить кота',
    priority: 'HIGH',
    dueDate: new Date('2024-04-15'),
    responsible: 'Алиса',
    status: 'IN_PROGRESS'
  },
  {
    title: 'Наклеить стикеры',
    priority: 'HIGH',
    dueDate: new Date('2024-04-18'),
    responsible: 'Алиса',
    status: 'IN_PROGRESS'
  },
  {
    title: 'Наклеить стикеры',
    priority: 'HIGH',
    dueDate: new Date('2024-04-18'),
    responsible: 'Алиса',
    status: 'IN_PROGRESS'
  },
];


export const TaskTable = () => {
  return (
    <>
      <div className="sm:flex sm:items-center sm:justify-between sm:space-x-10">
        <div>
          <h3 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
            Задачи
          </h3>
          <p className="mt-1 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, itaque.
          </p>
        </div>
        <button
          type="button"
          className="mt-4 w-full whitespace-nowrap rounded-tremor-small bg-tremor-brand px-4 py-2.5 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis sm:mt-0 sm:w-fit"
        >
          Создать задачу
        </button>
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
          {data.map((task, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                {task.title}
              </TableCell>
              <TableCell>{task.priority}</TableCell>
              <TableCell>{task.dueDate.toDateString()}</TableCell>
              <TableCell>{task.responsible}</TableCell>
              <TableCell className="text-right">{task.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>

  )
}

