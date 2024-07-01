
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import Form from "./PaymentForm"


const PUBLIC_KEY = "pk_test_51NgSA1CYVog714gFkpgjByCbRt47Rhy1LGturmK6VscQShq1niFPcIwsGSwgti3Dle9WUnjXmhk2lgZqll7qZVtM00G5oYtOLs"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripePayment( ) {
	return (
		<Elements stripe={stripeTestPromise}>
			<Form />
		</Elements>
	)
}
