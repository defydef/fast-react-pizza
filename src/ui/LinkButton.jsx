import { Link, useNavigate } from 'react-router-dom'

/* eslint-disable react/prop-types */
const className = 'text-sm text-blue-500 hover:text-blue-600  hover:underline'
function LinkButton({ children, to }) {
    const navigate = useNavigate()
    if (to === '-1')
        return (
            <button onClick={() => navigate(-1)} className={className}>
                {children}
            </button>
        )
    return (
        <Link to={to} className={className}>
            {children}
        </Link>
    )
}

export default LinkButton
