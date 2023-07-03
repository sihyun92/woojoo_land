export interface IProduct {
  id?: string;
  title?: string;
  price: number;
  description?: string;
  tags?: string[];
  thumbnail?: string;
  photo?: string;
  discountRate?: number;
  isSoldOut?: boolean;
}

export interface UserList {
  email: string;
  displayName: string;
  profileImg?: string;
}

export interface IProductLike extends IProduct {
  like?: boolean;
}

export interface IProductEdit extends IProduct {
  isSoldOut?: boolean;
}

export interface IProductLike extends IProduct {
  like?: boolean;
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

export interface IEditProduct {
  tags?: string[];
  price?: number;
  title?: string;
  isSoldOut?: boolean;
  discountRate?: number;
  description?: string;
  photoBase64?: string;
  thumbnailBase64?: string;
}

export interface IOrdalDetailAll {
  detailId: string;
  user: {
    email: string;
    displayName: string;
    profileImg: string | null;
  };
  account: {
    bankName: string;
    bankCode: string;
    accountNumber: string;
  };
  product: {
    productId: string;
    title: string;
    price: number;
    description: string;
    tags: string[];
    thumbnail: string | null;
    discountRate: number;
  };
  timePaid: string; // 제품을 거래한 시간
  isCanceled: boolean; // 거래 취소 여부
  done: boolean; // 거래 완료 여부
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
  try {
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
    return result;
  } catch (e) {
    console.error(e);
  }
};

// 모든 제품 조회
const productsList = async () => {
  try {
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
    return result;
  } catch (e) {
    console.error(e);
  }
};

//전체 거래(판매) 내역
const salesHistory = async () => {
  try {
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
    return result;
  } catch (e) {
    console.error(e);
  }
};

// 거래(판매) 내역 완료/취소 및 해제
const salesManage = async (detailID: string, saleManage: ISalesManage) => {
  try {
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
    return result;
  } catch (e) {
    console.error(e);
  }
};

// 제품 추가
const productPost = async (
  product: RequestBodyAdd,
  thumbnailBase64: string,
  photoBase64: string,
) => {
  const updatedProduct = { ...product, thumbnailBase64, photoBase64 };
  try {
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
    return result;
  } catch (e) {
    console.error(e);
  }
};

// 제품 수정
const productEdit = async (
  id: string,
  product: IEditProduct,
  thumbnailBase64: string,
  photoBase64: string,
) => {
  const updatedProduct = { ...product, thumbnailBase64, photoBase64 };
  //입력값 위주의 product과 Base64로 인코딩된 이미지 데이터는 따로 상태를 받아서 API로 수정 요청
  try {
    const res = await fetch(
      `https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/${id}`,
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
    return result;
  } catch (e) {
    console.error(e);
  }
};

// 제품 삭제
const productDel = async (productID: string) => {
  try {
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
    return result;
  } catch (e) {
    console.error(e);
  }
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
