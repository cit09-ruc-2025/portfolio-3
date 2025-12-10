import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ReusableSlider = ({
  children,
  slidesToShow = 4,
  slidesToScroll = 1,
  showDots = true,
  showArrows = true,
  responsive = [],
}) => {
  const settings = {
    dots: showDots,
    infinite: true,
    speed: 500,
    slidesToShow,
    slidesToScroll,
    arrows: showArrows,

    responsive: responsive.length
      ? responsive
      : [
          { breakpoint: 1200, settings: { slidesToShow: 3 } },
          { breakpoint: 768, settings: { slidesToShow: 2 } },
          { breakpoint: 480, settings: { slidesToShow: 1 } },
        ],
  };

  return <Slider {...settings}>{children}</Slider>;
};

export default ReusableSlider;
