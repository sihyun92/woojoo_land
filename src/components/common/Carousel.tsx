import Slider, { CustomArrowProps, Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

interface ICarouselProps {
  children: React.ReactNode;
  slides: number;
  color: string;
}

function Carousel({ children, slides, color }: ICarouselProps) {
  // NextArrow 컴포넌트
  const NextArrow = ({
    currentSlide,
    slideCount,
    ...props
  }: CustomArrowProps) => {
    return <MdArrowForwardIos {...props} color={color} />;
  };

  // PrevArrow 컴포넌트
  const PrevArrow = ({
    currentSlide,
    slideCount,
    ...props
  }: CustomArrowProps) => {
    return <MdArrowBackIosNew {...props} color={color} />;
  };

  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: slides,
    autoplay: true,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
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
    left: -80px;
  }

  .slick-next {
    position: absolute;
    right: -70px;
  }

  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }
`;

export default Carousel;
