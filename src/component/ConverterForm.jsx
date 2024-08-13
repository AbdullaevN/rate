import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useEffect, useState } from 'react'
import SelectForm from './SelectForm';

const ConverterForm = () => {

    const [amount, setAmount] = useState(100)
    const [fromCurrency, setFromCurrency] = useState("USD")
    const [toCurrency, setToCurrency] = useState("INR")
    const [result, setResult] = useState("")
    const [isLoading, setIsLoading]= useState(false)


    const handleSwapCurrencies = () => {
        setFromCurrency(toCurrency)
        setToCurrency(fromCurrency)

    }

    const getExchangeRate = async () => {
        const API_KEY = import.meta.env.RATE_API_KEY;

        // const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}`
        const API_URL = `https://v6.exchangerate-api.com/v6/1e7cf64bfbea115cf5c534ee/pair/${fromCurrency}/${toCurrency}`
            setIsLoading(true)

        try {
            const res = await fetch(API_URL)
            // const res = await fetch(API_URL, { mode: 'no-cors' });

            if (!res.ok) throw Error("Something went wrong!")

            const data = await res.json()
            const rate = (data.conversion_rate * amount).toFixed()
            setResult(`${amount} ${fromCurrency} = ${rate} ${toCurrency}`)
            console.log(rate, 'rate')
        } catch (e) {
            setIsLoading(false)
        }
    }

    const handleFromSubmit = (e) => {
        e.preventDefault()
        getExchangeRate()
    }

    useEffect(() => getExchangeRate, [])

    return (
        <Form onSubmit={handleFromSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Введите сумму</Form.Label>
                <Form.Control type="text" placeholder="Enter amount" value={amount} onChange={e => setAmount(e.target.value)} />

            </Form.Group>
            <div className='wrapper'>
                <div  className='wrapper-select'>
                <Form.Label>From</Form.Label>

<SelectForm
    selectedCurrency={fromCurrency}
    handleCurrency={e => setFromCurrency(e.target.value)}
/>
                </div>
                <div onClick={handleSwapCurrencies}>
                    <svg width="16" viewBox="0 0 20 19" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M19.13 11.66H.22a.22.22 0 0 0-.22.22v1.62a.22.22 0 0 0 .22.22h16.45l-3.92 4.94a.22.22 0 0 0 .17.35h1.97c.13 0 .25-.06.33-.16l4.59-5.78a.9.9 0 0 0-.7-1.43zM19.78 5.29H3.34L7.26.35A.22.22 0 0 0 7.09 0H5.12a.22.22 0 0 0-.34.16L.19 5.94a.9.9 0 0 0 .68 1.4H19.78a.22.22 0 0 0 .22-.22V5.51a.22.22 0 0 0-.22-.22z"
                            fill="#fff"
                        />
                    </svg>
                </div>

                <div  className='wrapper-select'>

                <Form.Label>To</Form.Label>
                <SelectForm
                    selectedCurrency={toCurrency}
                    handleCurrency={e => setToCurrency(e.target.value)}
                    
                    
                    />
                    </div>
            </div>
            <Button variant="primary" type="submit" className={``}>
                Принять
            </Button>
            <h1>{   result }</h1>
        </Form>
    )
}

export default ConverterForm