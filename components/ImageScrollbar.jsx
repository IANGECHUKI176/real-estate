import { useContext,useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import SwiperCore, { FreeMode, Navigation, Thumbs } from "swiper";

SwiperCore.use([FreeMode, Navigation, Thumbs]);

const ImageScrollbar = ({ data }) => {
      const [thumbsSwiper, setThumbsSwiper] = useState(null);
      return (
        <>
          <Swiper
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            className='mySwiper2'
          >
            {data?.map((image) => (
              <SwiperSlide>
                <Image
                  src={image?.url}
                  blurDataURL={image?.url}
                  width={1000}
                  height={500}
                  placeholder='blur'
                  alt='image'
                  sizes='(max-width: 500px) 100px, (max-width: 1023px) 400px, 1000px'
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            className='mySwiper'
          >
            {data?.map((image) => (
              <SwiperSlide>
                <Image
                  src={image?.url}
                  blurDataURL={image?.url}
                  width={1000}
                  height={500}
                  placeholder='blur'
                  alt='image'
                  sizes='(max-width: 500px) 100px, (max-width: 1023px) 400px, 1000px'
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      );

}
export default ImageScrollbar;

  

/* <ScrollMenu
    LeftArrow={LeftArrow}
    RightArrow={RightArrow}
    style={{ overflow: "hidden" }}
  >
    {data?.map((image) => (
      <Box
        width='910px'
        height=' 500px'
        key={image.id}
        itemId={image.id}
        overflow='hidden'
      >
        <Image
          src={image?.url}
          blurDataURL={image?.url}
          width={1000}
          height={500}
          placeholder='blur'
          alt='image'
          sizes='(max-width: 500px) 100px, (max-width: 1023px) 400px, 1000px'
        />
      </Box>
    ))}
  </ScrollMenu>
  */