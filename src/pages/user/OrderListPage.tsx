import { useEffect, useState } from "react";
import { orderDetailsAll } from "../../lib/API/userAPI";
import styled from "styled-components";
import UserTitle from "../../components/user/UserTitle";
import { adjustDate, formatDollar } from "../../lib/Function/commonFn";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { theme } from "../../styles/theme";

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
  useEffect(() => {
    filterOrders();
  });

  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [orders, setOrders] = useState<ITransactionDetail[]>([]);
  const [filter, setFilter] = useState<ITransactionDetail[]>([]);
  const [value, onChange] = useState<TValuePiece | [TValuePiece, TValuePiece]>(
    new Date(),
  );

  // 주문 내역 불러오기
  const getOrders = async () => {
    const orderList = await orderDetailsAll();
    typeof orderList === "string" ? setError(orderList) : setOrders(orderList);
  };

  // date를 string으로 만들어 주는 함수
  const getYMD = (date: TValuePiece) => {
    return date && date.toLocaleDateString();
  };

  // 캘린더 선택에 따라 날짜 렌더링
  const renderDate = () => {
    if (Array.isArray(value)) {
      return `${getYMD(value[0])} ~ ${getYMD(value[1])}`;
    } else {
      return `${getYMD(value)} ~ ${getYMD(value)}`;
    }
  };

  // 캘린터 on off 토글
  const onToggle = () => {
    setIsOpen((prev) => !prev);
  };

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
  const filterOrders = () => {
    const dates = Array.isArray(value)
      ? getDatesArray(value[0], value[1])
      : undefined;
    const filteredOrders = dates
      ? orders.filter((order: ITransactionDetail) => {
          return dates.includes(new Date(order.timePaid).toLocaleDateString());
        })
      : orders;
    setFilter(filteredOrders);
    return filteredOrders;
  };

  return (
    <OrderRoute>
      <UserTitle>주문 내역</UserTitle>
      <OrderListBox>
        {error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : (
          filter.map((order: ITransactionDetail, index) => {
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
    width: 300px;
    border-radius: 5px;
    height: 310px;
    padding: 20px;
  }
  .react-calendar__tile--range {}

  .react-calendar__month-view__days__day {
  }

  .react-calendar__tile--now {
    // 오늘 날짜 타일
    background: ${(props) => props.theme.colors.white};
    color: ${(props) => props.theme.colors.orange.main};
    border: 1px solid ${theme.colors.orange.main};
    border-radius: 50px;
  }

  .react-calendar__tile--active:enabled:focus {
    background-color: ${(props) => props.theme.colors.orange.main};
    color: ${(props) => props.theme.colors.white};
  }

  .react-calendar__tile:enabled:hover {
    background-color: #ff8c53;
    color: #fff;
  }

  .react-calendar__tile--now:enabled:hover {
    background-color: ${(props) => props.theme.colors.orange.main};
    color: ${(props) => props.theme.colors.white};
  }

  .react-calendar__tile--now:enabled:focus {
    // 오늘 날짜 타일이 선택되거나 호버됐을때
    color: ${(props) => props.theme.colors.orange.main};
    color: ${(props) => props.theme.colors.white};
  }

  .react-calendar__month-view__weekdays {
    abbr {
      // MON, THU 요일 표시 부분
      color: ${(props) => props.theme.colors.orange.main};
      text-decoration: none;
    }
  }

  .react-calendar__tile {
    // 전체 타일 스타일링
    border-radius: 0%;
    font-size: 12px;
    button {
      color: #ff8c53;
    }
  }

  .react-calendar__tile--active {
    // 선택 된 타일
    /* border-radius: 50%; */
    background-color: ${theme.colors.gray[3]};
    box-sizing: border-box;
  }

  .react-calendar__tile--rangeStart,
  .react-calendar__tile--rangeEnd {
    // 범위선택 양 끝 날짜
    background: ${(props) => props.theme.colors.orange.main};
    color: #fff;
  }

  .react-calendar--selectRange {color:red;}

  .react-calendar__tile--hover {
    // 범위 선택 중간 날짜들
    background-color: ${theme.colors.gray[3]};
    color: ${(props) => props.theme.colors.white};
  }
  
  .react-calendar__tile--hoverStart {
    /* background-color: #3d0000; */
  }

  .react-calendar__tile--hoverEnd {
    /* background-color: black; */
  }

  .react-calendar__tile--rangeEnd {
  }

  //시작 일이 선택되고 대기중인 상태
  .react-calendar__tile--rangeBothEnds {
    background-color: #ff8871;
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
