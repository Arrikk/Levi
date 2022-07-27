const Container = ({ children, title, className }) => {
  return (
    <div className={`mt-5 ${className}`}>
      <h2 className="mb-3 text-lg">{title}:</h2>
      {children}
    </div>
  )
}

const SubContainer = ({ title, text, subText, key }) => {
  return (
    <div key={key} className="mb-5">
      <h3 className="font-bold">{title}:</h3>
      <p className="text-sm">{text}</p>
      {subText ? <p className="text-sm">{subText}</p> : null}
    </div>
  )
}

const legalVersionData = [
  {
    title: 'Required data',
    text: 'Please note we use Ondato’s facial recognition identity verification services to authenticate you and your government identity document. In order to obtain the service from OnlyFans, by clicking “[I agree]” I agree that Ondato will receive and manage my personal data, including my biometric data, gained from remote identity verification of my personal identity by taking and/or filming live image of my face, my person’s identity or the document used to identify it and/or their image and the personal data contained in them and/or check in the population registry: image of my face, name, surname, nationality, gender, personal code, date of birth, numbers of the document that is being used, date of issue and validity, my signature and the transfer of such data to OnlyFans.',
    subText: '',
  },
  {
    title: 'Data processing',
    text: 'I am aware that Ondato is acting as a data processor on behalf of OnlyFans and my personal data, including my biometric data, will be processed by Ondato until the remote identity verification procedure is complete and the results will be transferred to OnlyFans. OnlyFans does not receive any facial biometric information generated from the images, and our third-party service providers are contractually limited to processing this information on our behalf and are required to destroy the images and any biometric information promptly in accordance with a data retention schedule and OnlyFans instructions as set forth in the “Retention of Personal Data” section above.',
    subText: '',
  },
  {
    title: 'Data handling',
    text: 'I am aware that I can submit request for information regarding my personal data by contacting at support@onlyfans.com.',
    subText:
      'I declare and confirm, that all the personal data I will provide for remote identity verification, is correct and accurate, and that any government documents which I will use for this purpose is authentic, valid and is provided to authenticate my identity.',
  },
]

const VerificationPage = () => {
  return (
    <section className="mt-0 h-[100%] py-10">
      <div className="shodow-[#eee] mx-auto w-[60%] rounded-lg border p-7 px-10 pt-[3rem] shadow-xl">
        <h1 className="text-xl">Consent for personal data processing</h1>

        <Container title="In simple words">
          <ul className="ml-5 flex list-outside list-disc flex-col gap-y-3 text-sm">
            <li>
              In order to use the services you need to perform an identity
              verification process, as part of this process biometric data of
              your face and personal data from your government identity document
              document will be captured through camera and processed to
              authenticate.
            </li>

            <li>
              UAB “Ondato” acts as a data processor and stores the personal data
              for no longer than it is obliged by the company who’s services you
              want to use.
            </li>

            <li>
              If you have any questions about how Ondato or OnlyFans please
              contact support@onlyfans.com or check OnlyFans Privacy Policy.
            </li>
          </ul>
        </Container>

        <Container title="Legal version" className="my-10">
          {legalVersionData?.map(({ title, text, subText }) => {
            return (
              <SubContainer
                title={title}
                text={text}
                subText={subText}
                key={title}
              />
            )
          })}
        </Container>

        <div className="mx-auto mt-12 flex w-[max-content] gap-x-4">
          <button className="rounded-lg border border-leviplatte p-2 px-4 hover:bg-leviplatte">
            Disagree
          </button>
          <button className="rounded-lg bg-leviplatte p-2 px-4">I agree</button>
        </div>
      </div>
    </section>
  )
}

export default VerificationPage
