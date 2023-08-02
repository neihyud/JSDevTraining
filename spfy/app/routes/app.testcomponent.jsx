import { Page } from "@shopify/polaris";
import React from "react";
import Test from "../page/Test";
import Test2 from "../page/Test2";

const TestComponent = () => {
  return (
    <Page>
      <Test></Test>
      <Test2></Test2>
    </Page>
  );
};

export default TestComponent;
