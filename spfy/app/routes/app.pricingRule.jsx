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
  Card,
  ChoiceList,
  Form,
  Box,
  LegacyStack,
  Button,
} from "@shopify/polaris";
import ModalSpecificProduct from "~/components/Modals/ModalSpecificProduct";

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
    { label: "Disable", value: "disable" },
    { label: "Enable", value: "enble" },
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

  console.log("selectedProduct: ", selectedProduct[0]);
  switch (selectedProduct[0]) {
    case "2":
      additionalFieldProduct = (
        <TextField
          label=""
          placeholder="Search product"
          autoComplete="off"
          onFocus={handleFocusSpecificProduct}
        />
      );
      break;
    case "3":
      additionalFieldProduct = (
        <TextField
          label=""
          placeholder="Vintage, cotton, summer"
          autoComplete="off"
          onFocus={handleFocusSpecificProduct}
        />
      );
      break;
    default:
      additionalFieldProduct = <></>;
  }

  return (
    <Page>
      {/* <ui-title-bar title="New Pricing Rule"></ui-title-bar> */}
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
                {/* <Button submit>Submit</Button> */}
              </FormLayout>
            </Form>
          </LegacyCard>
          <LegacyCard title="Apply to Products" sectioned>
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
          </LegacyCard>
          <LegacyCard title="Custom Prices" sectioned>
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
      {/* </LegacyCard> */}
      {/* {isOpenSpecificModal && (
        <ModalSpecificProduct type={selectedProduct[0]} openModal={setIsOpenSpecificModal} isOpen={isOpenSpecificModal}/>
      )} */}
      <ModalSpecificProduct
        typeModal={selectedProduct[0]}
        openModal={setIsOpenSpecificModal}
        isOpen={isOpenSpecificModal}
      />
    </Page>
  );
};

export default PricingRulePage;
