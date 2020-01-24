import React, { useState } from 'react'
import PropTypes from 'prop-types'

import ProductCard from '../ProductCard'

import './Catalog.scss'

const Catalog = ({ data }) => {
  const [ selectedCards, setSelectedCards ] = useState([])
  
  const onClickHandler = (id) => {
    const index = selectedCards.findIndex(el => el === id)
    if (index === -1) {
      setSelectedCards([...selectedCards, id])
    } else {
      const head = selectedCards.slice(0, index)
      const tail = selectedCards.slice(index + 1)
      setSelectedCards([...head, ...tail])
    }
  }

  const renderCatalogItems = () => {
    const keys = Object.keys(data)

    return (
      keys.map(id => {
        const isSelected = selectedCards.includes(id);
        
        return (
          <li key={id} className="catalog__item">
            <ProductCard
              cardId={id}
              cardData={data[id]}
              selected={isSelected}
              onClick={onClickHandler}
            />
          </li>
        )
      })
    )
  }

  return (
    <ul className="catalog">
      {renderCatalogItems()}
    </ul>
  )
}

Catalog.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Catalog
