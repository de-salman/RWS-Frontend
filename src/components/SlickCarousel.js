import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ProductContext } from '../contexts/PoductContext';



export function Category() {


  const { category } = useContext(ProductContext)

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2.2,
    slidesToScroll: 2
  };
  return category.length ? (
    <Slider className="category-container container" {...settings}>
      {category.map(cat => {
        return (
          <Link to={{pathname:'/CatPage', catName:cat.categoryName}} key={cat._id} className="nav-link"><div>
            <div className="mask" style={{backgroundImage: `url(http://localhost:5000/category-image/${cat._id}.jpg)`}} >
              <h4 className="cat-name">{cat.categoryName}</h4>
            </div>
          </div></Link>
        )
      })}
    </Slider>
  ): (
      <div className="empty">There Is No Category</div>
  )
}