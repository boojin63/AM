import React, { useState } from 'react';
import '../Css/Style.css';

const Navbar = () => {
    const [isClicked, setIsClicked] = useState(false);

    const handleIconClick = () => {
        setIsClicked(!isClicked);
    };

    return (
        <div className='NavContainer'>
            <div className={`NavContent ${isClicked ? 'boxVisible' : ''}`}>
                <svg
                    width="40"
                    height="40"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`NavIcon ${isClicked ? 'rotated' : ''}`}
                    onClick={handleIconClick}
                    style={{
                        fill: isClicked ? 'white' : 'black',
                        transition: 'transform 0.3s ease, fill 0.3s ease'
                    }}
                >
                    <path fillRule="evenodd" clipRule="evenodd" d="M2.5 11.5C2.5 11.2239 2.72386 11 3 11H13C13.2761 11 13.5 11.2239 13.5 11.5C13.5 11.7761 13.2761 12 13 12H3C2.72386 12 2.5 11.7761 2.5 11.5Z" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M2.5 7.5C2.5 7.22386 2.72386 7 3 7H13C13.2761 7 13.5 7.22386 13.5 7.5C13.5 7.77614 13.2761 8 13 8H3C2.72386 8 2.5 7.77614 2.5 7.5Z" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M2.5 3.5C2.5 3.22386 2.72386 3 3 3H13C13.2761 3 13.5 3.22386 13.5 3.5C13.5 3.77614 13.2761 4 13 4H3C2.72386 4 2.5 3.77614 2.5 3.5Z" />
                </svg>
                <div className={`SlidingBox ${isClicked ? 'show' : ''}`}></div>
                <div className={`Restaurant ${isClicked ? 'showText' : ''}`}>식당</div>
                <div className={`Cafe ${isClicked ? 'showText' : ''}`}>카페</div>
                <div className={`Hospital ${isClicked ? 'showText' : ''}`}>병원</div>
                <div className={`Shopping ${isClicked ? 'showText' : ''}`}>쇼핑몰</div>
                <div className={`Store ${isClicked ? 'showText' : ''}`}>편의점</div>
                <div className={`GasStation ${isClicked ? 'showText' : ''}`}>주유소</div>
                <div className={`BookMark ${isClicked ? 'showText' : ''}`}>즐겨찾기</div>

            </div>
        </div>
    );
}

export default Navbar;
