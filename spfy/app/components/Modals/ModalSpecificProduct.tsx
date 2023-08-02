import {
  Button,
  Modal,
  LegacyStack,
  Box,
  TextField,
  Icon,
  Scrollable,
  LegacyCard,
  ResourceList,
  ResourceItem,
  Text,
  Thumbnail,
} from "@shopify/polaris";
import { SearchMajor } from "@shopify/polaris-icons";
import type { ResourceListProps } from "@shopify/polaris";

import { useState, useCallback } from "react";

// import styles from "./modalSpecificProduct.css";

const ModalSpecificProduct = ({ typeModal, openModal, isOpen }) => {
  /* type: 
  1: all product
  2: specific product
  3: product collection
  4: product tags  
  */
  // const [active, setActive] = useState(true);

  const toggleModal = useCallback(() => {
    // setActive((active) => !active);
    openModal((isOpen) => !isOpen);
  }, []);

  const activator = <Button onClick={toggleModal}>Open</Button>;

  const [textFieldValue, setTextFieldValue] = useState("");

  const handleTextFieldChange = useCallback(
    (value) => setTextFieldValue(value),
    []
  );

  return (
    <>
      <div style={{ height: "500px" }}>
        <Modal
          activator={activator}
          open={isOpen}
          onClose={toggleModal}
          title="SELECT SPECIFIC PRODUCTS"
          primaryAction={{
            content: "Select",
            onAction: toggleModal,
          }}
        >
          <Modal.Section>
            <LegacyStack vertical>
              <Box>
                <div>
                  <TextField
                    label=""
                    value={textFieldValue}
                    onChange={handleTextFieldChange}
                    prefix={<Icon source={SearchMajor} color="base" />}
                    autoComplete="off"
                    placeholder="Product Name"
                  />
                  <div>
                    <Scrollable>
                      <ResourceListProduct></ResourceListProduct>
                    </Scrollable>
                  </div>
                </div>
              </Box>
            </LegacyStack>
          </Modal.Section>
        </Modal>
      </div>
    </>
  );
};

const ResourceListProduct = () => {
  const [selectedItems, setSelectedItems] = useState<
    ResourceListProps["selectedItems"]
  >([]);

  const resourceName = {
    singular: "product",
    plural: "products",
  };

  const items = [
    {
      id: "101",
      url: "#",
      name: "Mae Jemison",
      location: "Decatur, USA",
    },
    {
      id: "201",
      url: "#",
      name: "Ellen Ochoa",
      location: "Los Angeles, USA",
    },
    {
      id: "101",
      url: "#",
      name: "Mae Jemison",
      location: "Decatur, USA",
    },
    {
      id: "201",
      url: "#",
      name: "Ellen Ochoa",
      location: "Los Angeles, USA",
    },
    {
      id: "101",
      url: "#",
      name: "Mae Jemison",
      location: "Decatur, USA",
    },
    {
      id: "201",
      url: "#",
      name: "Ellen Ochoa",
      location: "Los Angeles, USA",
    },
  ];

  return (
    <LegacyCard>
      <ResourceList
        resourceName={resourceName}
        items={items}
        renderItem={renderItem}
        selectedItems={selectedItems}
        onSelectionChange={setSelectedItems}
        selectable
      />
    </LegacyCard>
  );

  function renderItem(item: (typeof items)[number]) {
    const { id, url, name } = item;
    // const media = <Avatar customer size="medium" name={name} />;
    const media = (
      <Thumbnail
        source="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg"
        alt="Black choker necklace"
      />
    );

    return (
      <ResourceItem
        id={id}
        url={url}
        media={media}
        accessibilityLabel={`View details for ${name}`}
      >
        <div style={{ padding: "20px 0" }}>
          <Text variant="bodyMd" fontWeight="bold" as="h3">
            {name}
          </Text>
        </div>
      </ResourceItem>
    );
  }
};

export default ModalSpecificProduct;
