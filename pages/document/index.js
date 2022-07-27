import Link from "next/link"


const Card = ({ image, text, border, borderBottom, borderTop, link }) => {
    return <Link href={link}><div className={`border border-[#eee] grid grid-cols-2 items-center mx-auto w-[32rem] pl-2 shadow shadow-[#fff] rounded cursor-pointer ${border} ${borderBottom} ${borderTop
        } py-5 hover:bg-leviplatteDark`}>
        <div className="w-[auto] py-3 h-[9rem] flex items-center place-self-center">
            <img src={image} className="w-[auto] h-[100%] object-cover" />
        </div>
        <p className="text-xl">{text}</p>
    </div>
    </Link>
}

const cardDetails = [
    {
        image: "/images/passport.png",
        text: "Passport",
        id: 1,
        link: "/document/Passport"
    },
    {
        image: "/images/idCard.png",
        text: "Identity Card",
        id: 2,
        link: "/document/IDCard"
    },
    {
        image: "/images/Driving.png",
        text: "Driver license",
        id: 3,
        link: "/document/DriverLicense"
    }
]

const Document = () => {
    return <div className="w-[50%] min-h-screen pt-[5rem] mx-auto">
        <h1 className="text-3xl text-center mb-12">Choose a document and start verification</h1>

        <div className="mt-7">
            {cardDetails?.map(({ image, text, id, link }) => {
                return <Card image={image} text={text} border={id === 2 ? "rounded-none" : ""} borderBottom={id === 1 ? "rounded-b-none" : ""} borderTop={id === 3 ? "rounded-t-none" : ""} key={id} link={link} />
            })}
        </div>
    </div>
}

export default Document