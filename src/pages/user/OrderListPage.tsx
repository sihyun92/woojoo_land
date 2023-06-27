import { useEffect, useState } from "react";
import {
  orderCancel,
  orderConfirm,
  orderDetail,
  orderDetailsAll,
} from "../../lib/API/userAPI";
import Calendar from "react-calendar";
import styled from "styled-components";
import "react-calendar/dist/Calendar.css";
import { theme } from "../../styles/theme";
import Collapsible from "react-collapsible";
import Button from "../../components/common/Button";
import UserTitle from "../../components/user/UserTitle";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { adjustDate, formatDollar } from "../../lib/Function/commonFn";

interface IOrdersDetail {
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

interface IOrdersDetailExtend extends IOrdersDetail {
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
  const [detailsMap, setDetailsMap] = useState<
    Map<string, IOrdersDetailExtend>
  >(new Map());
  const [orders, setOrders] = useState<IOrdersDetail[]>([]);
  const [filter, setFilter] = useState<IOrdersDetail[]>([]);
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

  // 구매 확정 버튼
  // 확인 모달 등장 후 구매 확정 처리
  const onConfirm = async (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    const confirmModal = window.confirm(
      "주문 확정 이후에는 취소할 수 없습니다. 확정하시겠습니까?",
    );
    if (confirmModal) {
      await orderConfirm(id);
      alert("주문 확정되었습니다.");
      window.location.reload();
    }
  };

  // 구매 취소 버튼
  // 확인 모달 등장 후 구매 취소 처리
  const onCancle = async (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    const CanclemModal = window.confirm(
      "주문 취소시 주문 금액이 환불됩니다. 취소하시겠습니까?",
    );
    if (CanclemModal) {
      await orderCancel(id);
      alert("주문 취소되었습니다.");
      window.location.reload();
    }
  };

  // new Map 을 이용한 아코이던 정보 처리
  // id로 된 key를 포함한 객체가 존재하면 해당 객체를 삭제 (아코디언 닫기)
  // 없으면 key가 id이고 value가 res 객체인 객체를 detailsMap으로 전달
  const onAccordion = async (id: string) => {
    if (detailsMap.has(id)) {
      detailsMap.delete(id);
    } else {
      const res = await orderDetail(id);
      setDetailsMap(new Map(detailsMap.set(id, res)));
    }
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
              <Collapsible
                key={index}
                easing="ease-in-out"
                transitionTime={200}
                onOpen={() => onAccordion(order.detailId)}
                trigger={
                  <OrderList>
                    <Title>{order.product.title}</Title>
                    <Time>{adjustDate(order.timePaid)}</Time>
                    <PriceTitle>총 주문 금액</PriceTitle>
                    <Price>{formatDollar(order.product.price)}</Price>
                    <OrderButton>
                      {!order.done && !order.isCanceled ? (
                        <>
                          <ConfirmButton
                            onClick={(
                              event: React.MouseEvent<HTMLButtonElement>,
                            ) => {
                              onConfirm(event, order.detailId);
                            }}
                            reverse
                          >
                            확정
                          </ConfirmButton>
                          <CancleButton
                            onClick={(
                              event: React.MouseEvent<HTMLButtonElement>,
                            ) => {
                              onCancle(event, order.detailId);
                            }}
                            orange
                          >
                            취소
                          </CancleButton>
                        </>
                      ) : order.done ? (
                        <OrderText>주문 확정</OrderText>
                      ) : (
                        <OrderText>주문 취소</OrderText>
                      )}
                    </OrderButton>
                  </OrderList>
                }
              >
                <DetailBox>
                  {isAccordionOpen && accordionDetails && (
                    <DetailContent>
                      <DetailImg
                        src={accordionDetails.product.thumbnail}
                        alt="Thumnail"
                      />
                      <DetailText>
                        <DetailTitle>상세 주문 정보</DetailTitle>
                        <DetailList>
                          <h3>주문 번호</h3>
                          <span>{accordionDetails.detailId}</span>
                        </DetailList>
                        <DetailList>
                          <h3>제품명</h3>
                          <span>{accordionDetails.product.title}</span>
                        </DetailList>
                        <DetailList>
                          <h3>가격</h3>
                          <span>
                            {formatDollar(accordionDetails.product.price)}
                          </span>
                        </DetailList>
                        <DetailList>
                          <h3>거래계좌</h3>
                          <span>
                            {accordionDetails.account.bankName} :{" "}
                            {accordionDetails.account.accountNumber}
                          </span>
                        </DetailList>
                      </DetailText>
                    </DetailContent>
                  )}
                </DetailBox>
              </Collapsible>
            );
          })
        )}
      </OrderListBox>
      <CalendarBox>
        <ToggleButton isOpen={isOpen} onClick={onToggle}>
          {renderDate()}
        </ToggleButton>
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
  transition: 0.2s;
  padding: 0 1.25rem;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${(props) => props.theme.colors.gray[3]};

  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.colors.gray[2]};
  }
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

const OrderButton = styled.div`
  gap: 1rem;
  width: 136px;
  display: flex;
  justify-content: center;
`;

const OrderText = styled.span`
  font-weight: 700;
  color: ${(props) => props.theme.colors.orange.main};
`;

const ConfirmButton = styled(Button)`
  height: 2.5rem;
  width: 3.75rem;
  font-size: 1rem;
  font-weight: 700;
  transition: 0.2s;

  &:hover {
    color: ${(props) => props.theme.colors.white};
    background: ${(props) => props.theme.colors.orange.main};
  }
`;

const CancleButton = styled(Button)`
  height: 2.5rem;
  width: 3.75rem;
  font-size: 1rem;
  font-weight: 700;
  transition: 0.2s;

  &:hover {
    background: ${(props) => props.theme.colors.orange.hover};
  }
`;

const DetailBox = styled.div`
  height: 250px;
  display: flex;
  justify-content: center;
`;

const DetailContent = styled.div`
  gap: 1.5rem;
  width: 870px;
  display: flex;
  padding: 1.7rem;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border: 1px solid ${(props) => props.theme.colors.gray[3]};
`;

const DetailImg = styled.img`
  width: 187px;
  height: 187px;
`;

const DetailTitle = styled.h2`
  height: 2.2rem;
  font-weight: 700;
  font-size: 1.125rem;
  color: ${(props) => props.theme.colors.orange.main};
`;

const DetailText = styled.div`
  height: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  div {
    border-bottom: 1px solid ${(props) => props.theme.colors.gray[3]};
  }
`;

const DetailList = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    color: ${(props) => props.theme.colors.orange.main};
  }
`;

const CalendarBox = styled.div`
  display: flex;
  align-items: end;
  margin-top: 1.25rem;
  flex-direction: column;

  .react-calendar {
    width: 300px;
    height: 310px;
    padding: 20px;
    border-radius: 5px;
  }

  .react-calendar__tile--range {
  }

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

  .react-calendar--selectRange {
    color: red;
  }

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

const ToggleButton = styled.button<{
  isOpen?: boolean;
}>`
  width: 190px;
  height: 24px;
  display: flex;
  cursor: pointer;
  transition: 0.2s;
  font-weight: 700;
  font-size: 0.75rem;
  align-items: center;
  border-radius: 1rem;
  margin-bottom: 0.75rem;
  justify-content: center;
  color: ${({ isOpen, theme }) =>
    isOpen ? theme.colors.white : theme.colors.orange.main};
  background-color: ${({ isOpen, theme }) =>
    isOpen ? theme.colors.orange.main : theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.orange.main};
`;

export default OrderListPage;
