import {
  Autocomplete,
  LegacyStack,
  LegacyCard,
  ResourceList,
  ResourceItem,
  Text,
  Icon,
  Thumbnail,
} from "@shopify/polaris";
import React, { useState, useCallback } from "react";

import { CancelMajor } from "@shopify/polaris-icons";

const ProductCollection = () => {
  const paginationInterval = 25;

  const deselectedOptions = Array.from(Array(100)).map((_, index) => ({
    value: `rustic ${index + 1}`,
    label: `Rustic ${index + 1}`,
  }));

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState(deselectedOptions);
  const [isLoading, setIsLoading] = useState(false);
  const [willLoadMoreResults, setWillLoadMoreResults] = useState(true);
  const [visibleOptionIndex, setVisibleOptionIndex] =
    useState(paginationInterval);

  const removeTag = useCallback(
    (tag: string) => () => {
      const options = [...selectedOptions];
      options.splice(options.indexOf(tag), 1);
      console.log("REmove True");
      setSelectedOptions(options);
    },
    [selectedOptions]
  );

  const handleLoadMoreResults = useCallback(() => {
    if (willLoadMoreResults) {
      setIsLoading(true);

      setTimeout(() => {
        const remainingOptionCount = options.length - visibleOptionIndex;
        const nextVisibleOptionIndex =
          remainingOptionCount >= paginationInterval
            ? visibleOptionIndex + paginationInterval
            : visibleOptionIndex + remainingOptionCount;

        setIsLoading(false);
        setVisibleOptionIndex(nextVisibleOptionIndex);

        if (remainingOptionCount <= paginationInterval) {
          setWillLoadMoreResults(false);
        }
      }, 1000);
    }
  }, [willLoadMoreResults, visibleOptionIndex, options.length]);

  const updateText = useCallback(
    (value: string) => {
      setInputValue(value);

      if (value === "") {
        setOptions(deselectedOptions);
        return;
      }

      const filterRegex = new RegExp(value, "i");
      const resultOptions = deselectedOptions.filter((option) =>
        option.label.match(filterRegex)
      );

      setOptions(resultOptions);
      //   setInputValue;
    },
    [deselectedOptions]
  );

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label="Tags"
      value={inputValue}
      placeholder="Vintage, cotton, summer"
      autoComplete="off"
    />
  );

  const hasSelectedOptions = selectedOptions.length > 0;

  const tagsMarkup = hasSelectedOptions
    ? selectedOptions.map((option, index) => {
        return (
          <ProductCollectionsCard
            key={index}
            option={option}
            removeTag={removeTag}
          />
        );
      })
    : null;
  const optionList = options.slice(0, visibleOptionIndex);
  const selectedTagMarkup = hasSelectedOptions ? (
    <LegacyCard>{tagsMarkup}</LegacyCard>
  ) : null;

  return (
    <LegacyStack vertical>
      <Autocomplete
        allowMultiple
        options={optionList}
        selected={selectedOptions}
        textField={textField}
        onSelect={setSelectedOptions}
        listTitle="SUGGESTED COLLECTIONS"
        loading={isLoading}
        onLoadMoreResults={handleLoadMoreResults}
        willLoadMoreResults={willLoadMoreResults}
      />
      <div style={{ width: "100%" }}>{selectedTagMarkup}</div>
    </LegacyStack>
  );
};

const ProductCollectionsCard = ({ option, removeTag }) => {
  return (
    <LegacyCard>
      <ResourceList
        resourceName={{ singular: "customer", plural: "customers" }}
        items={[
          {
            id: "109",
            url: "",
            name: "Mae Jemison",
            location: "Decatur, USA",
            latestOrderUrl: "#",
          },
        ]}
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
              <div style={{ padding: "10px 0" }}>
                <Text variant="bodyMd" fontWeight="bold" as="h3">
                  {name}
                </Text>
                <span
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    padding: "10px",
                    backgroundColor: "red",
                  }}
                  onClick={removeTag(option)}
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

export default ProductCollection;
