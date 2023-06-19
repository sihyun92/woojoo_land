export interface IProduct {
  id?: string;
  title?: string;
  price?: number;
  description?: string;
  tags?: string[];
  thumbnailBase64?: string;
  photoBase64?: string;
  discountRate?: number;
}

export interface UserList {
  email: string
  displayName: string
  profileImg?: string
}

interface IProductEdit extends IProduct {
  isSoldOut?: boolean;
}

interface IProductPost extends IProduct {
  title: string;
  price: number;
  description: string;
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
const productPost = async (product: IProductPost) => {
  const response = await fetch(
    "https://asia-northeast3-heropy-api.cloudfunctions.net/api/products ",
    {
      method: "POST",
      headers: {
        ...headers,
        masterKey: "true",
      },
      body: JSON.stringify(product),
    },
  );
  const result = await response.json();
  console.log(result);
  return result;
};

// 제품 수정
const productEdit = async (product: IProductEdit, ID: string) => {
  const response = await fetch(
    `https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/${ID}`,
    {
      method: "PUT",
      headers: {
        ...headers,
        masterKey: "true",
      },
      body: JSON.stringify(product),
    },
  );
  const result = await response.json();
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
