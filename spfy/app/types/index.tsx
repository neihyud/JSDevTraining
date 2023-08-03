export interface RootState {
  products: {
    specificProducts: [];
    productCollection: [];
    productTags: [];
    allProducts: Product[];
    allCollection: ProductCollection[];
  };
}

export interface Product {
  id: string;
  url: string;
  name: string;
  location: string;
}

export interface ProductCollection {
  id: string;
  name: string;
}
