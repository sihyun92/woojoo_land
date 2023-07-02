import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import styled from "styled-components";
import { theme } from "../../styles/theme";

interface IQtyButtonProps {
  quantity: number;
  setQuantity: (value: number) => void;
}

function MainProductBtn({ quantity, setQuantity }: IQtyButtonProps) {
  // 구매 수량 증가
  const onDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  // 구매 수량 감소
  const onIncrease = () => {
    setQuantity(quantity + 1);
  };

  return (
    <ButtonWrapper>
      <AiFillMinusCircle onClick={onDecrease}>-</AiFillMinusCircle>
      <p>{quantity}</p>
      <AiFillPlusCircle onClick={onIncrease}>+</AiFillPlusCircle>
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.div`
  display: flex;
  gap: 0.5rem;

  > svg {
    cursor: pointer;
    font-size: 24px;
    transition: 0.1s;
    color: ${theme.colors.gray[3]};
    :hover {
      color: ${theme.colors.orange.main};
    }
  }
  > p {
    font-size: 1.5rem;
    width: 2rem;
    text-align: center;
  }
`;

export default MainProductBtn;
