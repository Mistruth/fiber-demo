import { createElement } from "./Creact";

export default function Item(props) {
  const { content = "123123" } = props;

  return (
    <div
      onClick={() => {
        console.log(1);
      }}
    >
      {content}
    </div>
  );
}
