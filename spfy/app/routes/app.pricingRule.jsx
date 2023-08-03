import React, { useCallback, useState } from "react";
import {
  AppProvider as PolarisAppProvider,
  Page,
  Layout,
  TextField,
  FormLayout,
  LegacyCard,
  Select,
  DataTable,
  ChoiceList,
  Form,
} from "@shopify/polaris";

import ModalSpecificProduct from "~/components/Modals/ModalSpecificProduct";

import { Provider } from "react-redux";
import store from "~/store/index";

import ProductCollection from "~/components/AutoComplete/ProductCollection";
import ProductTags from "~/components/AutoComplete/ProductTags";
import SpecificProduct from "~/components/AutoComplete/SpecificProduct";

const PricingRulePage = () => {
  const [storeName, setStoreName] = useState("");

  const handleStoreName = useCallback((newValue) => setStoreName(newValue), []);

  const [priority, setPriority] = useState("0");

  const handlePriority = useCallback((newValue) => setPriority(newValue), []);

  const [selectedStatus, setSelectedStatus] = useState("enable");

  const handleChangeStatus = useCallback(
    (value) => setSelectedStatus(value),
    []
  );

  // Apply to Product
  const [isOpenSpecificModal, setIsOpenSpecificModal] = useState(false);

  const handleFocusSpecificProduct = () => {
    setIsOpenSpecificModal(true);
  };
  // =================

  const options = [
    { label: "Enable", value: "enable" },
    { label: "Disable", value: "disable" },
  ];

  // Table
  const rows = [
    ["t shirt", "all variant prices - 20%"],
    ["Gift Card", "all variant prices - 20%"],
    ["Stitch", "160.000"],
    ["Ayres Chambray", "all variant prices - 20%"], 
    ["Derby Tier Backpack", "all variant prices - 20%"],
    ["Chevron", "all variant prices - 20%"],
    ["% 5 Panel Camp cap", "all variant prices - 20%"],
  ];

  // Apply to Product

  const [selectedProduct, setSelectedProduct] = useState(["1"]);

  const handleSelectChangeProduct = useCallback(
    (value) => setSelectedProduct(value),
    []
  );

  // Custom Prices

  const [selectedPrice, setSelectedPrice] = useState(["1"]);

  const handleSelectChangePrice = useCallback(
    (value) => setSelectedPrice(value),
    []
  );

  const [amount, setAmount] = useState("0");

  const handleAmount = useCallback((newValue) => setAmount(newValue), []);

  // ================= Common ========================

  let additionalFieldProduct = null;

  switch (selectedProduct[0]) {
    case "2":
      additionalFieldProduct = (
        <SpecificProduct
          handleFocusSpecificProduct={handleFocusSpecificProduct}
        />
      );
      break;
    case "3":
      additionalFieldProduct = <ProductCollection />;
      break;
    case "4":
      additionalFieldProduct = <ProductTags />;
      break;
    default:
      additionalFieldProduct = <></>;
  }

  return (
    <Provider store={store}>
      <Page
        title="New Pricing Rule"
        backAction={{ content: "Products", url: "#" }}
      >
        <Layout>
          <Layout.Section>
            <LegacyCard title="General Information" sectioned>
              <Form
                onSubmit={() => {
                  console.log("submit");
                }}
              >
                <FormLayout>
                  <TextField
                    label="Name"
                    autoComplete="off"
                    value={storeName}
                    name="storeName"
                    onChange={handleStoreName}
                    requiredIndicator
                  />
                  <TextField
                    label="Priority"
                    autoComplete="off"
                    type="number"
                    value={priority}
                    name="priority"
                    onChange={handlePriority}
                    min={"0"}
                    max={"99"}
                  />
                  <Select
                    label="Status"
                    options={options}
                    onChange={handleChangeStatus}
                    value={selectedStatus}
                  />
                </FormLayout>
              </Form>
            </LegacyCard>
            <LegacyCard title="Apply to Products" sectioned>
              <Form onSubmit={() => console.log("submit")}>
                <FormLayout>
                  <ChoiceList
                    title=""
                    choices={[
                      { label: "All products", value: "1" },
                      { label: "Specific products", value: "2" },
                      {
                        label: "Product Collections",
                        value: "3",
                      },
                      { label: "Product Tags", value: "4" },
                    ]}
                    selected={selectedProduct}
                    onChange={handleSelectChangeProduct}
                  />

                  {additionalFieldProduct}
                </FormLayout>
              </Form>
            </LegacyCard>
            <LegacyCard title="Custom Prices" sectioned>
              <Form onSubmit={() => console.log("Test")}>
                <FormLayout>
                  <ChoiceList
                    title=""
                    choices={[
                      {
                        label: "Apply a price to selected products",
                        value: "1",
                      },
                      {
                        label:
                          "Decrease a fixed amount of the original prices of selected products",
                        value: "2",
                      },
                      {
                        label:
                          "Decrease the original prices of selected products by a percentage (%)",
                        value: "3",
                      },
                    ]}
                    selected={selectedPrice}
                    onChange={handleSelectChangePrice}
                  />

                  <TextField
                    label="Amount"
                    autoComplete="off"
                    value={amount}
                    onChange={handleAmount}
                  />
                </FormLayout>
              </Form>
            </LegacyCard>
          </Layout.Section>
          <Layout.Section secondary>
            <DataTable
              columnContentTypes={["text", "text"]}
              headings={["Title", "Modified Price"]}
              rows={rows}
            />
          </Layout.Section>
        </Layout>

        <ModalSpecificProduct
          openModal={setIsOpenSpecificModal}
          isOpen={isOpenSpecificModal}
        />
      </Page>
    </Provider>
  );
};

export default PricingRulePage;
