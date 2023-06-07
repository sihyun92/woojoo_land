import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { productDel, productPost } from "../../lib/API/adminAPI";
import { productsList } from "../../lib/API/adminAPI";
import styled from "styled-components";

interface IProduct {
  // 추가한 제품의 상세 내용
  id: string; // 제품 ID
  title: string; // 제품 이름
  price: number; // 제품 가격
  description: string; // 제품 상세 설명
  tags: string[]; // 제품 태그
  thumbnail: string | null; // 제품 썸네일 이미지(URL)
  photo: string | null; // 제품 상세 이미지(URL)
  isSoldOut: boolean; // 제품 매진 여부
  discountRate: number; // 제품 할인율
}

function AdminPage() {
  // 실시간 제품 렌더링
  useEffect(() => {
    getProducts();
  }, []);

  const [products, setProducts] = useState([]);
  const [productform, setProductForm] = useState({
    title: "",
    price: 0,
    description: "",
  });

  // 제품 목록 서버에서 가져오기
  const getProducts = async () => {
    const productList = await productsList();
    setProducts(productList);
  };

  // 제품 추가 input에 입력되는 값을 state에 저장하는 함수
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    // 가격 입력란에 숫자가 아닌 값을 입력하면 0을 반환
    let updatedValue: string | number = value;
    if (name === "price") {
      updatedValue = value === "" || isNaN(Number(value)) ? 0 : Number(value);
    }
    // 입력한 값을 state에 저장
    setProductForm((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));
  };

  // 제품 추가 폼 입력 후 제출시 API로 값을 전달해 제품 등록
  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await productPost(productform);
    getProducts();
  };

  // 제품 삭제 함수
  const onDelete = async (
    event: React.MouseEvent<HTMLButtonElement>,
    ID: string,
  ) => {
    event.preventDefault();
    await productDel(ID);
    getProducts();
  };

  return (
    <div>
      <h2>관리자 페이지</h2>
      <UserCheck>
        <h3>사용자 목록 조회</h3>
      </UserCheck>
      <ProductCheck>
        <h3>모든 제품 조회</h3>
        <ul>
          {products
            ? products.map((product: IProduct) => {
                return (
                  <li>
                    <div key={product.id}>
                      <span>id : {product.id}</span>
                      <span>이름 : {product.title}</span>
                      <span>가격 : {product.price}</span>
                      <span>설명 : {product.description}</span>
                    </div>
                    <button
                      onClick={(event) => {
                        onDelete(event, product.id);
                      }}
                    >
                      x
                    </button>
                  </li>
                );
              })
            : "제품이 없습니다"}
        </ul>
      </ProductCheck>
      <div>
        <h3>제품 추가</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="title"
            required
            value={productform.title}
            placeholder="이름"
            onChange={onChange}
          />
          <input
            type="text"
            name="price"
            required
            value={productform.price}
            placeholder="가격"
            onChange={onChange}
          />
          <input
            type="text"
            name="description"
            required
            value={productform.description}
            placeholder="상세 설명"
            onChange={onChange}
          />
          {/* <input
            type="text"
            name="tags"
            value={}
            placeholder="태그"
            onChange={onChange}
          />
          <input
            type="text"
            name="thumbnailBase64"
            value={}
            placeholder="썸네일"
            onChange={onChange}
          />
          <input
            type="text"
            name="photoBase64"
            value={}
            placeholder="상세 사진"
            onChange={onChange}
          />
          <input
            type="text"
            name="discountRate"
            value={}
            placeholder="할인율"
            onChange={onChange}
          /> */}
          <button>추가</button>
        </form>
      </div>
      <div>
        {/* <h3>제품 수정</h3>
        <form>
          <input type="text" name="" value={} placeholder="" onChange={} />
        </form> */}
      </div>
      <div>
        {/* <h3>제품 삭제</h3>
        <form>
          <input type="text" name="" value={} placeholder="" onChange={} />
        </form> */}
      </div>
    </div>
  );
}

const UserCheck = styled.div`
  display: flex;
  margin: 10px 0;
`;

const ProductCheck = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;

  li {
    display: flex;
    div {
      margin: 5px 0;
      border: 1px solid;
      display: flex;
      flex-direction: column;
    }
  }
`;

export default AdminPage;
