import React, { useState, useEffect } from 'react';
import '../Css/Style.css';

const Navbar = ({ map }) => {
    const [Clicked, setClicked] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [markers, setMarkers] = useState([]); // 마커들을 관리하는 상태
    const [currentInfoWindow, setCurrentInfoWindow] = useState(null); // 현재 열려있는 정보창을 관리하는 상태
    const [currentLocation, setCurrentLocation] = useState(null); // 현재 위치를 저장하는 상태

    useEffect(() => {
        if (map) {
            displayCurrentLocation(); // map이 준비되었을 때 현재 위치를 표시
        }
    }, [map]);

    const IconClick = () => {
        setClicked(!Clicked);
        setSelectedCategory(null);
        clearMarkers(); // 네비게이션 아이콘을 클릭할 때도 마커들을 지웁니다.
    };

    const handleCategoryClick = (category, keyword) => {
        if (selectedCategory !== category) {
            clearMarkers(); // 다른 카테고리를 클릭할 때 기존 마커들과 정보창을 제거
        }
        setSelectedCategory(prevCategory => prevCategory === category ? null : category);
        if (keyword && map && currentLocation) {
            searchPlaces(keyword, currentLocation); // 현재 위치를 기준으로 장소를 검색
        }
    };

    const searchPlaces = (keyword, location) => {
        const ps = new window.kakao.maps.services.Places();

        const options = {
            location: new window.kakao.maps.LatLng(location.latitude, location.longitude),
            radius: 5000 // 5km 반경 내에서 검색
        };

        ps.keywordSearch(keyword, placesSearchCB, options);

        function placesSearchCB(data, status, pagination) {
            if (status === window.kakao.maps.services.Status.OK) {
                const newMarkers = [];

                data.forEach(place => {
                    const markerPosition = new window.kakao.maps.LatLng(place.y, place.x);
                    const marker = new window.kakao.maps.Marker({
                        position: markerPosition,
                        map: map
                    });

                    const geocoder = new window.kakao.maps.services.Geocoder();

                    // 도로명 주소를 가져오기 위한 좌표 -> 주소 변환
                    geocoder.coord2Address(markerPosition.getLng(), markerPosition.getLat(), (result, status) => {
                        if (status === window.kakao.maps.services.Status.OK) {
                            const roadAddress = result[0].road_address
                                ? result[0].road_address.address_name
                                : '도로명 주소 없음';

                            // 정보창에 표시될 내용
                            const content = `
                                <div style="padding:10px; white-space: pre-wrap;">
                                    <strong>${place.place_name}</strong><br/>
                                    <p>${roadAddress}</p>
                                    <button onclick="navigator.clipboard.writeText('${roadAddress}')" style="margin-top:5px; padding:5px 10px; background-color:#4CAF50; color:white; border:none; border-radius:3px; cursor:pointer;">
                                        주소 복사
                                    </button>
                                </div>`;

                            const infowindow = new window.kakao.maps.InfoWindow({
                                content: content,
                                removable: true
                            });

                            // 마커에 클릭 이벤트를 추가합니다.
                            window.kakao.maps.event.addListener(marker, 'click', function() {
                                // 기존의 열려있는 정보창이 있으면 닫습니다.
                                if (currentInfoWindow) {
                                    currentInfoWindow.close();
                                }

                                // 새로운 정보창을 열고 상태에 저장합니다.
                                infowindow.open(map, marker);
                                setCurrentInfoWindow(infowindow);
                            });

                            newMarkers.push(marker);
                        }
                    });
                });

                setMarkers(newMarkers); // 새 마커들을 상태에 저장
            }
        }
    };

    const clearMarkers = () => {
        // 기존 마커들을 지도에서 제거
        markers.forEach(marker => marker.setMap(null));
        setMarkers([]); // 상태 초기화

        // 현재 열려있는 정보창이 있으면 닫기
        if (currentInfoWindow) {
            currentInfoWindow.close();
        }
        setCurrentInfoWindow(null); // 상태 초기화
    };

    const displayCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                const location = { latitude: lat, longitude: lng };
                setCurrentLocation(location); // 현재 위치를 상태로 저장

                const currentLatLng = new window.kakao.maps.LatLng(lat, lng);

                if (map) {
                    // 현재 위치에 마커를 표시
                    const marker = new window.kakao.maps.Marker({
                        position: currentLatLng,
                        map: map,
                        title: '현재 위치'
                    });

                    // 현재 위치에 정보창을 표시
                    const infowindow = new window.kakao.maps.InfoWindow({
                        content: `<div style="padding:5px;font-size:12px;">현재 위치</div>`
                    });
                    infowindow.open(map, marker);

                    // 지도의 중심을 현재 위치로 이동
                    map.setCenter(currentLatLng);

                    // 새로운 마커와 정보창을 상태에 추가
                    setMarkers(prevMarkers => [...prevMarkers, marker]);
                    setCurrentInfoWindow(infowindow);
                }
            }, (error) => {
                console.error("현재 위치를 가져오는 데 실패했습니다.", error);
            });
        } else {
            console.error("이 브라우저에서는 Geolocation이 지원되지 않습니다.");
        }
    };

    return (
        <div className='NavContainer'>
            <div className={`NavContent ${Clicked ? 'boxVisible' : ''}`}>
                <svg
                    width="40"
                    height="40"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`NavIcon ${Clicked ? 'rotated' : ''}`}
                    onClick={IconClick}
                    style={{
                        fill: Clicked ? 'white' : 'black',
                        transition: 'transform 0.3s ease, fill 0.3s ease'
                    }}
                >
                    <path fillRule="evenodd" clipRule="evenodd" d="M2.5 11.5C2.5 11.2239 2.72386 11 3 11H13C13.2761 11 13.5 11.2239 13.5 11.5C13.5 11.7761 13.2761 12 13 12H3C2.72386 12 2.5 11.7761 2.5 11.5Z" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M2.5 7.5C2.5 7.22386 2.72386 7 3 7H13C13.2761 7 13.5 7.22386 13.5 7.5C13.5 7.77614 13.2761 8 13 8H3C2.72386 8 2.5 7.77614 2.5 7.5Z" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M2.5 3.5C2.5 3.22386 2.72386 3 3 3H13C13.2761 3 13.5 3.22386 13.5 3.5C13.5 3.77614 13.2761 4 13 4H3C2.72386 4 2.5 3.77614 2.5 3.5Z" />
                </svg>
                <div className={`SlidingBox ${Clicked ? 'show' : ''}`}>
                    <div className={`Category Restaurant ${Clicked ? 'showText' : ''}`} onClick={() => handleCategoryClick('Restaurant')}>
                        식당
                        {selectedCategory === 'Restaurant' && (
                            <div className="SubCategories show">
                                <div className="CategoryItem" onClick={() => handleCategoryClick('Korean', '한식')}>- 한식</div>
                                <div className="CategoryItem" onClick={() => handleCategoryClick('Chinese', '중식')}>- 중식</div>
                                <div className="CategoryItem" onClick={() => handleCategoryClick('Western', '양식')}>- 양식</div>
                            </div>
                        )}
                    </div>

                    <div className={`Category Cafe ${Clicked ? 'showText' : ''}`} onClick={() => handleCategoryClick('Cafe')}>
                        카페
                        {selectedCategory === 'Cafe' && (
                            <div className="SubCategories show">
                                <div className="CategoryItem" onClick={() => handleCategoryClick('Starbucks', '스타벅스')}>- 스타벅스</div>
                                <div className="CategoryItem" onClick={() => handleCategoryClick('Twosome', '투썸플레이스')}>- 투썸플레이스</div>
                                <div className="CategoryItem" onClick={() => handleCategoryClick('Angel', '엔젤리너스')}>- 엔젤리너스</div>
                                <div className="CategoryItem" onClick={() => handleCategoryClick('Mega', '메가커피')}>- 메가커피</div>
                                <div className="CategoryItem" onClick={() => handleCategoryClick('Ediya', '이디야')}>- 이디야</div>
                            </div>
                        )}
                    </div>

                    <div className={`Category Hospital ${Clicked ? 'showText' : ''}`} onClick={() => handleCategoryClick('Hospital')}>
                        병원
                        {selectedCategory === 'Hospital' && (
                            <div className="SubCategories show">
                                <div className="CategoryItem" onClick={() => handleCategoryClick('HealthCenter', '보건소')}>- 보건소</div>
                                <div className="CategoryItem" onClick={() => handleCategoryClick('Animal', '동물병원')}>- 동물병원</div>
                                <div className="CategoryItem" onClick={() => handleCategoryClick('University', '대학병원')}>- 대학병원</div>
                            </div>
                        )}
                    </div>

                    <div className={`Category Shopping ${Clicked ? 'showText' : ''}`} onClick={() => handleCategoryClick('Shopping')}>
                        쇼핑몰
                        {selectedCategory === 'Shopping' && (
                            <div className="SubCategories show">
                                <div className="CategoryItem" onClick={() => handleCategoryClick('Musinsa', '무신사')}>- 무신사</div>
                                <div className="CategoryItem" onClick={() => handleCategoryClick('Uniqlo', '유니클로')}>- 유니클로</div>
                                <div className="CategoryItem" onClick={() => handleCategoryClick('Spao', '스파오')}>- 스파오</div>
                            </div>
                        )}
                    </div>

                    <div className={`Category Store ${Clicked ? 'showText' : ''}`} onClick={() => handleCategoryClick('Store')}>
                        편의점
                        {selectedCategory === 'Store' && (
                            <div className="SubCategories show">
                                <div className="CategoryItem" onClick={() => handleCategoryClick('GS25', 'GS25')}>- GS25</div>
                                <div className="CategoryItem" onClick={() => handleCategoryClick('SevenEleven', '세븐일레븐')}>- 세븐일레븐</div>
                                <div className="CategoryItem" onClick={() => handleCategoryClick('CU', 'CU')}>- CU</div>
                            </div>
                        )}
                    </div>

                    <div className={`Category GasStation ${Clicked ? 'showText' : ''}`} onClick={() => handleCategoryClick('GasStation')}>
                        주유소
                        {selectedCategory === 'GasStation' && (
                            <div className="SubCategories show">
                                <div className="CategoryItem" onClick={() => handleCategoryClick('SOil', 'S-OIL')}>- S-OIL</div>
                                <div className="CategoryItem" onClick={() => handleCategoryClick('NHGS', '농협주유소')}>- 농협주유소</div>
                            </div>
                        )}
                    </div>

                    <div className={`Category BookMark ${Clicked ? 'showText' : ''}`} onClick={() => handleCategoryClick('BookMark')}>
                        즐겨찾기
                        {selectedCategory === 'BookMark' && (
                            <div className="SubCategories show">
                                <div className="CategoryItem" onClick={() => handleCategoryClick('Favorite1', '즐겨찾기1')}>- 즐겨찾기1</div>
                                <div className="CategoryItem" onClick={() => handleCategoryClick('Favorite2', '즐겨찾기2')}>- 즐겨찾기2</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
