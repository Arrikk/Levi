import { useState } from 'react'
import axios from 'axios'
import UserList from './UserList'

const UserContainer = ({ data, listData }) => {
  const [user, setUser] = useState(data)
  const [block, setBlock] = useState('')

  const Restrict = () => {
    const data = {
      userTo: user.userId,
    }
    setUser({ ...user, isRestricted: !user.isRestricted })
    axios
    .post(`list/restrict/action`, data)
    .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err.response.data)
      })
  }
  const Block = () => {
    const data = {
      userTo: user.userId,
    }
    axios
    .post(`list/blocked/action`, data)
    .then((res) => {
        setUser({ ...user, isBlocked: !user.isBlocked, canBlock: !user.canBlock })
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err.response)
      })
  }

  const handleBlock = () => {
    if (block == 'restrict') {
      Restrict()
    } else {
      Block()
    }
  }

  const changeRadio = (e) => {
    setBlock(e.target.value)
    console.log(e.target.value)
  }

  return (
    <>
      {!user.isBlocked && (
        <UserList
          changeRadio={changeRadio}
          handleBlock={handleBlock}
          Block={Block}
          Restrict={Restrict}
          user={user}
        />
      )}
      {user.isBlocked && listData.name == 'Blocked' && (
        <UserList
          changeRadio={changeRadio}
          handleBlock={handleBlock}
          Block={Block}
          Restrict={Restrict}
          user={user}
        />
      )}
    </>
  )
}

export default UserContainer
