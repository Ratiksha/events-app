import Image from 'next/image'
import Link from 'next/link'
const CategoryEvents = ({data, categoryName}) => {
    return (<div className="cat_events">
            <h1>Events in {categoryName}</h1>
            <div className="content">
                {data?.map(event => (
                    <Link href={`/events/${event.city}/${event.id}`} key={event.id} className="card">
                        <Image src={event.image} alt={event.title} width="350" height="350"/>
                        <h2>{event.title}</h2>
                        <p>{event.description}</p>
                    </Link>
                ))}
        </div>
        </div>)
}
export default CategoryEvents