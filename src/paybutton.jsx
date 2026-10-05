import { useNavigate } from 'react-router'

function PayButton() {
    const navigate = useNavigate()

    const handlePay = () => {
        navigate('/order-success')
    }

    return <button onClick={handlePay}>Pay Now</button>
}

export default PayButton