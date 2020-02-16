import { createElement } from './fre'

export default function Item(props) {
  const { content = '123123' } = props

  return <div>{content}</div>
}
