import React, { useState } from 'react';
import '../Css/Style.css';

const Navbar = () => {
    const [Clicked, setClicked] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const IconClick = () => {
        setClicked(!Clicked);
        setSelectedCategory(null); // 메뉴 아이콘 클릭 시 선택된 카테고리 초기화
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(prevCategory => prevCategory === category ? null : category);
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
                                <div className="CategoryItem">-한식</div>
                                <div className="CategoryItem">-중식</div>
                                <div className="CategoryItem">-양식</div>
                            </div>
                        )}
                    </div>

                    <div className={`Category Cafe ${Clicked ? 'showText' : ''}`} onClick={() => handleCategoryClick('Cafe')}>
                        카페
                        {selectedCategory === 'Cafe' && (
                            <div className="SubCategories show">
                                <div className="CategoryItem">- 스타벅스</div>
                                <div className="CategoryItem">- 투썸플레이스</div>
                                <div className="CategoryItem">- 엔젤리너스</div>
                                <div className="CategoryItem">- 메가커피</div>
                                <div className="CategoryItem">- 이디야</div>
                            </div>
                        )}
                    </div>

                    <div className={`Category Hospital ${Clicked ? 'showText' : ''}`} onClick={() => handleCategoryClick('Hospital')}>
                        병원
                        {selectedCategory === 'Hospital' && (
                            <div className="SubCategories show">
                                <div className="CategoryItem">- 보건소</div>
                                <div className="CategoryItem">- 동물병원</div>
                                <div className="CategoryItem">- 대학병원</div>
                            </div>
                        )}
                    </div>

                    <div className={`Category Shopping ${Clicked ? 'showText' : ''}`} onClick={() => handleCategoryClick('Shopping')}>
                        쇼핑몰
                        {selectedCategory === 'Shopping' && (
                            <div className="SubCategories show">
                                <div className="CategoryItem">- 무신사</div>
                                <div className="CategoryItem">- 유니클로</div>
                                <div className="CategoryItem">- 스파오</div>
                            </div>
                        )}
                    </div>

                    <div className={`Category Store ${Clicked ? 'showText' : ''}`} onClick={() => handleCategoryClick('Store')}>
                        편의점
                        {selectedCategory === 'Store' && (
                            <div className="SubCategories show">
                                <div className="CategoryItem">- GS25</div>
                                <div className="CategoryItem">- SEVEN ELEVEN</div>
                                <div className="CategoryItem">- CU</div>
                            </div>
                        )}
                    </div>

                    <div className={`Category GasStation ${Clicked ? 'showText' : ''}`} onClick={() => handleCategoryClick('GasStation')}>
                        주유소
                        {selectedCategory === 'GasStation' && (
                            <div className="SubCategories show">
                                <div className="CategoryItem">- S-OIL</div>
                                <div className="CategoryItem">- 농협주유소</div>
                            </div>
                        )}
                    </div>

                    <div className={`Category BookMark ${Clicked ? 'showText' : ''}`} onClick={() => handleCategoryClick('BookMark')}>
                        즐겨찾기
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
