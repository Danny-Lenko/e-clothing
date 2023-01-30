import './category.styles.scss'

const Category = ({ title, img }) => {
   return (
      <div className='category-container'>
         <div
            className='background-image'
            style={{
               backgroundImage: `url(${img})`
            }}
         ></div>
         <div className='category-body-container'>
            <h2>{title}</h2>
            <p>Shop Now</p>
         </div>
      </div>
   );
}

export default Category;