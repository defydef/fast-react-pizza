import { useState } from 'react'
import Button from '../../ui/Button'
import { useDispatch, useSelector } from 'react-redux'
import { updateName } from './userSlice'
import { useNavigate } from 'react-router-dom'

function CreateUser() {
    const [username, setUsername] = useState('')
    const user = useSelector((store) => store.user)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()
        if (!username) return
        dispatch(updateName(username))
        navigate('/menu')
    }

    return (
        <form onSubmit={handleSubmit}>
            {user.username ? (
                <p className="text-md mb-4 text-stone-600 md:text-lg">
                    👋 Welcome
                    <span className="font-bold"> {user.username}</span>
                </p>
            ) : (
                <p className="mb-4 text-sm text-stone-600 md:text-base">
                    👋 Welcome! Please start by telling us your name:
                </p>
            )}
            {!user.username && (
                <input
                    type="text"
                    placeholder="Your full name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="input mb-8 w-72"
                />
            )}

            {username !== '' && (
                <div>
                    <Button type="primary">Start ordering</Button>
                </div>
            )}
        </form>
    )
}

export default CreateUser
