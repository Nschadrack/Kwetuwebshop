import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel'



function SlidingDiv(props) {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    const adverts = props.adverts.filter(advert => advert.published === true)
    return (
        <div className="images-sliding-main">
            {adverts === undefined || adverts.length ===0 ?
                <React.Fragment>
                    <p className="sliding-p">welcome to Kwetu Trade with ethics solely stands on a foundation of serving the best products worldwide. 
                        Rwanda grows the highest quality of coffee and we want to share it to the world using our platform. 
                        We work with the best and a reputable Rwandan coffee producers to make sure our clients receives the highest quality. 
                        We work with no limit to products; we have other products besides coffee in other categories.
                        <span style={{fontWeight: "bold", fontStyle: "italic"}}>We promise our clients exceptional services</span></p>
                </React.Fragment>
            :
            <React.Fragment>
              <Carousel activeIndex={index} onSelect={handleSelect}>
                  {adverts.map(advert =>
                    <Carousel.Item key={advert.advert_number}>
                        <img src={"http://50.116.29.247" + advert.image} alt="advert"/>
                        <Carousel.Caption className="carousel-caption-main">
                            <h4>{advert.caption}</h4>
                        </Carousel.Caption>
                    </Carousel.Item>
                    )}
                </Carousel>  
            </React.Fragment>
            }
        </div>
    );
}

export default SlidingDiv;


