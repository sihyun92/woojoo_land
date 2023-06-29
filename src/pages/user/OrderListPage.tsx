import { useEffect, useState } from "react";
import { orderDetailsAll } from "../../lib/API/userAPI";
import styled from "styled-components";
import "react-calendar/dist/Calendar.css";
import UserTitle from "../../components/user/UserTitle";
import UserCalendar, { TValuePiece } from "../../components/user/UserCalendar";
import UserCollapsible from "../../components/user/UserCollapsible";
import { useQuery } from "react-query";

export interface IOrdersDetail {
  detailId: string;
  product: {
    productId: string;
    title: string;
    price: number;
    description: string;
    tags: string[];
    thumbnail: string | undefined;
    discountRate: number;
  };
  timePaid: string;
  isCanceled: boolean;
  done: boolean;
}

export interface IOrdersDetailExtend extends IOrdersDetail {
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
    thumbnail: string | undefined;
    photo: string | null;
    discountRate: number;
  };
}

function OrderListPage() {
  useEffect(() => {
    filterOrders();
  });

  const [error, setError] = useState("");
  const [detailsMap, setDetailsMap] = useState<
    Map<string, IOrdersDetailExtend>
  >(new Map());
  const [orders, setOrders] = useState<IOrdersDetail[]>([]);
  const [filter, setFilter] = useState<IOrdersDetail[]>([]);
  const [value, onChange] = useState<TValuePiece | [TValuePiece, TValuePiece]>(
    new Date(),
  );

  // 주문 내역 불러오기
  useQuery("orderDetailsAll", orderDetailsAll, {
    onSuccess: (res) => {
      typeof res === "string" ? setError(res) : setOrders(res);
    },
  });

  // 캘린더 날짜 범위 내의 날짜들을 저장하는 배열 생성
  // 시작날짜와 끝 날짜를 매개변수로 받아 변수에 저장
  // 시작날짜가 끝 날짜와 같아질때까지 날짜에 1을 더하면서 string화 한 날짜를 빈 배열에 push
  const getDatesArray = (startDate: TValuePiece, endDate: TValuePiece) => {
    if (startDate && endDate) {
      const dates = [];
      const start = new Date(startDate);
      const end = new Date(endDate);
      for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
        dates.push(date.toLocaleDateString());
      }
      return dates;
    }
  };

  // getDatesArray함수로 만든 날짜 범위 배열에 날짜가 포함되는 주문 내역을 필터링
  // 주문내역 전체를 스캔해 해당 주문의 주문 날짜가 상기 배열에 포함되면 남김
  // 만일 날짜를 제대로 선택하지 않은 경우에는 전체 주문 내역이 표시
  // 최종적으로 날짜순으로 정렬
  const filterOrders = () => {
    const dates = Array.isArray(value)
      ? getDatesArray(value[0], value[1])
      : undefined;
    const filteredOrders = dates
      ? orders.filter((order: IOrdersDetail) => {
          return dates.includes(new Date(order.timePaid).toLocaleDateString());
        })
      : orders;
    setFilter(
      filteredOrders.sort(
        (a, b) =>
          new Date(b.timePaid).getTime() - new Date(a.timePaid).getTime(),
      ),
    );
    return filteredOrders.sort(
      (a, b) => new Date(b.timePaid).getTime() - new Date(a.timePaid).getTime(),
    );
  };

  return (
    <OrderRoute>
      <UserTitle>주문 내역</UserTitle>
      <OrderListBox>
        {error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : (
          filter.map((order: IOrdersDetail, index) => {
            const isAccordionOpen = detailsMap.has(order.detailId);
            const accordionDetails = detailsMap.get(order.detailId);
            return (
              <UserCollapsible
                index={index}
                order={order}
                detailsMap={detailsMap}
                setDetailsMap={setDetailsMap}
                isAccordionOpen={isAccordionOpen}
                accordionDetails={accordionDetails}
              />
            );
          })
        )}
      </OrderListBox>
      <UserCalendar value={value} onChange={onChange} />
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

export default OrderListPage;
