import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import { Movie } from '../typings'

interface Props {
  title: string
  movies: Movie[]
}

export function Row({ title, movies }: Props) {
  return (
    <div className="h-40 space-y-0.5">
      <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {title}
      </h2>
      <div className="group relative md:-ml-2">
        <ChevronLeftIcon className="absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer transition hover:scale-125 group-hover:opacity-100" />
        <ChevronRightIcon className="absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer transition hover:scale-125 group-hover:opacity-100" />
      </div>
    </div>
  )
}
