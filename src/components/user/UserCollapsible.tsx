import Collapsible from "react-collapsible";
import { adjustDate, formatDollar } from "../../lib/Function/commonFn";
import styled from "styled-components";
import Button from "../../components/common/Button";
import { orderCancel, orderConfirm, orderDetail } from "../../lib/API/userAPI";
import {
  IOrdersDetail,
  IOrdersDetailExtend,
} from "../../pages/user/OrderListPage";
import { Dispatch, SetStateAction } from "react";
import { useQuery } from "react-query";

interface ICollapsibleProps {
  order: IOrdersDetail;
  isAccordionOpen: boolean;
  accordionDetails: IOrdersDetailExtend | undefined;
  detailsMap: Map<string, IOrdersDetailExtend>;
  setDetailsMap: Dispatch<SetStateAction<Map<string, IOrdersDetailExtend>>>;
}
function UserCollapsible({
  order,
  isAccordionOpen,
  accordionDetails,
  detailsMap,
  setDetailsMap,
}: ICollapsibleProps) {
  // new Map 을 이용한 아코이던 정보 처리
  // id로 된 key를 포함한 객체가 존재하면 해당 객체를 삭제 (아코디언 닫기)
  // 없으면 key가 id이고 value가 res 객체인 객체를 detailsMap으로 전달
  const onAccordion = async () => {
    if (detailsMap.has(order.detailId)) {
      detailsMap.delete(order.detailId);
    } else {
      if (!isLoading && data) {
        setDetailsMap(new Map(detailsMap.set(order.detailId, data)));
      }
    }
  };

  const { data, isLoading } = useQuery(["orderDetail", order.detailId], () =>
    orderDetail(order.detailId),
  );

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

  return (
    <Collapsible
      easing="ease-in-out"
      transitionTime={200}
      onOpen={onAccordion}
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
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                    onConfirm(event, order.detailId);
                  }}
                  reverse
                >
                  확정
                </ConfirmButton>
                <CancleButton
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
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
                <span>{formatDollar(accordionDetails.product.price)}</span>
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
}

const OrderList = styled.li`
  width: 100%;
  height: 70px;
  display: flex;
  transition: 0.1s;
  padding: 0 1.25rem;
  border-radius: 5px;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${(props) => props.theme.colors.gray[7]};
  &:hover {
    cursor: pointer;
    transform: scale(0.99);
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
  padding-left: 10px;
  gap: 8px;
  width: 136px;
  display: flex;
  justify-content: center;
`;

const OrderText = styled.span`
  font-weight: 700;
  color: ${(props) => props.theme.colors.orange.main};
`;

const ConfirmButton = styled(Button)`
  width: 3.75rem;
  height: 2.5rem;
  font-size: 16px;
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
  transition: 0.2s;
  &:hover {
    background: ${(props) => props.theme.colors.orange.hover};
  }
`;

const DetailBox = styled.div`
  height: 250px;
  display: flex;
  margin-top: 5px;
  justify-content: center;
`;

const DetailContent = styled.div`
  gap: 1.5rem;
  width: 870px;
  display: flex;
  padding: 1.7rem;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
  border: 1px solid ${(props) => props.theme.colors.gray[7]};
`;

const DetailImg = styled.img`
  width: 187px;
  height: 187px;
  border-radius: 10px;
`;

const DetailTitle = styled.h2`
  height: 2.2rem;
  font-size: 20px;
  margin-top: 8px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.orange.main};
`;

const DetailText = styled.div`
  height: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  div {
    border-bottom: 1px solid ${(props) => props.theme.colors.gray[7]};
    width: 98%;
    margin-left: 5px;
    margin-bottom: 5px;
  }
`;

const DetailList = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h3 {
    font-weight: 700;
    padding-left: 5px;
  }
  span {
    font-size: 14px;
    color: #9d9d9d;
    padding-right: 8px;
  }
`;

export default UserCollapsible;
