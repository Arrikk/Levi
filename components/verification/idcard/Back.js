import React from 'react'
import { useState } from 'react';

const Back = ({setIdCard, idCard, setFormData, formData}) => {
    const [selectedImageBack, setSelectedImageBack] = useState();

    const imageChangeBack = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImageBack(e.target.files[0]);
            setFormData({...formData, back: e.target.files[0]});
        }
    };
    const setNext = () => {
        setIdCard({...idCard, back:false, form:true})
    }
  return (
    <div className={`sm:w-[60%] w-[100%] px-5 sm:px-0 min-h-[100vh] py-[5rem] mx-auto`} name="slide-2" id="slide-2">
        <h1 className="text-3xl text-center mb-5">Please capture the back of your identity card</h1>
        <p className="text-lg text-center" >Please show the Please capture side of your ID card in the marked area and press the button "Capture".</p>

        <div className="flex sm:flex-row flex-col gap-x-4">
            <div className="mt-10 w-[max-content] mx-auto self-center">
                <>
                    <input
                        accept="image/*"
                        type="file"
                        onChange={imageChangeBack}
                        className="hidden"
                        id="driver_license_back"
                    />

                    <div>
                        <img
                            src={selectedImageBack ? URL.createObjectURL(selectedImageBack) : "/images/idBack.png"}
                            alt="Thumb"
                        />
                    </div>
                </>
            </div>

            <div className="mt-12">
                <h2 className="text-center text-lg">Main mistakes:</h2>
                <div className="flex flex-col gap-x-4 mt-[-1rem] mb-10">
                    <div className="mt-10 w-[max-content] mx-auto">
                        <div className="w-[10rem] h-[auto] mb-1">
                            <img src="/images/idBack.png" className="blur-[1px]" />
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
                            <img src="/images/idBack.png" className="object-cover" />
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
                            <img src="/images/idBack.png" className="opacity-50" />
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

        <label htmlFor="driver_license_back" className="rounded-full flex items-center w-[max-content] mx-auto p-3 px-[4rem] bg-leviplatte gap-x-3 text-xl text-white cursor-pointer">
            Start
            <img src="/images/camera.png" className="w-[1.5rem] h-[1.5rem]" />
        </label>
        {/* </Link> */}
        {formData.back &&  <button onClick={setNext} className="rounded-full flex items-center w-[max-content] mx-auto p-3 px-[4rem] bg-leviplatte gap-x-3 text-xl text-white cursor-pointer">Next</button>}               
    </div>
  )
}

export default Back