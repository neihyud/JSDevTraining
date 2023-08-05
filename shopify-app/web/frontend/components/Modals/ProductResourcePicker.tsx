import React, { useEffect } from 'react'
import { ResourcePicker } from '@shopify/app-bridge-react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../types'

const ProductResourcePicker = ({ openModal, setOpenTypeModal }) => {
  const dispatch = useDispatch()

  const handleSelectionProduct = (selectionPayload) => {
    setOpenTypeModal('')
    dispatch({
      type: 'UPDATE_SPECIFIC_PRODUCT',
      payload: selectionPayload.selection,
    })
  }

  const selected = useSelector(
    (state: RootState) => state.products.specificProducts
  ).map((product) => {
    const id = product.id
    return { id }
  })

  return (
    <ResourcePicker
      resourceType="Product"
      open={openModal == '2'}
      onSelection={handleSelectionProduct}
      initialSelectionIds={selected}
      onCancel={() => setOpenTypeModal('')}
    />
  )
}

export default ProductResourcePicker
