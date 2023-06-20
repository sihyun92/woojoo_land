import { BiPlusCircle, BiMinusCircle } from "react-icons/bi";
import styled from "styled-components";

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
      <BiMinusCircle onClick={onDecrease}>-</BiMinusCircle>
      <p>{quantity}</p>
      <BiPlusCircle onClick={onIncrease}>+</BiPlusCircle>
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.div`
  display: flex;
  gap: 0.5rem;

  > svg {
    font-size: 1.5rem;
    cursor: pointer;
  }
  > p {
    font-size: 1.5rem;
    width: 2rem;
    text-align: center;
  }
`;

export default MainProductBtn;
