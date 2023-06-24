import AdminProductItemEdit from "./AdminProductItemEdit";
import AdminModalTemplate from "./AdminModalTemplate";
import { theme } from "../../styles/theme";
import styled from "styled-components";
import Button from "../common/Button";
import { useState } from "react";
import { productDel } from "../../lib/API/adminAPI";

//응답 타입
interface IProduct {
  id: string;
  title: string;
  price: number;
  description: string;
  tags: string[];
  thumbnail: string | null;
  photo: string | null;
  isSoldOut: boolean;
  discountRate: number;
}

function AdminProductItem(props: IProduct, render: any) {
  //모달 상태 기본값 false다 true로 바뀌면 modalOpen의 값이되며 이 값은 return문의 AdminModal 컴포넌트 요청에 사용된다.
  const [modalOpen, setModalOpen] = useState(false);

  //모달 요청 setModalOpen()에 true 값을 보낸다.
  const editModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setModalOpen(true);
  };

  //모달 창을 닫는 기능
  const ModalClose = () => {
    // setModalOpen(false) 또는 다른 원하는 동작을 수행합니다.
    setModalOpen(false);
  };

  // 제품 삭제 함수
  const onDelete = async (
    event: React.MouseEvent<HTMLButtonElement>,
    ID: string,
  ) => {
    event.preventDefault();
    await productDel(ID);
    //상품 리스트 재호출
  };

  return (
    <ItemContainer>
      <ItemBox>
        <ProductImg>
          {props.thumbnail && <img src={props.thumbnail} alt="Thumbnail" />}
          {!props.thumbnail && (
            <img src="/images/Thumbnail.png" alt="기본 이미지" />
          )}
        </ProductImg>
        <ProductTitle>{props.title}</ProductTitle>
        <ProductId>{props.id}</ProductId>
        <ProductPrice>{props.price}원</ProductPrice>
        <ProductTags>{props.tags}</ProductTags>
        <ProductIsSoldOut>{props.isSoldOut}</ProductIsSoldOut>
        <ProductDiscountRate>{props.discountRate}</ProductDiscountRate>
      </ItemBox>
      <BtnBox>
        <EditBtn onClick={editModal} adminedit>
          수정
        </EditBtn>
        <DeleteBtn admindel onClick={(event: any) => {onDelete(event, props.id)}}>삭제</DeleteBtn>
      </BtnBox>
      {/* modalOpen이 true인경우 AdminModal 호출 */}
      {modalOpen && (
        <AdminModalTemplate>
          <AdminProductItemEdit setModalOpen={ModalClose} />
        </AdminModalTemplate>
      )}
    </ItemContainer>
  );
}

const ItemBox = styled.div`
  width: 100%;
  display: flex;
  font-size: 18px;
`;

const BtnBox = styled.div`
  width: 134px;
  display: flex;
  margin: auto 26px auto 0;
`;

const EditBtn = styled(Button)``;

const DeleteBtn = styled(Button)`
  margin-left: 6px;
`;

const ItemContainer = styled.div`
  display: flex;
  overflow: hidden;
  border-radius: 5px;
  background-color: ${theme.colors.gray[2]};
  border: 1px solid ${theme.colors.gray[3]};
`;

const ProductImg = styled.div`
  width: 15%;
  display: flex;
  padding: auto;
  max-height: 120px;
  align-items: center;
  justify-content: center;
  img {
    height: 80%;
    border-radius: 5px;
  }
`;

const ProductTitle = styled.div`
  width: 20%;
  margin: auto;
  display: flex;
  font-weight: 700;
  justify-content: center;
`;

const ProductId = styled.div`
  width: 20%;
  margin: auto;
  display: flex;
  justify-content: center;
`;

const ProductPrice = styled.div`
  width: 10%;
  margin: auto;
  display: flex;
  justify-content: center;
`;

const ProductTags = styled.div`
  width: 15%;
  margin: auto;
  display: flex;
  justify-content: center;
`;

const ProductIsSoldOut = styled.div`
  width: 10%;
  margin: auto;
  display: flex;
  justify-content: center;
`;

const ProductDiscountRate = styled.div`
  width: 10%;
  margin: auto;
  display: flex;
  justify-content: center;
`;

export default AdminProductItem;
