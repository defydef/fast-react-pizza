// import { useState } from "react";

import { Form, redirect, useActionData, useNavigation } from 'react-router-dom'
import { createOrder } from '../../services/apiRestaurant'
import Button from '../../ui/Button'
import { useSelector } from 'react-redux'
import { useState } from 'react'

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
        str
    )

const fakeCart = [
    {
        pizzaId: 12,
        name: 'Mediterranean',
        quantity: 2,
        unitPrice: 16,
        totalPrice: 32,
    },
    {
        pizzaId: 6,
        name: 'Vegetale',
        quantity: 1,
        unitPrice: 13,
        totalPrice: 13,
    },
    {
        pizzaId: 11,
        name: 'Spinach and Mushroom',
        quantity: 1,
        unitPrice: 15,
        totalPrice: 15,
    },
]

function CreateOrder() {
    const navigation = useNavigation()
    const isSubmitting = navigation.state === 'submitting'

    const formErrors = useActionData() // data returned from the action function connected to the component
    const username = useSelector((store) => store.user.username)
    const [name, setName] = useState(username || '')
    console.log(username)

    // const [withPriority, setWithPriority] = useState(false);
    const cart = fakeCart

    const formInputClass =
        'mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'

    return (
        <div className="px-4 py-6">
            <h2 className="mb-8 text-xl font-semibold">
                Ready to order? {`Let's`} go!
            </h2>

            <Form method="POST">
                <div className={formInputClass}>
                    <label className="sm:basis-40">First Name</label>
                    <div className="grow">
                        <input
                            type="text"
                            name="customer"
                            required
                            className="input"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </div>

                <div className={formInputClass}>
                    <label className="mb-auto sm:basis-40">Phone number</label>
                    <div className="grow">
                        <input
                            type="tel"
                            name="phone"
                            required
                            className="input"
                        />

                        {formErrors?.phone && (
                            <p className="mt-2 rounded-md bg-red-200 p-2 text-xs text-red-700">
                                {formErrors.phone}
                            </p>
                        )}
                    </div>
                </div>

                <div className={formInputClass}>
                    <label className="sm:basis-40">Address</label>
                    <div className="grow">
                        <input
                            type="text"
                            name="address"
                            required
                            className="input"
                        />
                    </div>
                </div>

                <div className="mb-12 flex gap-5">
                    <input
                        type="checkbox"
                        name="priority"
                        id="priority"
                        className="h-6 w-6 accent-yellow-500 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
                        // value={withPriority}
                        // onChange={(e) => setWithPriority(e.target.checked)}
                    />
                    <label htmlFor="priority" className="font-medium">
                        Want to yo give your order priority?
                    </label>
                </div>

                <div>
                    <input
                        type="hidden"
                        name="cart"
                        value={JSON.stringify(cart)}
                    />
                    <Button type="primary">
                        {isSubmitting ? 'Placing order...' : 'Order now'}
                    </Button>
                </div>
            </Form>
        </div>
    )
}

// 1. Create action function
export async function action({ request }) {
    const formData = await request.formData() // formData is provided by the browser
    const data = Object.fromEntries(formData)
    const order = {
        ...data,
        cart: JSON.parse(data.cart),
        priority: data.priority === 'on',
    }
    const errors = {}
    if (!isValidPhone(order.phone))
        errors.phone =
            'Please give us your correct phone number. We might need it to contact you.'

    if (Object.keys(errors).length > 0) return errors

    // If all data are okay, create new order and redirect to order details page
    const newOrder = await createOrder(order)
    return redirect(`/order/${newOrder.id}`)
}

// 2. Connect the action to the Route (in App.jsx)

export default CreateOrder
