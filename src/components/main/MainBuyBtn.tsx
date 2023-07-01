// 제품 상세페이지 - 구매하기 버튼 컴포넌트

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

  // id값 기반으로 단일 제품 상세 조회
  const findProduct = async () => {
    if (id) {
      const product = await productDetail(id);
      return product;
    }
    return null;
  };

  const postBuy = (item: IProduct) => {
    // payment action dispatch
    dispatch(
      // payment 액션 객체를 Redux store에 전달되어 상태 업데이트
      payment({
        productId: item.id as string,
        title: item.title as string,
        quantity: quantity,
        price: item.price,
        discountRate: item.discountRate as number,
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
