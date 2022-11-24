import { FC } from 'react'
import { format } from 'date-fns'

interface DateProps {
  date: Date
}
const Date: FC<DateProps> = ({ date }) => {
  return <time >{format(date, 'LLLL d, yyyy')}</time>
}
export default Date