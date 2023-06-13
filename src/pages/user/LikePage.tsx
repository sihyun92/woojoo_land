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
  }, []);

  const [products, setProducts] = useState([]);
  const [likes, setLikes] = useState<IProduct[]>([]);

  // 로컬스토리지
  // 사용자: [{ 이름: 머머, 가격: 머머 }, { 이름: 머머, 가격: 머머 }]

  const getProducts = async () => {
    const productList = await productsList();
    setProducts(productList);
  };

  const postLike = async (updatedLikes: IProduct[]) => {
    const res = await check();
    localStorage.setItem(res.email, JSON.stringify(updatedLikes));
  };

  const getLike = async () => {
    const res = await check();
    const getLikeItems = localStorage.getItem(res.email);
    if (getLikeItems) {
      setLikes(JSON.parse(getLikeItems));
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

  return (
    <div>
      <UserTitle>찜한 상품</UserTitle>
      <h3>모든 제품</h3>
      <ul>
        {products.length
          ? products.map((product: IProduct) => {
              return (
                <li key={product.id}>
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
          ? likes.map((like: IProduct) => {
              return (
                <li key={like.id}>
                  <span>{like.title}</span>
                  <span>{like.price}</span>
                </li>
              );
            })
          : "찜한 상품이 없습니다"}
      </ul>
    </div>
  );
}

export default LikePage;
