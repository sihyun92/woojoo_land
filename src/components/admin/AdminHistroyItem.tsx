import styled from "styled-components";
import { theme } from "../../styles/theme";
import Button from "../common/Button";
import { IOrdalDetailAll, salesManage } from "../../lib/API/adminAPI";
import { adjustDate, formatDollar } from "../../lib/Function/commonFn";
import { Dispatch, SetStateAction } from "react";

interface HistoryProps {
  list: any;
  setIsChanged: Dispatch<SetStateAction<boolean>>;
}

function HistroyItem({ list, setIsChanged }: HistoryProps) {
  // 거래 취소 및 취소 해제 버튼 핸들링
  const handleCancel = (event: MouseEvent, list: IOrdalDetailAll) => {
    event.preventDefault();
    const cancelParam = {
      isCanceled: false,
    };
    if (list.isCanceled) {
      const confirm = window.confirm("거래 취소를 해제하시겠습니까?");
      if (confirm) {
        salesManage(list.detailId, cancelParam);
        setIsChanged((prev) => !prev);
      }
    } else {
      const confirm = window.confirm("거래를 취소하시겠습니까?");
      if (confirm) {
        cancelParam.isCanceled = true;
        salesManage(list.detailId, cancelParam);
        setIsChanged((prev) => !prev);
      }
    }
  };

  // 거래 취소 및 취소 해제 버튼 핸들링
  const handleConfirm = (event: MouseEvent, list: IOrdalDetailAll) => {
    event.preventDefault();
    const confirmParam = {
      done: false,
    };
    if (list.done) {
      const confirm = window.confirm("거래 확정을 해제하시겠습니까?");
      if (confirm) {
        salesManage(list.detailId, confirmParam);
        setIsChanged((prev) => !prev);
      }
    } else {
      const confirm = window.confirm("거래를 확정하시겠습니까?");
      if (confirm) {
        confirmParam.done = true;
        salesManage(list.detailId, confirmParam);
        setIsChanged((prev) => !prev);
      }
    }
  };

  return (
    <ItemContainer>
      <ItemBox>
        <ID>{list.detailId}</ID>
        <UserName>{list.user.displayName}</UserName>
        <Product>{list.product.title}</Product>
        <TotalOrderAmount>{formatDollar(list.product.price)}</TotalOrderAmount>
        <TransactionTime>{adjustDate(list.timePaid)}</TransactionTime>
      </ItemBox>
      <BtnBox>
        {!list.done && (
          <CancelBtn
            admin
            onClick={(event: MouseEvent) => {
              handleCancel(event, list);
            }}
          >
            {list.isCanceled ? `취소 해제` : `거래 취소`}
          </CancelBtn>
        )}
        {!list.isCanceled && (
          <ConfirmBtn
            admin
            onClick={(event: MouseEvent) => {
              handleConfirm(event, list);
            }}
          >
            {list.done ? `확정 해제` : `거래 확정`}
          </ConfirmBtn>
        )}
      </BtnBox>
    </ItemContainer>
  );
}

const ItemContainer = styled.div`
  height: 70px;
  margin-bottom: 10px;
  display: flex;
  border-radius: 5px;
  transition: 0.1s;
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray[7]};
  &:hover {
    transform: scale(0.99);
    background-color: ${theme.colors.gray[2]};
  }
`;

const ItemBox = styled.div`
  display: flex;
  width: 100%;
`;

const ID = styled.div`
  justify-content: center;
  align-items: center;
  font-size: 14px;
  display: flex;
  width: 15%;
`;

const UserName = styled.div`
  justify-content: center;
  align-items: center;
  font-size: 14px;
  display: flex;
  width: 13%;
`;

const Product = styled.div`
  justify-content: center;
  align-items: center;
  font-weight: 700;
  display: flex;
  width: 34%;
`;

const TotalOrderAmount = styled.div`
  justify-content: center;
  align-items: center;
  font-size: 14px;
  display: flex;
  width: 13%;
`;

const TransactionTime = styled.div`
  justify-content: center;
  align-items: center;
  font-size: 14px;
  display: flex;
  width: 24%;
`;

const BtnBox = styled.div`
  display: flex;
  min-width: 280px;
  margin: auto 26px auto 0;
  justify-content: end;
  gap: 10px;
`;

const CancelBtn = styled(Button)`
  width: 123px;
  margin: auto 0 auto 0;
  background-color: white;
  color: ${theme.colors.orange.main};
  border: 1px solid ${theme.colors.orange.main};
  :hover{
    background-color: ${theme.colors.orange.main};
  }
`;

const ConfirmBtn = styled(Button)`
  width: 123px;
`;

export default HistroyItem;
