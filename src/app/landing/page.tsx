'use client'
import icons from "@/constant/icons";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDownOutlined, CloseCircleFilled, CloseOutlined } from "@ant-design/icons";
import images from "@/constant/images";
import Marquee from "react-fast-marquee";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import './style.css';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuDialog from "@/component/Dialog";
import { Carousel } from 'antd';
import { db, addDoc, collection, query, where, getDocs  } from "../firebase";
import { Dialog } from "@mui/material";
import { stateLga } from "@/constant/state";
import Select from "react-select";
import { customStyles } from "@/constant/customStyles";
import ImageSlider from "@/component/Slider";

const type = [
    {label: "Barber", value: "barber"},
    {label: "Hair Stylist", value: "hair stylist"},
    {label: "Spa", value: "spa"}
];

const modeOfOperation = [
    {label: "Operation", value: "mode"},
    {label: "Operation", value: "mode"},
    {label: "Operation", value: "mode"}
]

function Landing() {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const about = useRef(null);
  const getStarted = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    email: ''
  });
  const [selectState, setSelectedState] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [state, setState] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState('');
  const [selectedModeOfOperation, setSelectedModeOfOperation] = useState('');

  const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
  const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 0;

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true)
    try {
        const waitlistCollection = collection(db, 'waitlist');
        const q = query(waitlistCollection, where('email', '==', formData.email.toLowerCase()));

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            setIsLoading(false)
            return setError(true)
        }
        await addDoc(waitlistCollection, {
            name: formData.name,
            contactNumber: formData.contactNumber,
            email: formData.email.toLowerCase(),
            businessType: selectedBusiness,
            modeOfOperation: selectedModeOfOperation,
            stateOfOperation: selectState,
        });

        setIsLoading(false);
        setSuccess(true)
        setFormData({
            name: '',
            contactNumber: '',
            email: ''
        });
        setSelectedModeOfOperation('');
        setSelectedBusiness('');
        setSelectedState('')
    } catch (error) {
        console.log(error, 'error')
        setIsLoading(false)
    }
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const scrollToSection = (sectionRef: any) => {
    sectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const content = [
    {title: 'Braids & Locs', src: icons.serv1},
    {title: 'Welllness & Day Spa', src: icons.serv2},
    {title: 'Aesthetics Medicine', src: icons.serv3},
    {title: 'Barbershop', src: icons.serv4},
    {title: 'Nail Salon', src: icons.serv5}, 
    {title: 'Massage', src: icons.serv6}, 
    {title: 'Brows & Lashes', src: icons.serv7},
    {title: 'Car Wash', src: icons.serv8},
    {title: 'Pedicure & Manicure', src: icons.serv9}, 
    {title: 'Nail Removal', src: icons.serv10}, 
    {title: 'Home Maintenance', src: icons.serv12},
    {title: 'Pet Services', src: icons.serv14}, 
    {title: 'Dental Orthodantics', src: icons.serv15},
    {title: 'Health and Fitness', src: icons.serv16},
    {title: 'Professional Services', src: icons.serv17}, 
    {title: 'Hair Salon', src: icons.serv18}
  ]

  const content2 = [
    {type: "SPA", src: images.cImg1}, 
    {type: "Massages", src: images.cImg2},
    {type: "Barbershop", src: images.cImg3},
    {type: "Braids & Locs", src: images.cImg4}
  ];

  const content3 = [
    {message: `I used to think spa days were a luxury 
    I couldn't afford. But with Sparkles, I get amazing 
    deals on massages, facials, and even nails! Now, 
    self-care is a regular part of my routine, and I 
    feel fantastic. My skin is glowing, my muscles are 
    relaxed, and my confidence is soaring.`, src: images.client1, name: "Maria"}, 
    {message: `Spring cleaning? More like spring screaming! 
    But then I discovered Sparkles. Their cleaning 
    service is a game-changer! My house is spotless 
    from top to bottom, and I didn't lift a finger. Now, 
    I can actually enjoy spring instead of dreading it.`, src: images.client2, name: "Jessica"},
    {message: ` "I'm all about brows on fleek! Sparkles 
    hooked me up with a microblading artist who gave me 
    flawless arches at a fraction of the usual cost. Now, 
    I wake up looking put-together, even before my 
    first cup of coffee!`, src: images.client3, name: "Lisa"},
    {message: `Forget gym memberships! I found a personal 
    trainer on Sparkles who comes right to my apartment. 
    We work out in the park, and it's so much more fun 
    (and affordable) than being stuck in a crowded gym. 
    Bonus points for the stunning park views!`, src: images.client4, name: "David"}
  ];

  const content4 = [
    {type: "Barber", src: images.elips1}, 
    {type: "Selfcare", src: images.elips2},
    {type: "Make Up", src: images.elips3},
    {type: "Lashes & Brows", src: images.elips4},
    {type: "Hair Waxing", src: images.elips5}
  ];

  const content5 = [
    images.img1,
    images.img2,
    images.img3,
    images.img4,
  ];

  useEffect(() => {
    let stateArray: any = [];
    const newData = Object.entries(stateLga);

    newData.map((item, index) => {
      stateArray.push({
        value: item[0],
        label: item[0],
      });
    });
    setState(stateArray);
  }, []);

  return (
    <main>
        {!isSmallScreen && (<ImageSlider/>)}
        {isSmallScreen && (<img
            src='images/img1.png'
            style={{
                width: windowWidth,
                height: '550px'
            }}
        />)}
        <section 
            className={`absolute top-0 left-0 z-[0] flex flex-col flex-center items-center ${isSmallScreen ? 'pl-5 pr-5 pt-5' : 'pl-[80px] pr-[80px] pt-10'} w-[100%]`}>
            <div className="flex justify-between w-full">
                <div className="flex flex-row gap-3">
                    <Image
                        src={icons.logo}
                        alt="image"
                        width={isSmallScreen ? 30 : 60}
                        height={isSmallScreen ? 25 : 55}
                    />
                    <div className="flex flex-col justify-center">
                        <p className={`${isSmallScreen ? 'text-xs' : 'text-sm'} text-white`}>Sparkles</p>
                        <p className={`${isSmallScreen ? 'text-xs' : 'text-sm'} text-white`}>Technologies</p>
                    </div>
                </div>
                {!isSmallScreen && (<div className="flex items-center flex-row">
                    <Image
                        src={icons.user}
                        alt="image"
                        width={32}
                        height={32}
                    />
                    <p className="text-xs text-white font-normal ml-2 hover:text-[#B39B77] cursor-pointer hover:font-bold">Login/Signup</p>
                    <button className="button ml-4 pl-3 pr-3 text-xs h-7 hover:bg-white hover:text-[#B39B77]">
                        For Business
                    </button>
                </div>)}
                {isSmallScreen && (<div className="flex items-center flex-row">
                        <Image
                            src={icons.burg}
                            width={30}
                            height={30}
                            alt='menu'
                            onClick={() => setOpen(true)}
                            className="cursor-pointer"
                        />
                    </div>
                )}
                <MenuDialog
                    open={open}
                    setOpen={setOpen}
                />
            </div>
            <div className={`flex flex-col justify-center items-center ${isSmallScreen ? 'mt-[60px]' : 'mt-[150px]'} w-full`}>
                <h1 className={`font-bold text-white ${isSmallScreen ? 'text-[20px]' : 'text-[60px]'}`}>Shine More, Spend Less</h1>
                <p className={`font-light text-white ${isSmallScreen ? 'text-sm' : 'text-md'} text-center`}
                >Unlock exclusive deals on pampering and home care services in your city. </p>
                <div className={`flex ${isSmallScreen ? 'flex-col w-[80%]' : 'flex-row w-[60%]'} items-center gap-2 mt-10`}>
                    <div className={`${isSmallScreen ? 'w-[100%]' : 'w-[40%]'}`}>
                        <input 
                            type="text"
                            className="input h-11 pl-12 text-sm w-full"
                            placeholder="Search business or service"
                        />
                        <Image
                            src={icons.search}
                            alt="image"
                            width={20}
                            height={20}
                            className="absolute mt-[-30px] ml-4"
                        />
                    </div>
                    <div className={`${isSmallScreen ? 'w-[100%]' : 'w-[30%]'} flex flex-center items-center`}>
                        <input 
                            type="text"
                            className="input h-11 pl-10 text-sm w-full"
                            placeholder="Where"
                        />
                        <Image
                            src={icons.location}
                            alt="image"
                            width={15}
                            height={20}
                            className="absolute ml-4 mt-1"
                        />
                    </div>
                    <button className={`button text-sm pl-8 pr-8 pt-3 pb-3 ${isSmallScreen ? 'w-[100%]' : 'w-[30%]'} hover:bg-white hover:text-[#B39B77]`}>
                        Search
                    </button>
                </div>

                <div className="w-[65%]">
                    {show && (
                        <Marquee className={`${isSmallScreen ? 'mt-[40px]' : 'mt-[120px]'}`}>
                            {content.map((image, index) => (
                                <div key={index} className={`flex flex-col items-center justify-center gap-2 ${isSmallScreen ? 'ml-3 mr-3' : 'ml-6 mr-6'}`}>
                                    <div
                                        className={`bg-[#6A706A] rounded-full ${isSmallScreen ? 'w-[30px] h-[30px]' : 'w-[50px] h-[50px]'} flex items-center justify-center ml-2 mr-2`}
                                    >
                                        <Image
                                            src={image.src}
                                            alt={`image-${index}`}
                                            width={isSmallScreen ? 20 : 30}
                                            height={isSmallScreen ? 20 : 30}
                                        />
                                    </div>
                                   {!isSmallScreen && (<p className="font-light text-xs text-white">
                                        {image.title}
                                    </p>)}
                                </div>
                            ))}
                        </Marquee>
                    )}
                    {!show && (<div className={`flex flex-row ${isSmallScreen ? 'mt-[40px] gap-[20px]' : 'mt-[120px] gap-[40px]'} justify-center items-center`}>
                        {content.slice(0, 4).map((image, index) => (
                            <div className="flex flex-col items-center justify-center autofill gap-2" key={index}>
                                <div
                                    className={`bg-[#6A706A] rounded-full ${isSmallScreen ? 'w-[30px] h-[30px]' : 'w-[50px] h-[50px]'} flex items-center justify-center`}
                                >
                                    <Image
                                        src={image.src}
                                        alt={`image-${index}`}
                                        width={isSmallScreen ? 20 : 30}
                                        height={isSmallScreen ? 20 : 30}
                                    />
                                </div>
                                {!isSmallScreen && (<p className="font-light text-xs text-white">
                                    {image.title}
                                </p>)}
                            </div>
                        ))}
                        <div className="flex flex-col justify-center items-center gap-2">
                            <div
                                onClick={() => setShow(true)}
                                className={`bg-[#6A706A] rounded-full ${isSmallScreen ? 'w-[30px] h-[30px]' : 'w-[50px] h-[50px]'} 
                                flex items-center justify-center cursor-pointer hover:bg-[#B39B77]`}
                            >
                                <Image
                                    src={icons.serv19}
                                    alt={`image`}
                                    width={isSmallScreen ? 20 : 30}
                                    height={isSmallScreen ? 20 : 30}
                                />
                            </div>
                            {!isSmallScreen && (<p className="font-light text-xs text-white">
                                More
                            </p>)}
                        </div>
                    </div>)}
                </div>

                <div className={`xs:bottom-10 bottom-32 flex justify-center items-center w-[65%] ${isSmallScreen ? 'mt-[20px] mb-4' : 'mt-[120px]'}`}>
                    <div onClick={() => scrollToSection(about)}
                        className="flex justify-center items-center flex-col gap-2 cursor-pointer"
                    >
                        <div className='w-[25px] h-[40px] rounded-3xl border-2 border-red flex justify-center items-start p-2'>
                            <motion.div
                                animate={{
                                    y: [0, 15, 0],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    repeatType: "loop",
                                }}
                                className='w-[3px] h-[10px] rounded-full bg-[white] mb-1'
                            />
                        </div>
                        <ArrowDownOutlined
                            style={{
                                color: 'white'
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>

        <section className={`flex flex-col justify-center items-center mb-10`}>
            <h1 className={`text-[#435944] font-bold ${isSmallScreen ? 'mt-[20px] text-[40px]' : 'mt-[60px] text-[60px]'}`}>Our Services</h1>
            <div className="w-[85%] flex justify-self-center">
                <Marquee>
                    {content2.map((image, index) => 
                        <div key={index} className="flex flex-col justify-center items-center">
                            <Image
                                src={image.src}
                                alt="image"
                                width={isSmallScreen ? 200 : 293}
                                height={isSmallScreen ? 270 : 318}
                            />
                            <p className="font-bold text-lg">{image.type}</p>
                        </div>
                    )}
                </Marquee>
            </div>
        </section>

        <section className={`flex flex-col ${isSmallScreen ? 'justify-start items-start' : 'justify-center items-center'} bg-[#F2F1F0] pb-10`}>
            <h1 className={`text-[#435944] font-bold ${isSmallScreen ? "text-[30px] pl-4 pr-4 mt-[20px]" : "text-[50px] mt-[50px]"}`}>Treat Yourself Without Breaking the Bank.</h1>
            <p className={`${isSmallScreen ? "text-justify pl-4 pr-4" : "w-[70%] text-center"} text-[#221E1F] font-light`}>{`Sparkles isn't just about saving money, it's about sparkling joy! We believe that everyone 
                deserves a little luxury, without sacrificing their financial well-being. That's why we've built 
                a platform that connects you with amazing deals on all your favourite lifestyle, beauty, and wellness 
                services, as well as convenient home care solutions.`}
            </p>
            <button onClick={() => scrollToSection(getStarted)} className={
                `button pl-8 pr-8 text-xs h-7 hover:bg-white hover:border hover:border-[#B39B77]
                hover:text-[#B39B77] pt-2 pb-6 mt-10 ml-4 mr-4`
            }>
                Get Started
            </button>
        </section>

        <section className={`${isSmallScreen ? "flex flex-col" : "flex flex-row"} items-center pb-10 pt-10`}>
            <div className={`${isSmallScreen ? "w-[100%] pl-[20px]" : "w-[50%] pl-[80px]"} flex flex-col justify-start`}>
                <p className={`${isSmallScreen ? "text-[30px]" : "text-[40px]"} text-[#435944] font-bold`}>Our Social Impact</p>
                <p className={`text-md ${isSmallScreen ? "mr-5" : "mr-20"} font-light`}>{`Good Business and doing good can and should go together. 
                With Sparkles, we show our customers how they can exercise their buying power to 
                realise Proven Positive Impact. `}
                </p>
                <br />
                <p className={`text-md ${isSmallScreen ? "mr-5" : "mr-20"} font-light`}>
                    {`Social Impact is core to Sparkles business strategy and operations. 
                    We provide social impact in the following areas;`}
                </p>
                <br />
                <div className="flex flex-row gap-3">
                    <Image
                        src={icons.bullet}
                        alt="icon"
                        width={25}
                        height={20}
                    />
                    <p className="text-md font-light">
                        Women's Healthcare and Young Adult
                    </p>
                </div>
                <br />
                <div className="flex flex-row gap-3">
                    <Image
                        src={icons.bullet}
                        alt="icon"
                        width={25}
                        height={20}
                    />
                    <p className="text-md font-light">
                        Soft skills and Hard skills training
                    </p>
                </div>
                <br />
                <div className="flex flex-row gap-3">
                    <Image
                        src={icons.bullet}
                        alt="icon"
                        width={25}
                        height={20}
                    />
                    <p className="text-md font-light">
                        Job Creation
                    </p>
                </div>
                <br />
                <p className={`text-md ${isSmallScreen ? "mr-5" : "mr-20"} font-light`}>
                    {`Through the Sparkles Platform, we are able to create job and economic upliftment
                        Booking on the Sparkles Platform help us achieve this goal. Book Today!`}
                </p>
            </div>
            <div className={`${isSmallScreen ? 'w-[100%] pr-4 pl-4 mt-20' : 'w-[50%] pr-20'}`}>
                <Image
                    src={images.socialImpact}
                    alt="social impact"
                    className="flex-1"
                />
            </div>
        </section>

        <section className="flex flex-col justify-center items-center bg-[#F2F1F0] pb-10 pt-10">
            <p className={`${isSmallScreen ? 'text-[25px] w-[90%]' : 'text-[40px]'} text-[#435944] font-bold`}>
                Do you want to make contributions to
            </p>
            <p className={`${isSmallScreen ? 'text-[25px] w-[90%]' : 'text-[40px]'} text-[#435944] font-bold`}>
                support our CAUSES
            </p>
            <div className={`flex flex-row ${isSmallScreen ? 'gap-3' : 'gap-10'}`}>
                <button className={
                    `bg-white font-light text-center text-[#B39B77] ${isSmallScreen ? 'pl-[2rem] pr-[2rem]' : 'pl-[5rem] pr-[5rem]'} text-sm border-[#B39B77]
                    hover:font-medium pt-4 pb-4 mt-10 border rounded-[3rem]`
                }>
                    Donate Items
                </button>
                <button className={
                    `bg-[#B39B77] text-center text-white ${isSmallScreen ? 'pl-[2rem] pr-[2rem]' : 'pl-[5rem] pr-[5rem]'} text-sm
                    hover:font-medium pt-4 pb-4 mt-10 border rounded-[3rem] font-light`
                }>
                    Donate Money
                </button>
            </div>
        </section>

        <section className={`flex flex-col items-center bg-[white] pt-10`} ref={about}>
            <div className={`flex ${isSmallScreen ? 'flex-col' : 'flex-row'}`}>
                <div className={`${isSmallScreen ? 'w-[80%]' : 'w-[50%] pr-10 pl-[80px]'}`}>
                    <Image
                        src={images.about}
                        alt="about image"
                        className={"flex-1 ml-5"}
                    />
                </div>
                <div className={`${isSmallScreen ? 'w-[100%] pl-[20px]' : 'w-[50%] pl-[30px]'} flex flex-col justify-center items-start`}>
                    <p className={`${isSmallScreen ? "text-[30px] mt-10" : "text-[40px]"} text-[#435944] font-bold`}>About Us</p>
                    <p className={`text-md ${isSmallScreen ? 'mr-10 text-justify' : 'mr-20'} font-light`}>
                        {`We connect you with top-rated businesses and talented independent Professionals offering a vast 
                            array of services across lifestyle, beauty, wellness, and home care.
                            Tired of breaking the bank for a little pampering? Sparkles offers exclusive deals and discounts 
                            on services you love, from luxurious spa treatments to expert haircuts and sparkling car washes. 
                            Short on time but big on expectations? Our mobile service options bring the sparkle directly to you, 
                            whether it's a relaxing massage in your living room or a skilled handyman tackling your to-do list.`}
                    </p>
                </div>
            </div>

            <div className={`flex flex-col justify-center items-center ${isSmallScreen ? 'mt-10' : 'mt-20'} w-[100%]`}>
                <p className={`${isSmallScreen ? 'text-[30px] ml-5 mb-0' : 'text-[40px] mb-6'} text-[#435944] font-bold`}>What our Clients are Saying</p>
                <div className="flex justify-self-center w-[85%]">
                    <Marquee>
                        {content3.map((item, index) => 
                            <div key={index} className={`flex flex-col justify-center items-center rounded-[2rem] shadow-lg p-6 w-[350px] h-[256px] ml-6 mr-6 mt-4 mb-4 border border-[#ECECED]`}>
                                <span className="font-light text-[12px] text-left mb-2">
                                    {item.message}
                                </span>
                                <div className="flex flex-row gap-1 w-full justify-start items-center">
                                    <Image
                                        src={item.src}
                                        alt="image"
                                        width={60}
                                        height={60}
                                        className="rounded-full m-5"
                                    />
                                    <p className="font-light text-[12px]">{item.name}</p>
                                </div>
                                
                            </div>
                        )}
                    </Marquee>
                </div>
            </div>

            <div className={`flex flex-col justify-center items-center ${isSmallScreen ? 'mt-5' : 'mt-20'} w-[100%]`}>
                <p className={`${isSmallScreen ? 'text-[30px] ml-5 mb-0' : 'text-[40px] mb-6'} text-[#435944] font-bold`}>Get inspired with Sparkles</p>
                <Swiper
                    slidesPerView={isSmallScreen ? 2 : 4}
                    spaceBetween={isSmallScreen ? 3 : 10}
                    mousewheel={true}
                    keyboard={true}
                    cssMode={true}
                    navigation={true}
                    modules={[Navigation, Mousewheel, Keyboard]}
                    className="w-[85%] h-[auto] mySwiper"
                >
                    {content4.map((item, index) => (
                        <SwiperSlide key={`${index}`}
                            className="bg-[white] rounded-[2rem] shadow-lg border border-[#ECECED] p-4 m-6 w-[237px] h-[350px]"
                        >
                            <div className="flex flex-col gap-1 justify-center items-center">
                                <Image
                                    src={item.src}
                                    alt="image"
                                    width={100}
                                    height={100}
                                    className="rounded-full m-5"
                                />
                                <p className="text-[16px] font-medium">{item.type}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className={`flex flex-col ${isSmallScreen ? 'mt-10 w-[100%] p-4 justify-start items-start pb-10' : 'mt-20 w-[65%] rounded-[2rem] p-8 justify-center items-center mb-20'} bg-[#435944]`} ref={getStarted}>
                <p className={`${isSmallScreen ? 'text-[30px]' : 'text-[40px]'} text-[white] font-bold`}>
                    Grow Your Business with Sparkles
                </p>
                <p className={`text-sm text-[white] font-light mb-10 ${isSmallScreen ? 'text-justify pr-10' : 'text-center w-[80%]'}`}>
                    {`Are you a business owner in the lifestyle, beauty, wellness, or 
                    home care industries? Do you dream of filling your appointment book, 
                    attracting new customers, and watching your business sparkle with success? 
                    Look no further than Sparkles!`}
                </p>
                <form className={`flex flex-col ${isSmallScreen ? 'w-[95%]' : 'w-[80%] gap-4'}`} onSubmit={handleSubmit}>
                    <div className={`flex ${isSmallScreen ? 'flex-col gap-4 w-[95%] mb-4' : 'flex-row gap-8'} items-center`}>
                        <div className={`flex flex-col justify-start items-start ${isSmallScreen ? 'w-[100%]' : 'w-[50%]'}`}>
                            <p className="text-sm text-[white] font-light">Full Name/Business Name</p>
                            <input 
                                type="text" 
                                required
                                name="name"
                                onChange={handleChange}
                                value={formData.name}
                                className="rounded-[0.5rem] border border-[white] w-full h-10 text-[black] font-light bg-[white] pl-2 pr-2"
                            />
                        </div>
                        <div className={`flex flex-col justify-start items-start ${isSmallScreen ? 'w-[100%]' : 'w-[50%]'}`}>
                            <p className="text-sm text-[white] font-light">Contact Number</p>
                            <input 
                                type="text" 
                                required
                                name="contactNumber"
                                onChange={handleChange}
                                value={formData.contactNumber}
                                className="rounded-[0.5rem] border border-[white] w-full h-10 text-[black] font-light bg-[white] pl-2 pr-2"
                            />
                        </div>
                    </div>

                    <div className={`flex ${isSmallScreen ? 'flex-col gap-4 w-[95%] mb-4' : 'flex-row gap-8'} items-center`}>
                        <div className={`flex flex-col justify-start items-start ${isSmallScreen ? 'w-[100%]' : 'w-[50%]'}`}>
                            <p className="text-sm text-[white] font-light">Email</p>
                            <input 
                                type="email" 
                                required
                                name="email"
                                onChange={handleChange}
                                value={formData.email}
                                className="rounded-[0.5rem] border border-[white] w-full h-10 text-[black] font-light bg-[white] pl-2 pr-2"
                            />
                        </div>
                        <div className={`flex flex-col justify-start items-start ${isSmallScreen ? 'w-[100%]' : 'w-[50%]'}`}>
                        <p className="text-sm text-[white] font-light">Business Type</p>
                            <Select
                                className="w-full h-10 font-light"
                                options={type}
                                styles={customStyles}
                                placeholder="Choose businessType"
                                name="businessType"
                                onChange={(item) => {
                                    setSelectedBusiness(String(item?.value))
                                  }}
                                value={{
                                    value: selectedBusiness,
                                    label: selectedBusiness,
                                }}
                            />
                        </div>
                    </div>

                    <div className={`flex ${isSmallScreen ? 'flex-col gap-4 w-[95%]' : 'flex-row gap-8'} items-center`}>
                        <div className={`flex flex-col justify-start items-start ${isSmallScreen ? 'w-[100%]' : 'w-[50%]'}`}>
                            <p className="text-sm text-[white] font-light">Mode of Operation</p>
                            <Select
                                className="w-full h-10 font-light"
                                options={modeOfOperation}
                                styles={customStyles}
                                placeholder="Choose businessType"
                                name="modeOfOperation"
                                onChange={(item) => {
                                    setSelectedModeOfOperation(String(item?.value))
                                  }}
                                value={{
                                    value: selectedModeOfOperation,
                                    label: selectedModeOfOperation,
                                }}
                            />
                        </div>
                        <div className={`flex flex-col justify-start items-start ${isSmallScreen ? 'w-[100%]' : 'w-[50%]'}`}>
                        <p className="text-sm text-[white] font-light">State of Operation</p>
                            <Select
                                className="w-full h-10 font-light"
                                options={state}
                                styles={customStyles}
                                placeholder="Choose state"
                                name="state"
                                onChange={(item) => {
                                    setSelectedState(String(item?.value))
                                  }}
                                value={{
                                    value: selectState,
                                    label: selectState,
                                }}
                            />
                        </div>
                    </div>

                    <button 
                        type='submit' 
                        disabled={isLoading}
                        className={`button w-full mt-4 pt-2 pb-2 ${isLoading ? 'hover:text-white hover:bg-[#B39B77]' : 'hover:text-[#B39B77] hover:bg-white'} text-md ${isSmallScreen && 'w-[95%]'}`}
                    >
                        {isLoading ? "Submitting..." : "Join Waitlist"}
                    </button>
                </form>
            </div>
        </section>

        <section className="flex flex-col justify-center items-center bg-[#221E1F] pb-[3rem] pt-10">
            {!isSmallScreen && (<div className={`flex flex-row gap-6 items-center justify-center`}>
                <p className="font-light text-xs text-white cursor-pointer hover:text-[#B39B77]" onClick={() => scrollToSection(about)}>About Us</p>
                <p className="font-light text-xs text-white cursor-pointer hover:text-[#B39B77]">FAQ</p>
                <p className="font-light text-xs text-white cursor-pointer hover:text-[#B39B77]">Term of Service</p>
                <p className="font-light text-xs text-white cursor-pointer hover:text-[#B39B77]">Contact Us</p>
                <p className="font-light text-xs text-white cursor-pointer hover:text-[#B39B77]">Privacy Policy</p>
            </div>)}
            {isSmallScreen && (<div className={`flex flex-row justify-between w-[100%] pl-5 pr-[60px]`}>
                <div className="flex gap-4 flex-col">
                    <p onClick={() => scrollToSection(about)} className="font-light text-xs text-white cursor-pointer hover:text-[#B39B77]">About Us</p>
                    <p className="font-light text-xs text-white cursor-pointer hover:text-[#B39B77]">FAQ</p>
                </div>
                <div className="flex gap-4 flex-col">
                    <p className="font-light text-xs text-white cursor-pointer hover:text-[#B39B77]">Term of Service</p>
                    <p className="font-light text-xs text-white cursor-pointer hover:text-[#B39B77]">Contact Us</p>
                    <p className="font-light text-xs text-white cursor-pointer hover:text-[#B39B77]">Privacy Policy</p>
                </div>
            </div>)}

            <div className="flex flex-row gap-6 items-center justify-center mt-[3rem]">
                <Image
                    src={icons.logo}
                    width={30}
                    height={30}
                    alt="logo"
                />
                <div className="flex flex-col">
                    <p className="font-light text-xs text-white">
                        Sparkle
                    </p>
                    <p className="font-light text-xs text-white">
                        Technology
                    </p>
                </div>
               <div className="flex flex-row gap-3">
                    <Image
                        alt="instagram"
                        src={icons.ig}
                        width={30}
                        height={30}
                    />
                    <Image
                        alt="facebook"
                        src={icons.fb}
                        width={30}
                        height={30}
                    />
                    <Image
                        alt="x"
                        src={icons.x}
                        width={30}
                        height={30}
                    />
               </div>
            </div>
            
            <span className="font-light text-md text-white mt-[2rem]">
                Copyright {new Date().getFullYear()}
            </span>
        </section>

        <Dialog onClose={() => {setSuccess(false), setError(false)}} open={success || error}>
            <section
                style={{
                    width: isSmallScreen ? 80/100 * windowWidth : 40/100 * windowWidth,
                    height: isSmallScreen ? 40/100 * windowHeight : 60/100 * windowHeight,
                    backgroundColor: '#221E1F'
                }}
            >
                <div className="flex flex-row justify-center items-center gap-4 mt-6 h-[10%]" >
                    <Image
                        src={icons.logo}
                        width={isSmallScreen ? 30 : 40}
                        height={isSmallScreen ? 30 : 40}
                        alt="logo"
                    />
                    <div className="flex flex-col justify-start items-start">
                        <p className={`font-light text-white ${isSmallScreen ? 'text-[10px]' : 'text-xs'}`}>Sparkles</p>
                        <p className={`font-light text-white ${isSmallScreen ? 'text-[10px]' : 'text-xs'}`}>Technology</p>
                    </div>
                </div>
                <div className="bg-white h-[70%] flex flex-col mt-4">
                    <div className="flex justify-end mr-10 mt-4">
                        <CloseOutlined style={{fontSize: '20px'}} onClick={() => {setSuccess(false), setError(false)}}/>
                    </div>
                    <div className="flex-1">
                        <div className="flex flex-col justify-center items-center h-[100%] w-[100%] gap-4">
                        {success && (<Image
                            src={icons.check}
                            width={60}
                            height={60}
                            alt="done"
                        />)}
                        {error && (<CloseCircleFilled style={{fontSize: '80px', color: 'red'}} />)}
                        <p className="font-medium text-sm">
                            {success && "You have successfully joined our waitlist."}
                            {error && "A user already exist in the waitlist with the provided email."}
                        </p>
                        </div>
                    </div>
                </div>
            </section>
        </Dialog>

    </main>
  )
}

export default Landing;