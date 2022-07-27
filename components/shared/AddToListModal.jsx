import {
    PlusIcon,
    XIcon,
  } from '@heroicons/react/outline'
  import {useState, useEffect, useRef} from 'react'
  import axios from 'axios'
  import { toast } from 'react-toastify'

const AddToListModal = ({author, id, lists}) => {
    lists = lists.filter(list => list.slug == 'bookmark' || list.slug == 'close_friends' || list.isEditable)
    const [checked, setChecked] = useState()
    const addToList = async (e, listId) => {
        try{
            let res = await axios.post(`list/${listId}/action`, {userTo:author.userId})
            console.log(res.data)
        }catch(err){
            toast.error(err.response.data)
            console.log(err.response.data)
        }
    }

    return  <div className="modal" id={`list-modal-${id}`}>
    <div className="modal-box">
      <h3 className="text-lg font-bold">SAVE TO LIST</h3>
      {lists?.map((list, id) => (
      <div className="form-control border-t" key={id}>
        <label className="label flex cursor-pointer justify-start">
          <input
            type="checkbox"
            className="radio checked:bg-blue-500"
            defaultChecked= {list.inList}
            onChange = {(e) => addToList(e, list.id)}
          />
          <span className="label-text ml-4">{list.name}</span>
        </label>
      </div>
      ))}
      <div className="modal-action flex items-center justify-between">
        <a href="#" className="flex items-center text-lg text-leviplatte">
          {' '}
          <PlusIcon className="h-4 w-4" /> New List
        </a>{' '}
        <a href="#" className="flex items-center text-lg text-leviplatte">
          {' '}
          <XIcon className="h-4 w-4" /> Close
        </a>
      </div>
    </div>
  </div>
}

export default AddToListModal