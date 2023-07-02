import { useEffect, useState } from "react";
import MainTaggedCard from "../../../components/main/Card/MainTaggedCard";
import { IProduct, productsList } from "../../../lib/API/adminAPI";

// 할인율이 30% 이상인 상품
function StationPage() {
  const title = "특가 상품";
  const [list, setList] = useState<IProduct[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const onSaleList = list.filter(
    (value) => (value.discountRate as number) >= 30,
  );

  useEffect(() => {
    async function fetchList() {
      setIsFetching(true);
      try {
        const res = await productsList();
        setList(res);
        setIsFetching(false);
      } catch (error) {
        console.log("error", error);
      }
    }
    fetchList();
  }, []);

  return (
    <MainTaggedCard
      isFetching={isFetching}
      title={title}
      list={onSaleList}
    ></MainTaggedCard>
  );
}

export default StationPage;
