import { useParams } from "react-router-dom";

const ItemDetails = () => {
  const params = useParams();

  return <div>ItemDetails {params.id}</div>;
};

export default ItemDetails;
