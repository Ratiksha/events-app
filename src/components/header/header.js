import Link from 'next/link'
import Image from 'next/image'

const Header = () => {
    return(
      <header>
        <div>
          <div className="topNav">
            <Image alt="logo" src={'/images/logo_black.png'} width={50} height={50} />
            <nav>
              <ul>
                <li>
                  <Link href="/">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/events">
                    Events
                  </Link>
                </li>
                <li>
                  <Link href="/about-us">
                    About us
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <p className="title"> Sed ut perspiciatis unde omnis</p>
        </div>
    </header>
    )
}

export default Header