import { useEffect, useState } from "react";
import UserTitle from "../../components/user/UserTitle";
import { productsList } from "../../lib/API/adminAPI";
import { check } from "../../lib/API/userAPI";

interface IProduct {
  id: string;
  title: string;
  price: number;
  description: string;
  tags: string[];
  thumbnail: string | null;
  photo: string | null;
  isSoldOut: boolean;
  discountRate: number;
}

function LikePage() {
  // 실시간 렌더링
  useEffect(() => {
    getProducts();
    getLike();
    getCart();
  }, []);

  const [products, setProducts] = useState([]);
  const [likes, setLikes] = useState<IProduct[]>([]);
  const [carts, setCarts] = useState<IProduct[]>([]);

  // 로컬스토리지
  // 사용자: [{ 이름: 머머, 가격: 머머 }, { 이름: 머머, 가격: 머머 }]

  const getProducts = async () => {
    const productList = await productsList();
    setProducts(productList);
  };

  const postLike = async (updatedLikes: IProduct[]) => {
    const res = await check();
    localStorage.setItem(`like_${res.email}`, JSON.stringify(updatedLikes));
  };

  const postCart = async (updatedCarts: IProduct[]) => {
    const res = await check();
    localStorage.setItem(`cart_${res.email}`, JSON.stringify(updatedCarts));
  };

  const getLike = async () => {
    const res = await check();
    const getLikeItems = localStorage.getItem(`like_${res.email}`);
    if (getLikeItems) {
      setLikes(JSON.parse(getLikeItems));
    }
  };

  const getCart = async () => {
    const res = await check();
    const getCartItems = localStorage.getItem(`cart_${res.email}`);
    if (getCartItems) {
      setCarts(JSON.parse(getCartItems));
    }
  };

  const onLike = (
    event: React.MouseEvent<HTMLButtonElement>,
    product: IProduct,
  ) => {
    event.preventDefault();
    if (likes) {
      const updatedLikes = [...likes, product];
      setLikes(updatedLikes);
      postLike(updatedLikes);
    }
  };

  const onCart = (
    event: React.MouseEvent<HTMLButtonElement>,
    like: IProduct,
  ) => {
    event.preventDefault();
    if (carts) {
      const updatedCarts = [...carts, like];
      setCarts(updatedCarts);
      postCart(updatedCarts);
    }
  };

  return (
    <div>
      <UserTitle>찜한 상품</UserTitle>
      <h3>모든 제품</h3>
      <ul>
        {products.length
          ? products.map((product: IProduct, index) => {
              return (
                <li key={index}>
                  <div>
                    <span>id : {product.id}</span>
                    <span>이름 : {product.title}</span>
                    <span>가격 : {product.price}</span>
                  </div>
                  <button
                    type="button"
                    onClick={(event) => {
                      onLike(event, product);
                    }}
                  >
                    찜
                  </button>
                </li>
              );
            })
          : "제품이 없습니다"}
      </ul>

      <h3>찜한 상품 리스트</h3>
      <ul>
        {likes
          ? likes.map((like: IProduct, index) => {
              return (
                <li key={index}>
                  <div>
                    <span>{like.title}</span>
                    <span>{like.price}</span>
                  </div>
                  <button
                    type="button"
                    onClick={(event) => {
                      onCart(event, like);
                    }}
                  >
                    장바구니에 넣기
                  </button>
                </li>
              );
            })
          : "찜한 상품이 없습니다"}
      </ul>

      <h3>장바구니 리스트</h3>
      <ul>
        {carts
          ? carts.map((cart: IProduct, index) => {
              return (
                <li key={index}>
                  <div>
                    <span>{cart.title}</span>
                    <span>{cart.price}</span>
                  </div>
                </li>
              );
            })
          : "장바구니에 상품이 없습니다"}
      </ul>
    </div>
  );
}

export default LikePage;
