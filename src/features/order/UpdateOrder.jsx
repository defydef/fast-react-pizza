/* eslint-disable react/prop-types */
import { useFetcher } from 'react-router-dom'
import Button from '../../ui/Button'
import { updateOrder } from '../../services/apiRestaurant'

function UpdateOrder() {
    const fetcher = useFetcher()
    return (
        <fetcher.Form method="PATCH" className="text-right">
            {/* update data without navigation */}
            <Button type="primary">Make priority</Button>
        </fetcher.Form>
    )
}

// 1. Create action function
export async function action({ params }) {
    const data = { priority: true }
    await updateOrder(params.orderId, data)
    return null
}

export default UpdateOrder
