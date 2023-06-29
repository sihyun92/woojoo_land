import styled from "styled-components";
import Carousel from "../common/Carousel";
import { theme } from "../../styles/theme";

function Banner() {
  return (
    <Container>
      <Carousel slides={1}>
        <Image src="/images/BannerImage1.png" alt="banner1" />
        <Image src="/images/BannerImage2.png" alt="banner1" />
        <Image src="/images/BannerImage3.png" alt="banner1" />
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
`;

export default Banner;
