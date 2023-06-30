export interface IProductDetail {
  id?: string;
  title?: string;
  price?: number;
  description?: string;
  tags?: string[];
  thumbnail?: string;
  photo?: string;
  discountRate?: number;
  isSoldOut: boolean;
}

// fetch headers
const headers = {
  "content-type": "application/json",
  apikey: "KDT5_nREmPe9B",
  username: "KDT5_TeamAirPod8",
};

// 단일 제품 상세 조회
const productDetail = async (productID: string) => {
  try {
    const response = await fetch(
      `https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/${productID}`,
      {
        method: "GET",
        headers,
      },
    );
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
  }
};

export { productDetail };
