import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import {
  productDel,
  userCheck,
  productEdit,
  productPost,
} from "../../lib/API/adminAPI";
import { productsList } from "../../lib/API/adminAPI";
} 
import styled from "styled-components";

//응답 타입
//응답 타입
//응답 타입
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

//응답 타입
interface IUser {
  email: string;
  displayName: string;
  profileImg: string;
}

function AdminPage() {
  // 실시간 렌더링
  useEffect(() => {
    getProducts();
    getUsers();
  }, []);

  // const [thumbnail, setThumbnail] = useState(""); //받은 문자열 변환 이미지 주소를 상태 관리 기본값은 'null'이다.
  const [ProfileImg, setProfileImg] = useState("");

  //상품 추가의 정보 상태
  const [productform, setProductForm] = useState({
    title: "",
    price: 0,
    tags: [],
    tags: [],
    description: "",
    thumbnailBase64: "",
  });

  //상품 수정의 정보 상태
  const [updateform, setUpdateForm] = useState({
    title: "",
    price: 0,
    tags: [],
    description: "",
    thumbnailBase64: "",
  });

  //제품 이미지 랜더링
  function uploadImage(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files as FileList;
    for (const file of files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener("load", (e) => {
        setProfileImg((e.target as FileReader).result as string);
      });
    }
  }

  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [productid, setProductId] = useState("");

  // 사용자 목록 서버에서 가져오기
  const getUsers = async () => {
    const userList = await userCheck();
    setUsers(userList);
  };

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

  // 제품 수정 input에 입력되는 값을 state에 저장하는 함수
  const onChange2 = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    // 가격 입력란에 숫자가 아닌 값을 입력하면 0을 반환
    let updatedValue: string | number = value;
    if (name === "price") {
      updatedValue = value === "" || isNaN(Number(value)) ? 0 : Number(value);
    }

    // id는 개별 state에 저장
    name === "productid"
      ? setProductId(value)
      : setUpdateForm((prev) => ({
          ...prev,
          [name]: updatedValue,
        }));
  };

  // 제품 추가 폼 입력 후 제출시 API로 값을 전달해 제품 등록
  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await productPost(productform, ProfileImg);
    // input 초기화
    setProductForm({
      title: "",
      price: 0,
      tags: [],
      description: "",
      thumbnailBase64: "",
    });
    getProducts();
  };

  // // 제품 수정 폼 입력 후 제출시 API로 값을 전달해 제품 수정
  const onSubmit2 = async (event: FormEvent) => {
    event.preventDefault();
    await productEdit(updateform, productid, ProfileImg);
    // input 초기화
    setProductId("");
    setUpdateForm({
      title: "",
      price: 0,
      tags: [],
      description: "",
      thumbnailBase64: "",
    });
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
        <ul>
          {users.length
            ? users.map((user: IUser) => {
                return (
                  <li key={user.email}>
                    <span>이메일 : {user.email}</span>
                    <span>이름 : {user.displayName}</span>
                  </li>
                );
              })
            : "사용자가 없습니다."}
        </ul>
      </UserCheck>
      <ProductCheck>
        <h3>모든 제품 조회</h3>
        <ul>
          {products.length
            ? products.map((product: IProduct) => {
                return (
                  <li key={product.id}>
                    <div>
                      <span>id : {product.id}</span>
                      <span>이름 : {product.title}</span>
                      <span>가격 : {product.price}</span>
                      <span>설명 : {product.description}</span>
                      <span>태그 : {product.tags}</span>
                      <span>
                        썸네일이미지 :{" "}
                        {product.thumbnail && (
                          <img
                            src={product.thumbnail}
                            alt="Thumbnail"
                            width={120}
                          />
                        )}
                      </span>
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
      <Post>
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
          <input
            type="text"
            name="tags"
            required
            value={productform.tags}
            placeholder="태그"
            onChange={onChange}
          />
          <input type="file" onChange={uploadImage} />
          {/* 상품 이미지 썸네일 영역 */}
          {ProfileImg && <img src={ProfileImg} alt="Thumbnail" width={120} />}
          <button type="submit">추가</button>
        </form>
      </Post>
      <Edit>
        <h3>제품 수정</h3>
        <form onSubmit={onSubmit2}>
          <input
            type="text"
            name="productid"
            value={productid}
            placeholder="id"
            onChange={onChange2}
          />
          <input
            type="text"
            name="title"
            value={updateform.title}
            placeholder="이름"
            onChange={onChange2}
          />
          <input
            type="text"
            name="price"
            value={updateform.price}
            onChange={onChange2}
          />
          <input
            type="text"
            name="description"
            value={updateform.description}
            placeholder="상세 설명"
            onChange={onChange2}
          />
          <input
            type="text"
            name="tags[]"
            required
            value={updateform.tags}
            placeholder="태그"
            onChange={onChange2}
          />
          <input type="file" onChange={uploadImage} />
          <input type="file" onChange={uploadImage} />
          {/* 상품 이미지 썸네일 영역 */}
          {ProfileImg && <img src={ProfileImg} alt="Thumbnail" width={120} />}
          {ProfileImg && <img src={ProfileImg} alt="Thumbnail" width={120} />}
          <button type="submit">수정</button>
        </form>
      </Edit>
    </div>
  );
}

const UserCheck = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;

  h3 {
    font-size: 20px;
    font-weight: 700;
  }

  li {
    display: flex;
    margin-top: 5px;

    span {
      margin-right: 20px;
    }
  }
`;

const Post = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  h3 {
    font-size: 20px;
    font-weight: 700;
  }
`;

const ProductCheck = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;

  h3 {
    font-size: 20px;
    font-weight: 700;
  }

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

const Edit = styled.div`
  display: flex;
  flex-direction: column;
  h3 {
    font-size: 20px;
    font-weight: 700;
  }
`;

export default AdminPage;
