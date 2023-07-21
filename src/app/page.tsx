import { prisma } from '@/db'
import Link from 'next/link'
import { TodoItem } from '@/components/TodoItem'

function getTodos() {
  return prisma.todo.findMany();
}

async function toggleTodo (id : string, complete : boolean) {
  "use server"

  await prisma.todo.update({ where: { id }, data: { complete } })
}

export default async function HomePage() {

  const todos = await getTodos();

  // await prisma.todo.create({ data: { title: 'test', complete: false } })

  return (
    <>
    <header className='flex justify-between items-center mb-4'>
      <h1 className="text-7xl md:text-8xl">Todos</h1>
      <Link href="/new" 
      className='text-4xl md:text-5xl border border-slate-200 text-slate-200 
      px-5 py-3 rounded hover:bg-slate-700 focus-within:bg-slate-700 
      transition-all'>
        New
      </Link>
    </header>
    <ul className='pl-4'>
      {todos.map(todo => (
      <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo}/>
      ))}
    </ul>
    </>
  )
}