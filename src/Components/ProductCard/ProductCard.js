import React, { useState } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import './ProductCard.scss'

const ProductCard = ({ cardData, cardId, onClick, selected }) => {
  
  const { 
    name, subname, quantity, description,
    total, properties, image, image2x,
  } = cardData  
  
  const [ isMouseOver, setMouseOver ] = useState(false)
  
  const clickHandler = (id) => {
    if (!quantity) return    
    setMouseOver(true)
    return onClick(id)
  }

  const mouseLeaveHandler = () => {
    if (isMouseOver) setMouseOver(false)
  }
  
  const renderDescription = () => {    
    if (!quantity) {
      return `Печалька, ${subname} закончился.`
    }
    
    if (!selected) {
      return (
        <span>
          {'Чего сидишь? Порадуй котэ, '}
          <button
            type="button"
            onClick={() => clickHandler(cardId)}
            className="product-card__buy-link">
            купи.
          </button>
        </span>
      )
    }

    return description
  }

  const renderPropertyItems = () => {
    if (!properties) return
    return properties.split(',').map(el => (
      <li key={el}>{el}</li>
    ))
  }

  const renderImage = () => {
    if (!image) return
    const retinaImage2x = image2x ? `${image2x} 2x` : null
    return (
      <img
        src={image}
        alt={`${name} ${subname}`}
        className="product-card__image"
        srcSet={retinaImage2x}
      />
    
    )
  }

  const cardClasses = cn(
    'product-card',
    { 'product-card--disabled': !quantity },
    { 'product-card--selected': selected },
    { 'product-card--mouseover': isMouseOver },
  )

  return (
    <div className={cardClasses}>
      <div
        className="product-card__inner"
        onClick={() => clickHandler(cardId)}
        onMouseLeave={() => mouseLeaveHandler()}>
        <div className="product-card__content">
          <h2 className="product-card__name">{name}</h2>
          <h3 className="product-card__subname">{subname}</h3>
          <ul className="product-card__properties">
            {renderPropertyItems()}
          </ul>
          <div className="product-card__total">
            {total}<span>КГ</span>
          </div>
          {renderImage()}
        </div>
      </div>
      <p className="product-card__description">
        {renderDescription()}
      </p>
    </div>
  )
}

ProductCard.propTypes = {
  cardData: PropTypes.object.isRequired,
  cardId: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool,
}

ProductCard.defaultProps = {
  selected: false,
}

export default ProductCard
