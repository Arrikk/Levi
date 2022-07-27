import Link from "next/link"
import { useState } from "react"
import Back from "../../components/verification/idcard/Back"
import Front from "../../components/verification/idcard/Front"
import Form from "../../components/verification/idcard/Form"

const CardVerification = () => {
    const [idCard, setIdCard] = useState({
        front: true,
        back: false,
        form: false
    })

    const [formData, setFormData] = useState({
        front: null,
        back: null,
        form: null
    });


    return <>
        <div className="w-[100%]">
            {idCard.front && 
            <Front 
                setIdCard={setIdCard} 
                idCard={idCard} 
                setFormData={setFormData} 
                formData={formData} 
            />  || 
            idCard.back && 
            <Back  
                setIdCard={setIdCard} 
                idCard={idCard} 
                setFormData={setFormData} 
                formData={formData} 
            /> ||
            idCard.form && 
            <Form 
                setIdCard={setIdCard} 
                idCard={idCard} 
                setFormData={setFormData} 
                formData={formData} 
            />
            }
        </div>
    </>
}

export default CardVerification