import { useEffect, useState } from 'react'

const useFetch = (url, token) => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancel = false
    const fetchData = async () => {
      if (cancel) return
      setLoading(true)

      try {
        const res = await fetch(url, {
          method: 'GET',
          Authorization: `Bearer  ${token}`,
        })
        const json = await res.json()

        if (cancel) return
        setData(json)
        setLoading(false)
      } catch (error) {
        setError(error)
        setLoading(false)
      }
    }

    fetchData()

    return () => {
      cancel = true
    }
  }, [url])

  return { loading, error, data }
}

export default useFetch
