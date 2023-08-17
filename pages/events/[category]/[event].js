import SingleEvent from '../../../src/components/events/single-event'
const EventPage = ({data}) => {
    return (
    <SingleEvent data={data} />
    )
}
export default EventPage

export async function getStaticPaths() {
    const { allEvents } = await import('../../../data/data.json')
    const allPaths = allEvents?.map(event => {
        return {
            params: {
                category: event.city,
                event: event.id
            }
        }
    })
    return {
        paths: allPaths,
        fallback: false
    }
}

export async function getStaticProps(Context) {
    const { allEvents } = await import('../../../data/data.json')
    const eventName = Context.params.event
    const event = allEvents?.find(event => event.id === eventName)
    return {
        props: {
            data: event
        }
    }
}