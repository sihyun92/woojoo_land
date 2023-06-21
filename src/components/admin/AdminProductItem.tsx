import styled from "styled-components";
import { theme } from "../../styles/theme";
import Button from "../common/Button";

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

function AdminProductItem(props: IProduct) {
  return (
    <ItemContainer>
      <ItemBox>
        <ProductImg>
          {props.thumbnail && (<img src={props.thumbnail} alt="Thumbnail" />)}
          {/* <img src="/images/Thumbnail.png" alt="기본 이미지" /> */}
        </ProductImg>
        <ProductTitle>{props.title}</ProductTitle>
        <ProductId>{props.id}</ProductId>
        <ProductPrice>{props.price}원</ProductPrice>
        <ProductTags>{props.tags}</ProductTags>
        <ProductIsSoldOut>{props.isSoldOut}</ProductIsSoldOut>
        <ProductDiscountRate>{props.discountRate}</ProductDiscountRate>
      </ItemBox>
      <AddBtn admin>추가하기</AddBtn>
    </ItemContainer>
  );
}

const ItemBox = styled.div`
  font-size: 16px;
  display: flex;
  width: 100%;
`;

const AddBtn = styled(Button)`
  margin: auto 26px auto 0;
`;

const ItemContainer = styled.div`
  background-color: ${theme.colors.gray[2]};
  border: 1px solid ${theme.colors.gray[3]};
  border-radius: 5px;
  overflow: hidden;
  display: flex;
`;

const ProductImg = styled.div`
  justify-content: center;
  max-height: 120px;
  display: flex;
  width: 15%;
  padding: auto;
  align-items: center;
  img {
    height: 80%;
    border-radius: 5px;
  }
`;

const ProductTitle = styled.div`
  justify-content: center;
  display: flex;
  margin: auto;
  width: 20%;
`;

const ProductId = styled.div`
  justify-content: center;
  display: flex;
  margin: auto;
  width: 20%;
`;

const ProductPrice = styled.div`
  justify-content: center;
  display: flex;
  margin: auto;
  width: 10%;
`;

const ProductTags = styled.div`
  justify-content: center;
  display: flex;
  margin: auto;
  width: 15%;
`;

const ProductIsSoldOut = styled.div`
  justify-content: center;
  display: flex;
  margin: auto;
  width: 10%;
`;

const ProductDiscountRate = styled.div`
  justify-content: center;
  display: flex;
  margin: auto;
  width: 10%;
`;

export default AdminProductItem;
