import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ICarouselProps {
  children: React.ReactNode;
  slides: number;
}

function Carousel({ children, slides }: ICarouselProps) {
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: slides,
    autoplay: true,
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

  return <Slider {...settings}>{children}</Slider>;
}

export default Carousel;
