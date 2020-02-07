import { createElement } from './Creact'

export default function Item(props) {
  const { content = '123123' } = props

  const start = performance.now();
  while (performance.now() - start < 8);


  return <div>{content}</div>
}
