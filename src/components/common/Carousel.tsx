import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ICarouselProps {
  children: React.ReactNode;
  className?: string;
  autoplay?: boolean | number;
  speed?: number;
  loop?: boolean;
}

function Carousel({ children, autoplay, speed, loop }: ICarouselProps) {
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
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
