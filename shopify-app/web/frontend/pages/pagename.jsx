import { Page } from '@shopify/polaris'

import React from 'react'
import { Provider, ResourcePicker } from '@shopify/app-bridge-react'

export default function PageName() {
    const handleSelection = (selectionPayload) => {
        console.log('selection: ', selectionPayload)
    }
    return (
        <Page>
            <ResourcePicker
                resourceType="Product"
                open={true}
                onSelection={handleSelection}
                initialSelectionIds={[
                    { id: 'gid://shopify/Product/8434853871914' },
                ]}
                
            />
        </Page>
    )
}
