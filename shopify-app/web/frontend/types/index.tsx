export interface RootState {
  products: {
    specificProducts: Product[]
    productCollection: ProductCollection[]
    productTags: []
    allProducts: Product[]
    allCollection: ProductCollection[]
  }
}

export interface Product {
  id: string
  url: string
  title: string
  location: string
  images: ImageProduct[]
}

export interface ProductCollection {
  id: string
  title: string
  image: Image
}

export interface Image {
  originalSrc: string
}

export interface ImageProduct {
  originalSrc: string
}

export interface IErrorForm {
  storeName: string
  priority: string
  empField2: boolean
  empField3: boolean
  empField4: boolean
  amount1: string
  amount2: string
  amount3: string
}
