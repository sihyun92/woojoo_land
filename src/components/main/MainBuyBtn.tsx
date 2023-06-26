import { useDispatch } from "react-redux";
import { IProduct } from "../../lib/API/adminAPI";
import { productDetail } from "../../lib/API/commonAPI";
import Button from "../common/Button";
import { useNavigate, useParams } from "react-router-dom";
import { payment } from "../../modules/payment";

interface IBuyBtn {
  quantity: number;
}

function MainBuyBtn({ quantity }: IBuyBtn) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const findProduct = async () => {
    if (id) {
      const product: IProduct = await productDetail(id);
      return product;
    }
    return null;
  };

  const postBuy = async (item: IProduct) => {
    dispatch(
      payment({
        title: item.title as string,
        quantity: quantity,
        price: item.price,
        discountRate: item.discountRate,
      }),
    );
  };

  const onBuy = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const item = await findProduct();
    if (item) postBuy(item);

    navigate("/payment");
  };
  return (
    <Button
      orange="true"
      type="button"
      onClick={(event: any) => {
        onBuy(event);
      }}
    >
      구매하기
    </Button>
  );
}

export default MainBuyBtn;
