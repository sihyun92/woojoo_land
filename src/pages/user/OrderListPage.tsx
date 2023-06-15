import { useEffect, useState } from "react";
import { orderDetailsAll } from "../../lib/API/userAPI";
import styled from "styled-components";
import UserTitle from "../../components/user/UserTitle";
import { adjustDate, formatDollar } from "../../lib/Function/commonFn";

interface TransactionDetail {
  detailId: string;
  product: {
    productId: string;
    title: string;
    price: number;
    description: string;
    tags: string[];
    thumbnail: string | null;
    discountRate: number;
  };
  timePaid: string;
  isCanceled: boolean;
  done: boolean;
}

function OrderListPage() {
  useEffect(() => {
    getOrders();
  }, []);

  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  // 주문 내역 불러오기
  const getOrders = async () => {
    const orderList = await orderDetailsAll();
    typeof orderList === "string" ? setError(orderList) : setOrders(orderList);
  };

  return (
    <OrderRoute>
      <UserTitle>주문 내역</UserTitle>
      <OrderListBox>
        {error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : (
          orders.map((order: TransactionDetail, index) => {
            return (
              <OrderList key={index}>
                <OrderId>{order.detailId}</OrderId>
                <Title>{order.product.title}</Title>
                <Time>{adjustDate(order.timePaid)}</Time>
                <PriceTitle>총 주문 금액</PriceTitle>
                <Price>{formatDollar(order.product.price)}</Price>
              </OrderList>
            );
          })
        )}
      </OrderListBox>
    </OrderRoute>
  );
}

const OrderRoute = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const OrderListBox = styled.ul`
  gap: 5px;
  display: flex;
  flex-direction: column;
`;

const ErrorMessage = styled.span`
  font-weight: 700;
  font-size: 1.125rem;
  color: ${(props) => props.theme.colors.orange.main};
`;
const OrderList = styled.li`
  width: 100%;
  height: 70px;
  display: flex;
  padding: 0 1.25rem;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${(props) => props.theme.colors.gray[3]};
`;
const OrderId = styled.span`
  width: 30%;
  color: ${(props) => props.theme.colors.orange.main};
`;
const Title = styled.span`
  width: 20%;
  font-weight: 700;
  font-size: 1.125rem;
`;
const Time = styled.span`
  width: 30%;
`;
const PriceTitle = styled.span``;

const Price = styled.span``;

export default OrderListPage;
