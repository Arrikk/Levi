const SuccessModal = () => {
  return (
    <>
      <input type="checkbox" id="SuccessModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">
            Congratulations random Interner user!
          </h3>
          <div className="mt-5 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-col-pri h-14 w-14"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="items-center text-center">
            <h2 className="text-4xl font-bold">SUCCESS</h2>
            <p className="py-6">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos,
              deserunt!
            </p>
            <div className="w-full">
              <button className="bg-col-pri hover:bg-col-pri btn w-full border-none">
                OK
              </button>
            </div>
          </div>
          <div className="modal-action">
            <label htmlFor="my-modal" className="btn">
              Yay!
            </label>
          </div>
        </div>
      </div>
    </>
  )
}

export default SuccessModal
