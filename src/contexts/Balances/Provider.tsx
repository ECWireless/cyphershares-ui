import React, { useCallback, useEffect, useState } from 'react'
import BigNumber from 'utils/bignumber'
import { provider } from 'web3-core'

import Context from './Context'
import useWallet from 'hooks/useWallet'
import { getBalance, getEthBalance } from 'utils/index'
// import { getEarnedIndexTokenQuantity } from 'index-sdk/stake'
// import { getEarnedIndexTokenQuantity as getEarnedFarmTwoBalance } from 'index-sdk/farmTwo'
import {
  csTokenAddress,
  // indexTokenAddress,
  // daiTokenAddress,
  usdcTokenAddress,
  zrxTokenAddress,
  batTokenAddress,
  // uniswapEthDpiLpTokenAddress,
  // stakingRewardsAddress,
  // farmTwoAddress,
} from 'constants/ethContractAddresses'

const Provider: React.FC = ({ children }) => {
  const [ethBalance, setEthBalance] = useState<BigNumber>()
  const [indexBalance, setIndexBalance] = useState<BigNumber>()
  const [csBalance, setCSBalance] = useState<BigNumber>()
  const [daiBalance, setDaiBalance] = useState<BigNumber>()
  const [usdcBalance, setUsdcBalance] = useState<BigNumber>()
  const [zrxBalance, setZrxBalance] = useState<BigNumber>()
  const [batBalance, setBatBalance] = useState<BigNumber>()
  const [uniswapEthDpiLpBalance, setUniswapEthDpiLpBalance] = useState<
    BigNumber
  >()
  const [
    stakedUniswapEthDpiLpBalance,
    setStakedUniswapEthDpiLpBalance,
  ] = useState<BigNumber>()
  const [unharvestedIndexBalance, setUnharvestedIndexBalance] = useState<
    BigNumber
  >()
  const [stakedFarmTwoBalance, setStakedFarmTwoBalance] = useState<BigNumber>()
  const [unharvestedFarmTwoBalance, setUnharvestedFarmTwoBalance] = useState<
    BigNumber
  >()

  const {
    account,
    ethereum,
    status,
  }: {
    account: string | null | undefined
    ethereum: provider
    status: string
  } = useWallet()

  const fetchBalances = useCallback(
    async (userAddress: string, provider: provider) => {
      const balances = await Promise.all([
        getEthBalance(provider, userAddress),
        getBalance(provider, csTokenAddress as string, userAddress),
        getBalance(provider, usdcTokenAddress as string, userAddress),
        getBalance(provider, zrxTokenAddress as string, userAddress),
        getBalance(provider, batTokenAddress as string, userAddress),
        // getBalance(
        //   provider,
        //   uniswapEthDpiLpTokenAddress as string,
        //   userAddress
        // ),
        // getBalance(provider, stakingRewardsAddress as string, userAddress),
        // getEarnedIndexTokenQuantity(provider, userAddress),

        // getBalance(provider, farmTwoAddress as string, userAddress),
        // getEarnedFarmTwoBalance(provider, userAddress),
      ])

      setEthBalance(
        new BigNumber(balances[0]).dividedBy(new BigNumber(10).pow(18))
      )
      setCSBalance(
        new BigNumber(balances[1]).dividedBy(new BigNumber(10).pow(18))
      )
      setUsdcBalance(
        new BigNumber(balances[2]).dividedBy(new BigNumber(10).pow(6))
      )
      setZrxBalance(
        new BigNumber(balances[3]).dividedBy(new BigNumber(10).pow(18))
      )
      setBatBalance(
        new BigNumber(balances[4]).dividedBy(new BigNumber(10).pow(18))
      )
      // setUsdcBalance(
      //   new BigNumber(balances[4]).dividedBy(new BigNumber(10).pow(6))
      // )
      // setUniswapEthDpiLpBalance(
      //   new BigNumber(balances[5]).dividedBy(new BigNumber(10).pow(18))
      // )
      // setStakedUniswapEthDpiLpBalance(
      //   new BigNumber(balances[6]).dividedBy(new BigNumber(10).pow(18))
      // )
      // setUnharvestedIndexBalance(
      //   new BigNumber(balances[7]).dividedBy(new BigNumber(10).pow(18))
      // )
      // setStakedFarmTwoBalance(
      //   new BigNumber(balances[8]).dividedBy(new BigNumber(10).pow(18))
      // )
      // setUnharvestedFarmTwoBalance(
      //   new BigNumber(balances[9]).dividedBy(new BigNumber(10).pow(18))
      // )
    },
    [
      setEthBalance,
      // setIndexBalance,
      setCSBalance,
      setUsdcBalance,
      setZrxBalance,
      setBatBalance,
      // setUniswapEthDpiLpBalance,
      // setStakedUniswapEthDpiLpBalance,
      // setUnharvestedIndexBalance,
      // setStakedFarmTwoBalance,
      // setUnharvestedFarmTwoBalance,
    ]
  )

  useEffect(() => {
    if (status !== 'connected') {
      setEthBalance(new BigNumber(0))
      setIndexBalance(new BigNumber(0))
      setCSBalance(new BigNumber(0))
      setDaiBalance(new BigNumber(0))
      setUsdcBalance(new BigNumber(0))
      setZrxBalance(new BigNumber(0))
      setBatBalance(new BigNumber(0))
      setUniswapEthDpiLpBalance(new BigNumber(0))
      setStakedUniswapEthDpiLpBalance(new BigNumber(0))
      setUnharvestedIndexBalance(new BigNumber(0))
      setStakedFarmTwoBalance(new BigNumber(0))
      setUnharvestedFarmTwoBalance(new BigNumber(0))
    }
  }, [status])

  useEffect(() => {
    if (account && ethereum) {
      fetchBalances(account, ethereum)
      let refreshInterval = setInterval(
        () => fetchBalances(account, ethereum),
        10000
      )
      return () => clearInterval(refreshInterval)
    }
  }, [account, ethereum, fetchBalances])

  return (
    <Context.Provider
      value={{
        ethBalance,
        indexBalance,
        csBalance,
        daiBalance,
        usdcBalance,
        zrxBalance,
        batBalance,
        uniswapEthDpiLpBalance,

        stakedUniswapEthDpiLpBalance,
        unharvestedIndexBalance,

        stakedFarmTwoBalance,
        unharvestedFarmTwoBalance,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Provider
