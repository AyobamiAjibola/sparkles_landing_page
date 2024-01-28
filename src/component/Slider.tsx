'use client'
import images from '@/constant/images';
import { Carousel } from 'antd';
import Image from 'next/image';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function ImageSlider() {
  const sliderWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Carousel 
        autoplay
        dots={false}
    >
        <div>
            <img 
                src="images/img1.png" 
                style={{
                    width: sliderWidth,
                    height: "918px"
                }}
                alt="Image" 
            />
        </div>
        <div>
            <img 
                src="images/img2.png" 
                style={{
                    width: sliderWidth,
                    height: "918px"
                }}
                alt="Image" 
            />
        </div>
        <div>
            <img 
                src="images/img3.png" 
                style={{
                    width: sliderWidth,
                    height: "918px"
                }}
                alt="Image" 
            />
        </div>
        <div>
            <img 
                src="images/img4.png" 
                style={{
                    width: sliderWidth,
                    height: "918px"
                }}
                alt="Image" 
            />
            {/* <Image
                src={images.img4}
                alt="image"
                width={sliderWidth}
                height={918}
            /> */}
        </div>
    </Carousel>
  )
}
