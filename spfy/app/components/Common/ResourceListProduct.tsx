import {
  LegacyCard,
  ResourceList,
  ResourceItem,
  Text,
  Icon,
  Thumbnail,
} from "@shopify/polaris";
import { CancelMajor } from "@shopify/polaris-icons";


import indexStyles from "./ResourceListProduct.css";

export const links = () => [{ rel: "stylesheet", href: indexStyles }];

const ResourceListProduct = ({ products, onRemove }) => {
  return (
    <LegacyCard>
      <ResourceList
        resourceName={{ singular: "customer", plural: "customers" }}
        items={products}
        renderItem={(item) => {
          const { id, name } = item;
          const media = (
            <Thumbnail
              source="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg"
              alt="Black choker necklace"
            />
          );

          return (
            <ResourceItem
              id={id}
              url={""}
              media={media}
              accessibilityLabel={`View details for ${name}`}
            >
              <div style={{ padding: "20px 0" }}>
                <Text variant="bodyMd" fontWeight="bold" as="h3">
                  {name}
                </Text>
                <span
                  style={{
                    position: "absolute",
                    top: 5,
                    right: 5,
                    padding: "5px",
                  }}
                  className="icon"
                  onClick={onRemove(id)}
                >
                  <Icon source={CancelMajor} color="base" />
                </span>
              </div>
            </ResourceItem>
          );
        }}
      />
    </LegacyCard>
  );
};

export default ResourceListProduct;
