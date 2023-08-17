import CategoryEvents from '../../../src/components/events/category-page';
const CategoryPage = ({data, categoryName}) => {
    return (<CategoryEvents data={data} categoryName={categoryName} />)
}
export default CategoryPage

export async function getStaticPaths() {
    const { events_categories } = await import('../../../data/data.json')
    const allPaths = events_categories?.map(category => {
        return {
            params: {
                category: category.id
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
    const categoryName = Context?.params?.category
    const categoryEvents = allEvents?.filter(events => events.city === categoryName)
    return {
        props: {
            data: categoryEvents,
            categoryName
        }
    }
}
