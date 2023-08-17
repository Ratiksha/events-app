import Header from '../header/header'
import Footer from '../footer/footer'

const MainLayout = ({children}) => {
    return (
        <>
            <Header></Header>
            <main>{children}</main>
            <Footer></Footer>
        </>
    )
}

export default MainLayout