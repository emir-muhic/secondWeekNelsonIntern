import Link from "next/link"
import Image from 'next/image'

const Hero = () => {
    return (
        <section className="flex flex-wrap items-center font-sans px-4 mx-auto lg:px-44 w-full lg:max-w-screen-2xl sm:max-w-screen-sm md:max-w-screen-md py-20">
            <div className="px-3 w-full lg:w-2/4">
                <div className="mx-auto mb-8 max-w-lg text-center lg:mx-0 lg:text-left">
                    <h2 className="mb-4 text-3xl font-bold text-left lg:text-5xl">
                        A simple application for 
                        <span className="text-5xl text-blue-500 leading-relaxeds"> creating and managing tasks.</span>
                    </h2>
                    <p className="visible mx-0 mt-3 mb-0 text-sm leading-relaxed text-left text-slate-400">
                        Todo list is the best way to stay organised and get things done. todo list is a free task management app. No more juggling multiple apps just to manage your life.
                    </p>
                </div>
                <div className="text-center lg:text-left">
                    <Link href="/todos"><div className="block visible py-4 px-8 mb-4 text-xs font-semibold tracking-wide leading-none text-white bg-blue-500 rounded cursor-pointer sm:mr-3 sm:mb-0 sm:inline-block">Users todos</div></Link>
                    <Link href="/signin"><div className="block visible py-4 px-8 text-xs font-semibold leading-none bg-white rounded border border-solid cursor-pointer sm:inline-block border-slate-200 text-slate-500">Start for free</div></Link>
                </div>
            </div>
            <div className="mt-10 px-3 mb-12 w-full lg:mb-0 lg:w-2/4">
                <div className="flex justify-center items-center">
                    <Image src="/hero.png" alt="" height={400} width={334} objectFit='contain' />
                </div>
            </div>
        </section>
    )
}

export default Hero