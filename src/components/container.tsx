import { type ReactNode } from 'react'

type containerProp={
    children: ReactNode
}

const Container = ({children}: containerProp) => {
  return (
    <div className='max-w-7xl p-2'>
        {children}
    </div>
  )
}

export default Container