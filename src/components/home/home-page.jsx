
import Image from 'next/image'
import Link from 'next/link'

const HomePage = ({data}) => {
    return(<div className="home_body">
        {data?.map(event => (
          <Link  key={event.id} href={`/events/${event.id}`}>
            <div className="card">
                <div className="image">
                    <Image src={event.image} alt={event.title} width="450" height="300" />
                </div>
                <div className="content">
                    <h2>{event.title}</h2>
                    <p>{event.description}</p>
                </div>
            </div>
          </Link>))}
      </div>)
}

export default HomePage