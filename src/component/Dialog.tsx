import React from 'react';
import { Button, Drawer } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import icons from '@/constant/icons';
import Image from 'next/image';

const App = ({open, setOpen}: {open: boolean, setOpen: any}) => {

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const sliderWidth = typeof window !== 'undefined' ? window.innerWidth : 0;

  return (
    <>
      <Drawer 
        onClose={onClose} 
        open={open}  
        closable={false}
        width={70/100 * sliderWidth}
        style={{
          backgroundColor: '#221E1F'
        }}
      >
        <div className='w-[100%] flex justify-between'>
          <div/>
          <CloseOutlined 
            style={{
              color: 'white', 
              fontSize: '20px', 
              marginRight: '30px', 
              marginTop: '20px'
            }} 
            onClick={() => setOpen(false)}
          />
        </div>
        <div className='flex flex-col justify-center items-center gap-6'>
          <div className='flex flex-row gap-2 justify-center items-center mt-[60px]'>
            <Image
              src={icons.user}
              width={30}
              height={30}
              alt='icon'
            />
            <p className='text-sm text-white font-light'>Login/Signup</p>
          </div>

          <button className='text-white text-xs bg-[#B39B77] w-[60%] h-[40px] rounded-full'>
            For Business
          </button>
        </div>
      </Drawer>
    </>
  );
};

export default App;