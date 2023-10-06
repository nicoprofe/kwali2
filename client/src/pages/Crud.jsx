import { collection, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase'

export default function Crud() {
    const navigate = useNavigate()
    const [ users, setUsers ] = useState([])
    const [ loading, setLoading ] = useState(false)

    useEffect(() => {
        setLoading(true)
        const unsub = onSnapshot(collection(db, 'crudusers'), (snapshot) => {
            let list = []
            snapshot.docs.forEach((doc) => {
                list.push({
                    id: doc.id,
                    ...doc.data()
                })
                setUsers(list)
                setLoading(false)
            }, (error) => { 
                console.log(error)
            })
        })
        return () => {
            unsub()
        }
    }, [])

  return (
    <div>
      <div className='flex items-center justify-center space-x-3 mt-6'>
            {users && users.map((item) => (
                
                        <div
                        key={item.id}
                        className='flex flex-col items-center p-4 justify-center border border-gray-300 
                        rounded space-y-2'>
                            <div 
                            className='flex flex-col items-center justify-center'>
                                <img 
                                className='h-36 rounded' 
                                src={item.img} alt="Image" />
                                <p className='font-medium text-sm text-gray-700'>{item.name}</p>
                                <p className='font-light text-xs text-gray-700'>{item.email}</p>
                            </div>

                            <div 
                            className='flex space-x-1'>
                            <button
                                onClick={() => navigate(`/update/${item.id}`)} 
                                className='bg-green-500 hover:bg-green-600 active:bg-green-800
                                 text-white text-xs font-semibold rounded px-3 py-2
                                 transtion duration-300 ease-in-out'>Update</button>
                                <button
                                onClick={() => navigate(`/update/${item.id}`)} 
                                className='bg-purple-500 hover:bg-purple-600 active:bg-purple-800
                                 text-white text-xs font-semibold rounded px-3 py-2
                                 transtion duration-300 ease-in-out'>View</button>
                            </div>
                        </div>
                
            ))}
      </div>
      <button onClick={() => navigate('/add')} className='bg-teal-400 px-4 py-2 rounded'>Add User</button>
    </div>
  )
}
