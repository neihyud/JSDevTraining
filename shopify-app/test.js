const fetchProducts = async ({ query, endCursor, hasNextPage }) => {
  let subQuery = []

  if (endCursor) {
    subQuery.push(`endCursor=${endCursor}`)
  }

  if (hasNextPage) {
    subQuery.push(`hasNextPage=${hasNextPage}`)
  }

  if (query) {
    subQuery.push(`q=${query}`)
  }

  if (subQuery.length) {
  }
  
  subQuery = subQuery.join('&')

  const api = `/api/products/api/products?${subQuery} `
  console.log(api)
}


fetchProducts({query: '', endCursor: '', hasNextPage: ''})