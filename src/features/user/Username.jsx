import { useSelector } from 'react-redux'

function Username() {
    const user = useSelector((store) => store.user)
    return (
        <div className="hidden text-sm font-semibold md:block">
            {user.username || ''}
        </div>
    )
}

export default Username
