import { useLoaderData } from 'react-router-dom'
import { getMenu } from '../../services/apiRestaurant'
import MenuItem from './MenuItem'

function Menu() {
    const menu = useLoaderData()
    // get data from loader function, after the data has been fetched
    // React knows which data should be loaded based on the specified value in loader props
    // by doing this, React fetch the data and render the component at the same time
    // if using the useEffect hook, React will render the component first before fetching the data
    // this is using the render-as-you-fetch
    // if using the useEffect , we're using the fetch as you render

    return (
        <ul className="divide-y divide-stone-200 px-2">
            {menu.map((pizza) => (
                <MenuItem key={pizza.id} pizza={pizza} />
            ))}
        </ul>
    )
}

// 1. Create loader function
export async function loader() {
    const menu = await getMenu()
    return menu
}

// 2. Connect loader function to the route:
// import loader as menuLoader in App.jsx
// specify menuLoader inside createBrowserRouter

export default Menu
