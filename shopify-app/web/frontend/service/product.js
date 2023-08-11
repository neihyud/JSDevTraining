/**
 *
 * @param {object} params
 * @param {string} params.endCursor
 * @param {boolean} params.hasNextPage
 * @param {useAuthenticateFetch} params.fetch
 * @returns {object}
 */
export const fetchData = async (params) => {
  const { fetch, query, endCursor, hasNextPage, type = '' } = params

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

  let subHef = ''
  switch (type) {
    case 'collection':
      subHef = '/api/collections?'
      break
    default:
      subHef = '/api/products?'
  }

  const res = await fetch(`${subHef}${subQuery}`)

  const { data = {} } = await res.json()
  return { ...data, query }
}
