import { useEffect, useState } from "react";
import { orderDetailsAll } from "../../lib/API/userAPI";
import styled from "styled-components";
import UserTitle from "../../components/user/UserTitle";
import { adjustDate, formatDollar } from "../../lib/Function/commonFn";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

interface ITransactionDetail {
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

type TValuePiece = Date | null;

function OrderListPage() {
  useEffect(() => {
    getOrders();
  }, []);

  const [value, onChange] = useState<TValuePiece | [TValuePiece, TValuePiece]>(
    new Date(),
  );
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState([]);
  // 주문 내역 불러오기
  const getOrders = async () => {
    const orderList = await orderDetailsAll();
    typeof orderList === "string" ? setError(orderList) : setOrders(orderList);
  };
  const getYMD = (date: TValuePiece) => {
    if (date) {
      return date.toLocaleDateString();
    }
  };

  const renderDate = () => {
    if (Array.isArray(value)) {
      return `${getYMD(value[0])} ~ ${getYMD(value[1])}`;
    } else {
      return `${getYMD(value)} ~ ${getYMD(value)}`;
    }
  };

  const onToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const getDatesArray = (startDate: TValuePiece, endDate: TValuePiece) => {
    if (startDate && endDate) {
      const dates = [];
      const start = new Date(startDate);
      const end = new Date(endDate);
      while (start <= end) {
        dates.push(new Date(start));
        start.setDate(start.getDate() + 1);
      }
      const updatedDates = dates.map((date) => {
        return date.toLocaleDateString();
      });
      return updatedDates;
    }
  };

  const filterOrders = () => {
    if (Array.isArray(value)) {
      const dates = getDatesArray(value[0], value[1]);
      const filteredOrders = orders.filter((order: ITransactionDetail) => {
        const orderedDate = new Date(order.timePaid).toLocaleDateString();
        if (dates) {
          return dates.includes(orderedDate);
        }
      });
      setFilter(filteredOrders);
      return filteredOrders;
    }
  };

  return (
    <OrderRoute>
      <UserTitle>주문 내역</UserTitle>
      <OrderListBox>
        {error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : (
          orders.map((order: ITransactionDetail, index) => {
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
      <CalendarBox>
        <ToggleButton onClick={onToggle}>{renderDate()}</ToggleButton>
        {isOpen ? (
          <Calendar
            onChange={onChange}
            locale="en"
            value={value}
            selectRange={true}
            prevLabel={<AiFillCaretLeft />}
            nextLabel={<AiFillCaretRight />}
            next2Label={null}
            prev2Label={null}
            formatDay={(locale, date) =>
              date.toLocaleString("en", { day: "numeric" })
            }
          />
        ) : (
          ""
        )}
      </CalendarBox>
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

const CalendarBox = styled.div`
  display: flex;
  align-items: end;
  margin-top: 1.25rem;
  flex-direction: column;

  .react-calendar {
    width: 274px;
    height: 264px;
  }

  .react-calendar__tile--now {
    // 오늘 날짜 타일
    background: ${(props) => props.theme.colors.orange.main};
    color: ${(props) => props.theme.colors.white};
  }

  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    // 오늘 날짜 타일이 선택되거나 호버됐을때
    color: ${(props) => props.theme.colors.orange.main};
  }

  .react-calendar__month-view__weekdays {
    abbr {
      // MON, THU 요일 표시 부분
      color: ${(props) => props.theme.colors.orange.main};
    }
  }

  .react-calendar__tile {
    // 전체 타일 스타일링
  }

  .react-calendar__tile--active {
    // 선택 된 타일
    border-radius: 50%;
  }

  .react-calendar__tile--rangeStart,
  .react-calendar__tile--rangeEnd {
    // 범위선택 양 끝 날짜
  }

  .react-calendar--selectRange .react-calendar__tile--hover {
    // 범위 선택 중간 날짜들
  }
`;
const ToggleButton = styled.button`
  height: 24px;
  width: 190px;
  border: none;
  cursor: pointer;
  font-weight: 700;
  font-size: 0.75rem;
  border-radius: 1rem;
  margin-bottom: 0.75rem;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.orange.main};
`;

export default OrderListPage;
