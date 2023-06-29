import styled from "styled-components";
import Carousel from "../common/Carousel";
import { theme } from "../../styles/theme";
import { useNavigate } from "react-router-dom";

function Banner() {
  const navigate = useNavigate();

  const onToTheMoon = () => {
    navigate("/product/6ENwqwRTuR0GV5X22nTm");
  };
  const onToTheMars = () => {
    navigate("/product/6wfO1el9sgHaB8PsDX3J");
  };
  const onToDelivery = () => {
    navigate("/product/NwRt7wwheSKJl4YH7b0f");
  };

  return (
    <Container>
      <Carousel slides={1} color="white">
        <Image
          src="/images/BannerImage1.png"
          alt="banner1"
          onClick={onToTheMoon}
        />
        <Image
          src="/images/BannerImage2.png"
          alt="banner1"
          onClick={onToDelivery}
        />
        <Image
          src="/images/BannerImage3.png"
          alt="banner1"
          onClick={onToTheMars}
        />
      </Carousel>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  color: white;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.black};

  .slick-slider {
    width: 100rem;
  }

  .slick-list {
  }

  .slick-arrow {
    width: 5rem;
    height: 4rem;
    top: 280px;
  }
`;

const Image = styled.img`
  vertical-align: bottom;
  cursor: pointer;
`;

export default Banner;
