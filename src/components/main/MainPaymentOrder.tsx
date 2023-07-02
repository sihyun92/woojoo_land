import { formatDollar } from "../../lib/Function/commonFn";
import styled from "styled-components";
import Button from "../common/Button";
import { theme } from "../../styles/theme";
import { orderApply } from "../../lib/API/userAPI";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import { ICheckData } from "../common/Header";
interface IPaymentOrder {
  price: number;
  productIds: string[];
  accountId: string;
  discountedPrice: number;
}

function MainPaymentOrder({
  price,
  productIds,
  accountId,
  discountedPrice,
}: IPaymentOrder) {
  const queryClient = useQueryClient();
  const res = queryClient.getQueryData<ICheckData>("check");
  const navigate = useNavigate(); // 내비게이터

  // 결제 버튼 onClick 이벤트 함수
  const onPayment = async () => {
    if (res) {
      // 결제 계좌가 성공적으로 선택되었을 때
      if (accountId) {
        // 제품 구매 신청
        for (let i = 0; i < productIds.length; i++) {
          orderApply(productIds[i], accountId);
        }

        const confirm = window.confirm(
          "결제가 완료되었습니다. 주문내역으로 이동하시겠습니까?",
        );

        // 확인 버튼 click 여부
        if (confirm) {
          navigate("/user");
        } else {
        }

        // 결제 완료 시, 로컬 스토리지 내 장바구니 삭제
        localStorage.removeItem(`cart_${res.email}`);

        // 최종적으로 결제 후 페이지 리로드
        window.location.reload();
      } else {
        alert("결제 계좌를 선택하세요.");
      }
    }
  };

  return (
    <Container>
      <OrderWrapper>
        <PaymentPrice>
          <span>결제 금액</span>
        </PaymentPrice>
        <Line />
        <Calculator>
          <div>
            <span>주문 금액<AbcItem>A</AbcItem></span>
            {formatDollar(price)}
          </div>
          <div>
            <span>할인 금액<AbcItem>B</AbcItem></span>
            <span>{formatDollar(discountedPrice)}</span>
          </div>
          <div>
            <span>로켓배송비<AbcItem>C</AbcItem></span>
            {price ? <span>{formatDollar(3000)}</span> : ""}
          </div>
        </Calculator>
        <Line />
        <TotalPrice>
          <span>총 결제 금액
          <AbcContainer>
              <div>A</div>
              <span>-</span>
              <div>B</div>
              <span>+</span>
              <div>C</div>
            </AbcContainer>
          </span>

          {price ? (
            <span>{formatDollar(price - discountedPrice + 3000)}</span>
          ) : (
            ""
          )}
        </TotalPrice>
      </OrderWrapper>
      <ButtonWrapper>
        <Button orange="true" onClick={onPayment}>
          결제하기
        </Button>
      </ButtonWrapper>
    </Container>
  );
}

const Container = styled.div`
  margin-left: 16px;
  width: 100%;
`;

const AbcContainer = styled.div`
  margin-left: 10px;
  height: 20px;
  display: inline-flex;
  span {
    margin: 0 4px;
    font-size: 16px;
    line-height: 20px;
  }
  div {
    width: 20px;
    height: 20px;
    display: flex;
    color: white;
    font-size: 12px;
    font-weight: 700;
    line-height: 22px;
    border-radius: 50%;
    justify-content: center;
    background-color: ${theme.colors.orange.main};
  }
`;

const Line = styled.div`
  background-color: ${theme.colors.gray[7]};
  height: 1px;
`;

const AbcItem = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  color: white;
  font-size: 10px;
  font-weight: 700;
  margin-left: 10px;
  line-height: 16px;
  border-radius: 50%;
  justify-content: center;
  background-color: ${theme.colors.orange.main};
`;

const OrderWrapper = styled.div`
  padding: 2rem 1rem;
  border-radius: 5px;
  border: 1px solid ${theme.colors.gray[3]};
`;

const PaymentPrice = styled.div`
  margin-bottom: 1.5rem;
  > span {
    font-size: 28px;
    font-weight: 700;
  }
`;

const Calculator = styled.div`
  gap: 1rem;
  display: flex;
  margin: 2rem 0;
  flex-direction: column;

  > span {
    font-size: 20px;
  }

  > div {
    display: flex;
    justify-content: space-between;
    span {
      display: inline-flex;
    }
    span:first-child {
      font-weight: 700;
    }
  }
`;

const TotalPrice = styled.div`
  display: flex;
  font-size: 20px;
  margin-top: 2rem;
  font-weight: 700;
  align-items: center;
  padding-bottom: 10px;
  justify-content: space-between;
  span:last-child {
    padding-top: 10px;
    color: ${theme.colors.orange.main};
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  > button {
    width: 100%;
    height: 3rem;
    font-size: 18px;
    margin-top: 1rem;
    :hover {
      background-color: ${theme.colors.orange.hover};
    }
  }
`;

export default MainPaymentOrder;
