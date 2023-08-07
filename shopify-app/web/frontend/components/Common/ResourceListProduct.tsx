// @ts-nocheck
import {
  LegacyCard,
  ResourceList,
  ResourceItem,
  Text,
  Icon,
  Thumbnail,
} from '@shopify/polaris'
import { CancelMajor } from '@shopify/polaris-icons'

const ResourceListProduct = ({ products, onRemove }) => {
  return (
    <LegacyCard>
      <ResourceList
        resourceName={{ singular: 'customer', plural: 'customers' }}
        items={products}
        renderItem={(item) => {
          const { id, title, url } = item
          const media = (
            <Thumbnail source={`${url}`} alt="Black choker necklace" />
          )

          return (
            <ResourceItem
              id={id}
              url={''}
              media={media}
              accessibilityLabel={`View details for ${title}`}
            >
              <div style={{ padding: '20px 0' }}>
                <Text variant="bodyMd" fontWeight="bold" as="h3">
                  {title}
                </Text>
                <span
                  style={{
                    position: 'absolute',
                    top: 5,
                    right: 5,
                    padding: '5px',
                  }}
                  className="icon"
                  onClick={onRemove(id)}
                >
                  <Icon source={CancelMajor} color="base" />
                </span>
              </div>
            </ResourceItem>
          )
        }}
      />
    </LegacyCard>
  )
}

export default ResourceListProduct
