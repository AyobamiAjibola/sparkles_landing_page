'use client'
import images from '@/constant/images';
import { Carousel } from 'antd';
import Image from 'next/image';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function ImageSlider() {
  const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Carousel 
        autoplay
        dots={false}
    >
        <div>
            <Image 
                src={images.img1}
                width={windowWidth}
                height={918}
                alt="Image" 
            />
        </div>
        <div>
            <Image 
                src={images.img2}
                width={windowWidth}
                height={918}
                alt="Image" 
            />
        </div>
        <div>
            <Image
                src={images.img3}
                width={windowWidth}
                height={918}
                alt="Image" 
            />
        </div>
        <div>
            <Image 
                src={images.img4}
                width={windowWidth}
                height={918}
                alt="Image" 
            />
        </div>
    </Carousel>
  )
}
