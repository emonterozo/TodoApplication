export type Status = 'Pending' | 'In Progress' | 'Completed'

export type Todo = {
    id: string
    title: string
    status: Status
    dueDate: string
}