import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import '../Css/Style.css';

const Main = () => {
    const [map, setMap] = useState(null);

    useEffect(() => {
        const mapContainer = document.getElementById('map'); 
        const mapOption = { 
            center: new window.kakao.maps.LatLng(37.5665, 126.9780), 
            level: 3 
        };

        const mapInstance = new window.kakao.maps.Map(mapContainer, mapOption);
        setMap(mapInstance); // map 객체를 상태로 저장

    }, []);

    return (
        <div>
            <Sidebar />
            <Navbar map={map} /> {/* map 객체를 Navbar에 전달 */}
            <div className='MainContainer'>
                <div
                    id="map"
                    style={{
                        width: '100%',
                        height: '100vh'
                    }}
                ></div>
            </div>
        </div>
    );
}

export default Main;
