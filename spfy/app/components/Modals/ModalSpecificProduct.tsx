import {
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

import { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "~/types";

const ModalSpecificProduct = ({ openModal, isOpen }) => {
  const dispatch = useDispatch();

  const [selectedItems, setSelectedItems] = useState<
    ResourceListProps["selectedItems"]
  >([]);

  const saveModal = () => {
    openModal((isOpen) => !isOpen);
    dispatch({
      type: "UPDATE_SPECIFIC_PRODUCT",
      payload: [...[selectedItems]],
    });
  };

  const closeModal = () => {
    openModal((isOpen) => !isOpen);
    setSelectedItems([]);
  };

  const [textFieldValue, setTextFieldValue] = useState("");

  const handleTextFieldChange = useCallback((value) => {
    setTextFieldValue(value);
  }, []);

  const specificProduct = useSelector(
    (state: RootState) => state.products.specificProducts
  );

  useEffect(() => {
    setSelectedItems(specificProduct);
  }, [specificProduct, isOpen]);

  return (
    <>
      <div style={{ height: "500px" }}>
        <Modal
          open={isOpen}
          onClose={closeModal}
          title="SELECT SPECIFIC PRODUCTS"
          primaryAction={{
            content: "Save",
            onAction: saveModal,
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
                      <ResourceListProduct
                        selectedItems={selectedItems}
                        setSelectedItems={setSelectedItems}
                        valueSearch={textFieldValue}
                      ></ResourceListProduct>
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

const ResourceListProduct = ({
  selectedItems,
  setSelectedItems,
  valueSearch,
}) => {
  const resourceName = {
    singular: "product",
    plural: "products",
  };

  const items = useSelector(
    (state: RootState) => state.products.allProducts
  ).filter((product) => {
    return product.name.toLowerCase().includes(valueSearch.toLowerCase());
  });

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
