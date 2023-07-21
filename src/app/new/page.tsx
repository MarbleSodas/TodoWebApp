import Link from 'next/link'
import { prisma } from '@/db'
import { redirect } from 'next/navigation'

async function createTodo(data : FormData) {
    "use server"

    const title = data.get("title")?.valueOf()
    if(typeof title !== "string" || title.length === 0) {
        throw new Error("Invalid Title");
    }

    await prisma.todo.create({ data: { title, complete: false } })
    redirect("/")
}

export default function NewTodo() {
    return <>
        <header className='flex justify-between items-center mb-4'>
        <h1 className="text-7xl md:text-8xl">New Todo</h1>
        <Link href="/" 
        className='text-4xl md:text-5xl border border-slate-200 text-slate-200 
        px-5 py-3 rounded hover:bg-slate-700 focus-within:bg-slate-700 
        transition-all'>
            Back
        </Link>
        </header>
        <form action={createTodo} className='flex gap-2 flex-col'>
            <input type="text" className='text-4xl md:text-5xl border rounded border-slate-200 text-slate-200 bg-transparent p-2 m-4' 
            name="title"
            placeholder='Title'/>
            <div className='flex gap-2 justify-end p-2 m-2'>
            <Link href="/" 
                className='text-3xl md:text-4xl border border-slate-200 text-slate-200 
                px-5 py-3 rounded hover:bg-slate-700 focus-within:bg-slate-700 
                transition-all'>
                    Cancel
            </Link>
                <button type="submit" className='text-3xl md:text-4xl border border-slate-200 text-slate-200 
                px-5 py-3 rounded hover:bg-slate-700 focus-within:bg-slate-700 
                transition-all'>Create</button>
            </div>
        </form>
    </>
}