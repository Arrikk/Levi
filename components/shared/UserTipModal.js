import { InputBox } from "../index"
import { BadgeCheckIcon } from '@heroicons/react/outline'
import SuccessModal from "./SuccessModal"
import {useState, useRef} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const UserTipModal = ({user}) => {
    const [formData, setFormData] = useState({})
    const cancelButton = useRef()
  
    const handleChange = (e) => {
      setFormData({...formData, [e.target.name]: e.target.value})
    }

    const sendTip = async (e) => {
        const {amount} = formData;
        if(amount && amount.length > 0 && amount >= 5){
          e.target.disabled = true
          try{
            // formData.feed = feedItem.id
            // let res = await axios.post('feed/tip', formData)
            // let data = res.data
            e.target.disabled = false
            cancelButton.current.click()
            toast.success('Feed Tipped with +$'+amount)
            // setFeedItem({...feedItem, tipAmountActual: (+feedItem.tipAmountActual + +amount)})
          }catch(err){
            e.target.disabled = false
            // toast.error(err.response.data.error)
          }
        }
      }

  return (
    <>
      <input type="checkbox" id={`tip-modal-${user?.userId}`} className="modal-toggle" />
      <div className="modal" id=''>
        <div className="modal-box">
          <h3 className="text-lg font-bold">SEND TIP</h3>
          <div className="flex my-4">
            <img
              src={`${user?.avatar
                ? user?.avatar
                : 'https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png'
                }`}
              alt="user"
              className="h-12 w-12 rounded-full object-cover"
            />
            <div className="ml-2 flex flex-col">
              <span className="flex items-center font-bold capitalize">
                {user?.name}
                <BadgeCheckIcon className="ml-1 inline-flex h-5 w-5" />
              </span>
              <span className="lowercase">
                @{user?.username}
              </span>
            </div>
          </div>
          <div>
            <InputBox label="Tip Amount" type="number" placeholder="$5 Minimum" name="amount" onChange={handleChange} />
            <InputBox label="Message" type="text" placeholder="Message (optional)" name="description" onChange={handleChange} />

          </div>
          <div className="modal-action">
            <label htmlFor={`tip-modal-${user.userId}`} ref={cancelButton} className="btn btn-outline">
              Cancel
            </label>
            <button type="button" className="btn bg-leviplatte border-none modal-button" onClick={sendTip}> Send Tip </button>
            <SuccessModal />
          </div>
        </div>
      </div>
    </>
  )
}

export default UserTipModal