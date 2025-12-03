import { useMediaExample } from "../../../hooks/queries/media/media";

const ExampleComponent = () => {
  const example = useMediaExample();
  return <p>{`this is an ${example}`}</p>;
};
export default ExampleComponent;
