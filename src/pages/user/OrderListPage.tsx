import { useEffect, useState } from "react";
import { orderDetailsAll } from "../../lib/API/userAPI";
import styled from "styled-components";

interface TransactionDetail {
  detailId: string; // 거래 내역 ID
  product: {
    // 거래한 제품 정보
    productId: string;
    title: string;
    price: number;
    description: string;
    tags: string[];
    thumbnail: string | null;
    discountRate: number; // 제품 할인율
  };
  timePaid: string; // 제품을 거래한 시간
  isCanceled: boolean; // 거래 취소 여부
  done: boolean; // 거래 완료 여부
}

function OrderListPage() {
  useEffect(() => {
    getOrders();
  }, []);

  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const orderList = await orderDetailsAll();
      setOrders(orderList);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <OrderRoute>
      <h2>주문 내역</h2>
      {typeof orders !== "string"
        ? orders.map((order: TransactionDetail) => {
            return (
              <li key={order.detailId}>
                <span>{order.detailId}</span>
                <span>{order.product.title}</span>
                <span>{order.timePaid}</span>
                <span>{order.product.price}</span>
              </li>
            );
          })
        : orders}
    </OrderRoute>
  );
}

const OrderRoute = styled.main`
  display: flex;
  flex-direction: column;
`;

export default OrderListPage;
