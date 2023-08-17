import Image from 'next/image'
import { useRef, useState } from 'react'

const SingleEvent = ({data}) => {
    const inputEmail = useRef();
    const [message, setMessage] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();
        const emailValue = inputEmail.current.value;
        const eventId = data?.id;

        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if(!emailValue.match(validRegex)) {
            setMessage('Please introduce a correct email address');
            return;
        }

        try {
            const response = await fetch('/api/email-registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: emailValue,
                    eventId
                })
            })

            const data = await response.json();
            setMessage(data.message);
            inputValue.current.value = '';
        } catch (error) {
            console.log('ERROR', error);
        }
    }
    return (
    <div className="event_single_page">
        <h1>{data.title}</h1>
            <Image src={data.image} alt={data.title} width="1000" height="500"/>
        <p>{data.description}</p>
        <form onSubmit={onSubmit} className='email_registration'>
            <label>Get Registered for this event!</label>
            <input ref={inputEmail} type="email" id="email" placeholder="Please insert your email here" />
            <button type="submit">Submit</button>
        </form>
        <p>{message}</p>
    </div>
    )
}
export default SingleEvent