// Test ID: IIDSAT

import { useFetcher, useLoaderData } from 'react-router-dom'
import { getOrder } from '../../services/apiRestaurant'
import {
    calcMinutesLeft,
    formatCurrency,
    formatDate,
} from '../../utilities/helpers'
import OrderItem from './OrderItem'
import { useEffect } from 'react'
import UpdateOrder from './UpdateOrder'

// const order = {
//   id: "ABCDEF",
//   customer: "Jonas",
//   phone: "123456789",
//   address: "Arroios, Lisbon , Portugal",
//   priority: true,
//   estimatedDelivery: "2027-04-25T10:00:00",
//   cart: [
//     {
//       pizzaId: 7,
//       name: "Napoli",
//       quantity: 3,
//       unitPrice: 16,
//       totalPrice: 48,
//     },
//     {
//       pizzaId: 5,
//       name: "Diavola",
//       quantity: 2,
//       unitPrice: 16,
//       totalPrice: 32,
//     },
//     {
//       pizzaId: 3,
//       name: "Romana",
//       quantity: 1,
//       unitPrice: 15,
//       totalPrice: 15,
//     },
//   ],
//   position: "-9.000,38.000",
//   orderPrice: 95,
//   priorityPrice: 19,
// };

function Order() {
    const order = useLoaderData()
    // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
    const {
        id,
        status,
        priority,
        priorityPrice,
        orderPrice,
        estimatedDelivery,
        cart,
    } = order
    const deliveryIn = calcMinutesLeft(estimatedDelivery)

    const fetcher = useFetcher()
    useEffect(
        function () {
            if (!fetcher.data && fetcher.state === 'idle') fetcher.load('/menu') // load data from loader function in /menu route
        },
        [fetcher]
    )
    const menu = fetcher.data
    const updatedCart = cart.map((item) => {
        return {
            name: item.name,
            pizzaId: item.pizzaId,
            quantity: item.quantity,
            totalPrice: item.totalPrice,
            unitPrice: item.unitPrice,
            ingredients: menu?.find((menuItem) => menuItem.id === item.pizzaId)
                ?.ingredients,
        }
    })

    const labelClass =
        'flex flex-col justify-between gap-2 sm:flex-row sm:items-center sm:gap-0'

    return (
        <div className="space-y-8 px-4 py-6">
            <div className={labelClass}>
                <h2 className="text-xl font-semibold">Order #{id} status</h2>

                <div className="space-x-2">
                    {priority && (
                        <span className="rounded-full bg-red-500 px-3 py-1 font-semibold uppercase tracking-wide text-red-50">
                            Priority
                        </span>
                    )}
                    <span className="rounded-full bg-green-500 px-3 py-1 font-semibold uppercase tracking-wide text-green-50">
                        {status} order
                    </span>
                </div>
            </div>

            <div className={`${labelClass} bg-stone-200 px-6 py-5`}>
                <p className="font-medium">
                    {deliveryIn >= 0
                        ? `Only ${calcMinutesLeft(
                              estimatedDelivery
                          )} minutes left 😃`
                        : 'Order should have arrived'}
                </p>
                <p className="text-xs text-stone-500">
                    (Estimated delivery: {formatDate(estimatedDelivery)})
                </p>
            </div>

            <ul className="divide-y divide-stone-200 border-b border-t">
                {updatedCart.map((pizza) => (
                    <OrderItem
                        key={pizza.pizzaId}
                        item={pizza}
                        isLoadingIngredients={fetcher.state === 'loading'}
                    />
                ))}
            </ul>

            <div className="space-y-2 bg-stone-200 px-6 py-5">
                <p className="text-sm font-medium text-stone-600">
                    Price pizza: {formatCurrency(orderPrice)}
                </p>
                {priority && (
                    <p className="text-sm font-medium text-stone-600">
                        Price priority: {formatCurrency(priorityPrice)}
                    </p>
                )}
                <p className="font-bold">
                    To pay on delivery:{' '}
                    {formatCurrency(orderPrice + priorityPrice)}
                </p>
            </div>
            {!priority && <UpdateOrder />}
        </div>
    )
}

// 1. Create loader function
export async function loader({ params }) {
    const order = await getOrder(params.orderId)
    return order
}

export default Order
