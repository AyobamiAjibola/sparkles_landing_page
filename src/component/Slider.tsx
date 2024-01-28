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
                style={{
                    width: windowWidth,
                    height: isSmallScreen ? "550px" : "918px"
                }}
                alt="Image" 
            />
        </div>
        <div>
            <Image 
                src={images.img2}
                style={{
                    width: windowWidth,
                    height: isSmallScreen ? "550px" : "918px"
                }}
                alt="Image" 
            />
        </div>
        <div>
            <Image
                src={images.img3}
                style={{
                    width: windowWidth,
                    height: isSmallScreen ? "550px" : "918px"
                }}
                alt="Image" 
            />
        </div>
        <div>
            <Image 
                src={images.img4}
                style={{
                    width: windowWidth,
                    height: isSmallScreen ? "550px" : "918px"
                }}
                alt="Image" 
            />
        </div>
    </Carousel>
  )
}
