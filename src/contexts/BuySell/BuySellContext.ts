import { createContext } from 'react'
import { UniswapPriceData } from './types'
import BigNumber from 'utils/bignumber'

interface BuySellContextValues {
  buySellToken: 'csDEFI' | 'index'
  isFetchingOrderData: boolean
  isUserBuying: boolean
  activeField: 'currency' | 'set'
  selectedCurrency: any
  currencyQuantity: string | undefined
  tokenQuantity: string | undefined
  currencyOptions: any[]
  spendingTokenBalance: BigNumber
  uniswapData: UniswapPriceData | undefined
  onSetBuySellToken: (tokenId: 'index' | 'csDEFI') => void
  onToggleIsUserBuying: () => void
  onSetActiveField: (field: 'currency' | 'set') => void
  onSetSelectedCurrency: (selectedCurrency: any) => void
  onSetCurrencyQuantity: (event: any) => void
  onSetTokenQuantity: (event: any) => void
  onExecuteBuySell: () => void
}

const BuySellContext = createContext<BuySellContextValues>({
  buySellToken: 'csDEFI',
  isFetchingOrderData: false,
  isUserBuying: true,
  activeField: 'currency',
  selectedCurrency: undefined,
  currencyQuantity: undefined,
  tokenQuantity: undefined,
  currencyOptions: [],
  spendingTokenBalance: new BigNumber(0),
  uniswapData: undefined,
  onSetBuySellToken: () => {},
  onToggleIsUserBuying: () => {},
  onSetActiveField: () => {},
  onSetSelectedCurrency: () => {},
  onSetCurrencyQuantity: () => {},
  onSetTokenQuantity: () => {},
  onExecuteBuySell: () => {},
})

export default BuySellContext
