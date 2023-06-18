import { check } from "../../lib/API/userAPI";
import { productDetail } from "../../lib/API/commonAPI";
import { Link, useParams } from "react-router-dom";
import { IProductEdit } from "../../lib/API/adminAPI";

// 인터페이스 선언
interface MainCartBtnProps {
  quantity: number;
}

function MainCartBtn({ quantity }: MainCartBtnProps) {
  // URL로부터 현재 product의 id값 도출
  const { id } = useParams<{ id: string }>();

  const findProduct = async () => {
    // 유효한 prdocut일 경우
    if (id) {
      // 단일 제품 상세 조회
      const product: IProductEdit = await productDetail(id);
      // 다수의 제품을 담았을 경우
      const products: IProductEdit[] = Array(quantity).fill(product);
      return products;
    }
    return null;
  };

  const postCart = async (updatedCarts: IProductEdit[]) => {
    // 인증 확인
    const res = await check();
    // 기존의 로컬 스토리지에 저장된 product get
    const existingCart = localStorage.getItem(`cart_${res.email}`);
    let cartItems: IProductEdit[] = [];
    if (existingCart) {
      cartItems = JSON.parse(existingCart);
    }

    // props로 받은 상품들을 push
    if (cartItems) {
      cartItems.push(...updatedCarts);
    }
    // localStorage에 저장(set)
    localStorage.setItem(`cart_${res.email}`, JSON.stringify(cartItems));
  };

  const onCart = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const item = await findProduct();
    if (item) {
      postCart(item);
    }
  };

  return (
    <button
      type="button"
      onClick={(event) => {
        onCart(event);
      }}
    >
      <Link to="/cart">장바구니</Link>
    </button>
  );
}

export default MainCartBtn;