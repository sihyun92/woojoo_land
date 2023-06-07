// fetch headers
const headers = {
  "content-type": "application/json",
  apikey: "KDT5_nREmPe9B",
  username: "KDT5_TeamAirPod8",
};

// 단일 제품 상세 조회
const productDetail = async (productID: string) => {
  const response = await fetch(
    `https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/${productID}`,
    {
      method: "GET",
      headers,
    },
  );
  const result = await response.json();
  console.log(result);
  return result;
};

export { productDetail };
