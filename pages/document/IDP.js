import { useState, useEffect } from "react"
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone'

const CardVerification = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data)
    };

    const [files, setFiles] = useState([]);

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': []
        },
        // value : files,
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });    

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, []);

    const defaultImage = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAIEAegMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAQUEBgcDAv/EADoQAAIBAgMCCggGAgMAAAAAAAABAgMRBAUhEjEGEzJBUWFxgZGhI0JSVJOxwdEUFRYi4fA0ggdDwv/EABgBAQEBAQEAAAAAAAAAAAAAAAABAgUE/8QAJBEBAAECBAYDAAAAAAAAAAAAAAEDUQIUFUEEBTGh0fAhYZH/2gAMAwEAAhEDEQA/AO4gEb2BIAAAhEgARcLrAkAhgSCESABDJQAAAAAAAAApeEWfU8npRjCKq4mpyIN6JdL6iOFWbSyvALiP8is9mD9lc7/vSc5fGV6spPbqVJXlJ8pvpbAs8VwkzbEybli5U17NJKK+/meEM5zOnLajj8RfrqN/MwBzgbRlvDPF0ZKGPpxxFP24LZmvo/I3HLsxwuZUOOwlVTjua3OL6GuY5Me+CxeIwNeOIwtWUKi0uuddD6UB10FPwbzuOc4ablBU69JpVIrc77muouAAAAAAARzkgAGABpP/ACDt8fgn6rhP5r+Cp4LUpTzF1VyacHftf9ZtHDzDcblEMQlrQqpvsenzaMDg/hPw2XwlJekrWnLs5vL5gZOIy7BYp3r4eEpe0lZ+KPBZLhIuyvOnz05qLj3aadxYgCnq8HMFKW1SdSnbmvtLz18zAzTIY4ajKvh6jcIK84SWtulfybOfNSCq0505bpRafeBW/wDH0XKtjavqxjCC8/sboa1wCoOnk86z/wC6q2uxJL53NlAhkoAARckiwEgEW6QJAAFdnqjVy+thpRuq0JRT6HbR+Nisw8dihSj7MIryLfMqcnRjJeq9SsAAAARJ7MW+hEkxaT1AzcgprD5ZQw6VuJgot9L5343LIxMug40dp+s7oywAuQ9dCQAAAAAAAAPOvHaozS54so2mt6sX9zAzKjurR7JAV4AasAFm928GbltHam6slpHRdoFjTjswiuhWPohO+4kAAAAAAEW1JAAhkgCEjwx8tnBV3e3o3bttoZBW5tVTp8St7V5AV9Ke3FS8T7buYsHKHJ3M++Ml7KA9ZyUYuT3ItMpm54KF3rd7XiUk3Ka18Cxyirxb4p7pbn1gW4AAhkgACL9RIAEXInJQi5SdkldlVVx1Wbew9hdW8C3PKpiKUOVUjfouU0pzny5Sl2s+QLGvj2tKMP8AaRX1JSqScpu7e9hu6I7QPPZGyYv5ph4Y78JiNqjKSvTlPk1Ox/czHVorWVWmv90B87J6QurbLaa3MwMRm2Gp4ulhaO1iK03rGlZ7K6W9xnxkt61Az6OYSj+2tHa61vMuniqNTdUS6noUrdwBf30uEyhjKUeTJx7HY96eMrw9faXRIC4B8Uasa1NTjufkfYGHmc7UFFetKxVmmVc/zerkMMfUzaHG74xdKCi3ezjuvdb/AB05zDlnmcptRzzL3bTVRWtn1PnVu9HpjhcU7vHPG4I2nt5b+DQPz3N9txlnuBts3Uo04u751ql094/PM5co7Od5fK7SekVbRvXTq80aymO/v4mewWnt5b+fLW09d3Qc/wAXn2dYag6qznAVmrfsoqMm79GnWYH6wzz3qHwY/YscFjnpMMzzClHxMS3rhRg3i8qm4U9qrRe3Gy1tz27vkaFaPMl4E1OF2d1KcoSxUdmSafoo7vAqvxldbp+SLkKl4TUqVpdM4J5d+EwP4irC1avqrrVQ5l9S6tZ3W7nX1OXUuFudUqUKcMVFRhFRj6KL0St0H1+sM896h8GP2GQqXg1KjaXUQcu/WGee9Q+DH7D9YZ571D4MfsMhV+jUqNpdRBzWjwpzmpBSlmmGpt3/AGzo6rwiekuEubxV1nWDetrKi/HkkyWO7WoU7S6tlc9Jw70Z9zjdLhTntL0kM3wKcoXs6d2ue3I3nl+veEfvkPgQ+wyVS8JPMKUbS1SP+U+49ebvAOvDgwlbn2P6CW7uJBpUS3v+9AAJsT1AAAAAAAAR/Af/AJANQm4+Suz6kgElX//Z"

    return <div className="sm:w-[60%] w-[100%] px-5 sm:px-0 min-h-[100vh] py-[5rem] mx-auto">
        <h1 className="text-3xl text-center mb-5">Take a selfie</h1>
        <p className="text-lg">Position your face in the middle of the frame and follow the instructions. Photo should not be blurry and evenly lit</p>

        <div className="flex sm:flex-row flex-col gap-x-4">
            <div className="mt-10 w-[max-content] mx-auto self-center">
                 <>
                    <div {...getRootProps({ className: 'dropzone disabled' })}>
                        <input {...getInputProps()} {...register('identity_card_front')} id="identity_card_front" />                       
                        <label>
                            <img src={files[0]?.preview || defaultImage} className="w-[18rem] sm:w-[25rem] max-h-[35rem] rounded-[50%]" onLoad={() => { URL.revokeObjectURL(files[0].preview) }} />
                        </label>
                    </div>
                </>
            </div>

            <div className="mt-12">
                <h2 className="text-center text-lg">Main mistakes:</h2>
                <div className="flex flex-col gap-x-4 mt-[-1rem] mb-10">
                    <div className="mt-10 w-[max-content] mx-auto">
                        <div className="w-[10rem] h-[auto] mb-1">
                            <img src={defaultImage} className="w-[inherit] blur-[1px]" />
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
                            <img src={defaultImage} className="w-[inherit] object-cover" />
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
                            <img src={defaultImage} />
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
        <button className="rounded-full flex items-center w-[max-content] mx-auto p-3 px-10 bg-leviplatte text-white gap-x-2 text-lg" onClick={handleSubmit(onSubmit)}>Start <img src="/images/camera.png" className="w-[1.3rem] h-[1.3rem] text-white" /></button>
    </div>
}

export default CardVerification