import { DataTable, Layout, Spinner } from '@shopify/polaris'
import React, { memo, useEffect, useState } from 'react'

const TablePrice = ({ rows, isLoading }) => {
  return (
    <div style={{ maxHeight: '700px', overflow: 'auto' }}>
      <Layout.Section secondary>
        <DataTable
          columnContentTypes={['text', 'text', 'text']}
          headings={[<b>Product</b>, <b>Old Price</b>, <b>New Price</b>]}
          rows={rows}
          // stickyHeader
        />
        {isLoading && (
          <div
            style={{
              position: 'relative',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              marginTop: '50px',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Spinner size="large" />
          </div>
        )}
      </Layout.Section> 
    </div>
  )
}

export default memo(TablePrice)
