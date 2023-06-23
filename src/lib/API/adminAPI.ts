export interface IProduct {
  id?: string;
  title?: string;
  price: number;
  description?: string;
  tags?: string[];
  thumbnail?: string;
  photoBase64?: string;
  discountRate?: number;
  isSoldOut?: boolean;
}

export interface UserList {
  email: string;
  displayName: string;
  profileImg?: string;
}

export interface IProductEdit extends IProduct {
  isSoldOut?: boolean;
}

export interface RequestBodyEdit {
  title: string; // 제품 이름 (필수!)
  price: number; // 제품 가격 (필수!)
  description: string; // 제품 상세 설명 (필수!)
  tags?: string[]; // 제품 태그
  thumbnailBase64?: string; // 제품 썸네일(대표) 사진(base64) - jpg, jpeg, webp, png, gif, svg
  photoBase64?: string; // 제품 상세 사진(base64) - jpg, jpeg, webp, png, gif, svg
  discountRate?: number; // 제품 할인율
}

interface RequestBodyAdd {
  title: string; // 제품 이름 (필수!)
  price: number; // 제품 가격 (필수!)
  description: string; // 제품 상세 설명 (필수!)
  tags?: string[]; // 제품 태그
  thumbnailBase64?: string; // 제품 썸네일(대표) 사진(base64) - jpg, jpeg, webp, png, gif, svg
  photoBase64?: string; // 제품 상세 사진(base64) - jpg, jpeg, webp, png, gif, svg
  discountRate?: number; // 제품 할인율
}

interface ISalesManage {
  isCanceled?: boolean;
  done?: boolean;
}

// fetch headers
const headers = {
  "content-type": "application/json",
  apikey: "KDT5_nREmPe9B",
  username: "KDT5_TeamAirPod8",
};

// 사용자 목록 조회
const userCheck = async () => {
  const response = await fetch(
    "https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/users",
    {
      method: "GET",
      headers: {
        ...headers,
        masterKey: "true",
      },
    },
  );
  const result = await response.json();
  console.log(result);
  return result;
};

// 모든 제품 조회
const productsList = async () => {
  const response = await fetch(
    "https://asia-northeast3-heropy-api.cloudfunctions.net/api/products",
    {
      method: "GET",
      headers: {
        ...headers,
        masterKey: "true",
      },
    },
  );
  const result = await response.json();
  console.log(result);
  return result;
};

//전체 거래(판매) 내역
const salesHistory = async () => {
  const response = await fetch(
    "https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/transactions/all",
    {
      method: "GET",
      headers: {
        ...headers,
        masterKey: "true",
      },
    },
  );
  const result = await response.json();
  console.log(result);
  return result;
};

// 거래(판매) 내역 완료/취소 및 해제
const salesManage = async (detailID: string, saleManage: ISalesManage) => {
  const response = await fetch(
    `https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/transactions/${detailID}`,
    {
      method: "PUT",
      headers: {
        ...headers,
        masterKey: "true",
      },
      body: JSON.stringify(saleManage),
    },
  );
  const result = await response.json();
  console.log(result);
  return result;
};

// 제품 추가
const productPost = async (
  product: RequestBodyAdd,
  thumbnailBase64: string,
) => {
  const updatedProduct = { ...product, thumbnailBase64 };
  const res = await fetch(
    "https://asia-northeast3-heropy-api.cloudfunctions.net/api/products",
    {
      method: "POST",
      headers: {
        ...headers,
        masterKey: "true",
      },
      body: JSON.stringify(updatedProduct),
    },
  );
  const result = await res.json();
  console.log(result);
  return result;
};

// 제품 수정
const productEdit = async (
  product: RequestBodyEdit,
  ID: string,
  thumbnailBase64: string,
) => {
  const updatedProduct = { ...product, thumbnailBase64 };
  //입력값 위주의 product과 Base64로 인코딩된 이미지 데이터는 따로 상태를 받아서 API로 수정 요청
  const res = await fetch(
    `https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/${ID}`,
    {
      method: "PUT",
      headers: {
        ...headers,
        masterKey: "true",
      },
      body: JSON.stringify(updatedProduct),
    },
  );
  const result = await res.json();
  console.log(result);
  return result;
};

// 제품 삭제
const productDel = async (productID: string) => {
  const response = await fetch(
    `https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/${productID}`,
    {
      method: "DELETE",
      headers: {
        ...headers,
        masterKey: "true",
      },
    },
  );
  const result = await response.json();
  console.log(result);
  return result;
};

export {
  userCheck,
  productPost,
  productEdit,
  productDel,
  productsList,
  salesHistory,
  salesManage,
};
