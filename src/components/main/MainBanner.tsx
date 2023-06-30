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
      <Carousel slides={1} color={theme.colors.white}>
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
  display: flex;
  color: white;
  text-align: center;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.black};

  .slick-slider {
    width: 1250px;
    
  }

  .slick-list {
    
  }

  .slick-dots {
    position: absolute;
    bottom: 12px;
  }

  .slick-arrow {
    width: 5rem;
    height: 4rem;
    top: 210px;
  }

  .slick-prev {
    opacity: 0;
    transition: 0.2s;
    &:hover {
      opacity: 0.6;
    }
  }

  .slick-next {
    opacity: 0;
    transition: 0.2s;
    right: -68px;
    &:hover {
      opacity: 0.6;
    }
  }

`;

const Image = styled.img`
  vertical-align: bottom;
  cursor: pointer;
`;

export default Banner;
