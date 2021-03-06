import { camelCase } from 'lodash'

const baseURL = process.env.REACT_APP_TOKENSETS_API

export const fetchTokenBuySellData = (
  id: string,
  isBuyOrder: boolean,
  requestQuantity: number | string,
  currencyId: string,
  activeField: 'set' | 'currency'
) => {
  const buyOrSellRoute = isBuyOrder ? 'buy_price' : 'sell_price'
  // const coinOrSetRoute = id.toLowerCase() === 'index' ? 'coins' : 'portfolios'
  // const requestUrl = `${baseURL}/v2/${coinOrSetRoute}/${id}/${buyOrSellRoute}?quantity=${requestQuantity}&currency=${currencyId}&input_type=${activeField}`
  const requestUrl = `https://cyphershares-api.herokuapp.com/api/${buyOrSellRoute}/${requestQuantity}/${currencyId}/${activeField}`
  // const requestUrl = `http://localhost:3001/api/${buyOrSellRoute}/${requestQuantity}/${currencyId}/${activeField}`

  return fetch(requestUrl)
    .then((response) => {
      if (response.status === 400) {
        return console.error('Input must be non-zero.')
      } else {
        return response.json()
      }
    })
    .then((json) => {
      return json.buy_price || json.sell_price || {}
    })
    .catch((error) => console.log(error))
}

export const fetchSetComponents = (set: string) => {
  const requestUrl = `${baseURL}/v2/portfolios/${set}`

  return fetch(requestUrl)
    .then((response) => response.json())
    .then((response) => {
      if (!response?.portfolio?.components) {
        // undocumented API endpoint. Throw error if not expected response format
        throw new Error('Invalid API response from Set Protocol service')
      }
      const {
        portfolio: { components },
      } = response
      const formattedComponents = components.map((component: any) => {
        const camelCasedComponent = Object.keys(component).reduce(
          (comp: any, k: string) => ({
            ...comp,
            [camelCase(k)]: component[k],
          }),
          {}
        )
        return camelCasedComponent
      })

      return formattedComponents
    })
    .catch((error) => console.log(error))
}
