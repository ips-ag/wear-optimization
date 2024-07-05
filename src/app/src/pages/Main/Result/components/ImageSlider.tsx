import { Box, Circle, HStack, Image } from '@chakra-ui/react';
import Slider, { Settings } from 'react-slick';

import { Maybe } from '@/types';
import { useRef, useState } from 'react';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import AccurateText from './AccurateText';
import AccurateTooltip from './AccurateTooltip';

interface Props {
  images: string[];
  wearConfident: Maybe<number>;
}

const settings: Settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function ImageSlider({ images, wearConfident }: Props) {
  const [slideIndex, setSlideIndex] = useState(0);
  const sliderRef = useRef<Slider | null>(null);

  return (
    <Box w="full">
      <Slider {...settings} ref={sliderRef} beforeChange={(_, next) => setSlideIndex(next)}>
        {images
          .filter(item => !!item)
          .map((image, index) => (
            <Image key={index} src={image} alt={`image-${index}`} w="full" objectFit="contain" />
          ))}
      </Slider>
      <HStack justifyContent="space-between" px="4" align="center">
        <HStack>
          <AccurateText wearConfident={wearConfident} />
          <AccurateTooltip />
        </HStack>
        <HStack justifyContent="flex-end">
          {images.map((_, index) => (
            <Circle
              key={index}
              onClick={() => sliderRef.current?.slickGoTo(index)}
              size={index === slideIndex ? '12px' : '10px'}
              bg={index === slideIndex ? 'brand.green.primary' : 'brand.grey.100'}
            />
          ))}
        </HStack>
      </HStack>
    </Box>
  );
}
