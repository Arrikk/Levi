import React from 'react'
import { Link } from 'next/link';
import { useState } from 'react';

const Front = ({setIdCard, idCard, setFormData, formData}) => {
    const [selectedImage, setSelectedImage] = useState();

    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0])
            setFormData({...formData, front: e.target.files[0]});
        }
    };

    const setNext = () => {
        setIdCard({...idCard, front:false, back:true})
    }
    
  return (
    <div className={`sm:w-[60%] w-[100%] px-5 sm:px-0 min-h-[100vh] py-[5rem] mx-auto`}>
        <h1 className="text-3xl text-center mb-5">Please capture the front of your identity card</h1>
        <p className="text-lg text-center">Please show the front side of your ID card in the marked area and press the button "Capture".</p>

        <div className="flex sm:flex-row flex-col gap-x-[4rem]">
            <div className="mt-10 w-[max-content] mx-auto self-center">
                <>
                    <input
                        accept="image/*"
                        type="file"
                        onChange={imageChange}
                        className="hidden"
                        id="driver_license_front"
                    />

                    <div>
                        <img
                            src={selectedImage ? URL.createObjectURL(selectedImage) : "/images/idF.png"}
                            alt="Thumb"
                            className="w-[auto] h-[25rem]"
                        />
                    </div>
                </>
            </div>

            <div className="mt-12">
                <h2 className="text-center text-lg">Main mistakes:</h2>
                <div className="flex flex-col gap-x-4 mt-[-1rem] mb-10">
                    <div className="mt-10 w-[max-content] mx-auto">
                        <div className="w-[10rem] h-[auto] mb-1">
                            <img src="/images/idF.png" className="blur-[1px]" />
                        </div>
                        <div className="flex items-center gap-x-2 w-[max-content] mx-auto mt-2">
                            <div className="bg-white rounded-[50%] w-[max-content] h-[max-content]">
                                <img src="/images/cancel.png" className="w-[1rem] h-[1rem]" />
                            </div>
                            <p>Too blurry</p>
                        </div>
                    </div>

                    <div className="mt-10 w-[max-content] mx-auto">
                        <div className="w-[10rem] h-[auto]">
                            <img src="/images/idF.png" className="object-cover" />
                        </div>

                        <div className="flex items-center gap-x-2 w-[max-content] mx-auto mt-2">
                            <div className="bg-white rounded-[50%] w-[max-content] h-[max-content]">
                                <img src="/images/cancel.png" className="w-[1rem] h-[1rem]" />
                            </div>
                            <p>Too small</p>
                        </div>
                    </div>

                    <div className="mt-10 w-[max-content] mx-auto">
                        <div className="w-[10rem] h-[auto]">
                            <img src="/images/idF.png" className="opacity-50" />
                        </div>

                        <div className="flex items-center gap-x-2 w-[max-content] mx-auto mt-2">
                            <div className="bg-white rounded-[50%] w-[max-content] h-[max-content]">
                                <img src="/images/cancel.png" className="w-[1rem] h-[1rem]" />
                            </div>
                            <p>Too dark</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <label htmlFor="driver_license_front" className="rounded-full flex items-center w-[max-content] mx-auto p-3 px-[4rem] bg-leviplatte gap-x-3 text-xl text-white cursor-pointer">
            Start
            <img src="/images/camera.png" className="w-[1.5rem] h-[1.5rem]" />
        </label>
        {/* </Link> */}

        <p className="sm:w-[max-content] mt-4 mx-auto">Want to select different document?
        {/* <Link href="/document"><span className="underline">Click here </span></Link>  */}
        </p>
        {formData.front &&  <button onClick={setNext} className="rounded-full flex items-center w-[max-content] mx-auto p-3 px-[4rem] bg-leviplatte gap-x-3 text-xl text-white cursor-pointer">Next</button>}
       

    </div>
  )
}

export default Front