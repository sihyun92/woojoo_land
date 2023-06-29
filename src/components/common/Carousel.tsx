import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

interface ICarouselProps {
  children: React.ReactNode;
  slides: number;
  color: string;
}

function Carousel({ children, slides, color }: ICarouselProps) {
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: slides,
    autoplay: true,
    arrows: true,
    nextArrow: <SlArrowRight color={color} />,
    prevArrow: <SlArrowLeft color={color} />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return <StyledSlider {...settings}>{children}</StyledSlider>;
}

const StyledSlider = styled(Slider)`
  position: relative;

  .slick-prev {
    position: absolute;
    left: -70px;
  }

  .slick-next {
    position: absolute;
    right: -42px;
  }

  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }
`;

export default Carousel;
