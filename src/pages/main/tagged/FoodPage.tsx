import { useEffect, useState } from "react";
import MainTaggedCard from "../../../components/main/Card/MainTaggedCard";
import { IProduct, productsList } from "../../../lib/API/adminAPI";

function Foodage() {
  const title = "우주 식량";
  const [list, setList] = useState<IProduct[]>([]);
  const foodList = list.filter((value) => value.tags?.includes("우주 식량"));

  useEffect(() => {
    async function fetchList() {
      try {
        const res = await productsList();
        setList(res);
      } catch (error) {
        console.log("error", error);
      }
    }
    fetchList();
  }, []);

  return <MainTaggedCard title={title} list={foodList}></MainTaggedCard>;
}

export default Foodage;
