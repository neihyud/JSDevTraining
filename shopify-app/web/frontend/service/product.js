/**
 *
 * @param {object} params
 * @param {string} params.endCursor
 * @param {boolean} params.hasNextPage
 * @param {useAuthenticateFetch} params.fetch
 * @returns {object}
 */
export const fetchProducts = async (params) => {
  const { fetch, query, endCursor, hasNextPage } = params

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

  subQuery = subQuery.join('&')

  const res = await fetch(`/api/products?${subQuery}`)

  const { data = {} } = await res.json()
  return { ...data, query }
}

