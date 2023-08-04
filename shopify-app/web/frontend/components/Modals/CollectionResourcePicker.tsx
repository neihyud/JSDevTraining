import React, { useEffect } from 'react'
import { ResourcePicker } from '@shopify/app-bridge-react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../types'

const CollectionResourcePicker = ({ openModal, setOpenTypeModal }) => {
  const dispatch = useDispatch()

  const handleSelectionProduct = (selectionPayload) => {
    setOpenTypeModal('')
    dispatch({
      type: 'UPDATE_PRODUCT_COLLECTION',
      payload: selectionPayload.selection,
    })
  }

  const selected = useSelector(
    (state: RootState) => state.products.productCollection
  ).map((product) => {
    const id = product.id
    return { id }
  })
  return (
    <ResourcePicker
      resourceType="Collection"
      open={openModal == '3'}
      onSelection={handleSelectionProduct}
      initialSelectionIds={selected}
      onCancel={() => setOpenTypeModal('')}
    />
  )
}

export default CollectionResourcePicker
