import Sidebar from './Sidebar'
import Navbar from './Navbar'

import '../Css/Style.css'

const Main = () => {
    return(
        <div>
            <Sidebar/>
            <Navbar/>
            <div className='MainContainer'></div>
        </div>
    );
}

export default Main;