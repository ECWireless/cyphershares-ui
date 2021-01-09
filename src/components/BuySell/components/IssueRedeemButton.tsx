import React from 'react'
import styled, { css } from 'styled-components'

// Hooks
import useApproval from 'hooks/useApproval'
import useBalances from 'hooks/useBalances'
import useWallet from 'hooks/useWallet'

import { RoundedButton } from 'components/RoundedButton'
import { issue, redeem } from 'utils'
import BigNumber from 'utils/bignumber'
import {
  usdcTokenAddress,
  zrxTokenAddress,
  batTokenAddress,
  csTokenAddress,
  basicIssuanceAddress,
} from 'constants/ethContractAddresses'

const IssueRedeemButton: React.FC = () => {
  const [amount, setAmount] = React.useState<string>('0')
  const [redeemDisabled, setRedeemDisabled] = React.useState<boolean>(true)

  const { csBalance } = useBalances()

  const { account, ethereum, onOpenWalletModal } = useWallet()
  const usdcApproval = useApproval(usdcTokenAddress, basicIssuanceAddress)
  const zrxApproval = useApproval(zrxTokenAddress, basicIssuanceAddress)
  const batApproval = useApproval(batTokenAddress, basicIssuanceAddress)
  const csApproval = useApproval(csTokenAddress, basicIssuanceAddress)

  const loginRequiredBeforeSubmit = !account

  const usdcApprovalRequired = !usdcApproval.isApproved
  const zrxApprovalRequired = !zrxApproval.isApproved
  const batApprovalRequired = !batApproval.isApproved
  const csApprovalRequired = !csApproval.isApproved

  let issueButtonText: string
  let issueButtonAction: (...args: any[]) => any
  if (loginRequiredBeforeSubmit) {
    issueButtonText = 'Issue'
    issueButtonAction = onOpenWalletModal
  } else if (usdcApprovalRequired) {
    issueButtonText = 'Approve USDC to Issue'
    issueButtonAction = usdcApproval.onApprove
  } else if (zrxApprovalRequired) {
    issueButtonText = 'Approve ZRX to Issue'
    issueButtonAction = zrxApproval.onApprove
  } else if (batApprovalRequired) {
    issueButtonText = 'Approve BAT to Issue'
    issueButtonAction = batApproval.onApprove
  } else {
    issueButtonText = 'Issue'
    issueButtonAction = () =>
      issue(
        amount,
        account,
        ethereum,
        basicIssuanceAddress,
        csTokenAddress,
        setAmount
      )
  }

  let redeemButtonText: string
  let redeemButtonAction: (...args: any[]) => any
  if (loginRequiredBeforeSubmit) {
    redeemButtonText = 'Redeem'
    redeemButtonAction = onOpenWalletModal
  } else if (csApprovalRequired) {
    redeemButtonText = 'Approve csDEFI to Redeem'
    redeemButtonAction = csApproval.onApprove
  } else {
    redeemButtonText = 'Redeem'
    redeemButtonAction = () =>
      redeem(
        amount,
        account,
        ethereum,
        basicIssuanceAddress,
        csTokenAddress,
        setAmount
      )
  }

  const onChangeAmount = (e: any) => {
    setAmount(e.target.value)
    if (csBalance) {
      if (e.target.value < Number(csBalance?.toFixed(18))) {
        setRedeemDisabled(false)
      }
    }
  }

  const maxButtonAction = () => {
    if (csBalance?.toFixed(18) === new BigNumber(0).toFixed(18)) {
      return
    }
    setAmount(Number(csBalance?.toFixed(18)).toString())
    setRedeemDisabled(false)
  }

  return (
    <StyledIssueRedeemContainer>
      <SyledButtonContainer>
        <RoundedButton
          isDisabled={!account || amount === '0' || amount === ''}
          // isPending={isFetchingOrderData}
          text={issueButtonText}
          onClick={issueButtonAction}
        />
        <StyledInsufficientBalance>
          {/* Insufficient tokens */}
        </StyledInsufficientBalance>
      </SyledButtonContainer>

      <StyledContainerSpacer />
      <SyledButtonContainer>
        <RoundedButton
          isDisabled={
            !account ||
            redeemDisabled ||
            amount === '0' ||
            amount === '' ||
            Number(csBalance?.toFixed(18)) < Number(amount)
          }
          // isPending={isFetchingOrderData}
          text={redeemButtonText}
          onClick={redeemButtonAction}
        />
        {csBalance?.toFixed(18) === new BigNumber(0).toFixed(18) ||
        Number(csBalance?.toFixed(18)) < Number(amount) ? (
          <StyledMaxButton onClick={maxButtonAction}>
            Insufficient csDEFI
          </StyledMaxButton>
        ) : (
          <StyledMaxButton onClick={maxButtonAction}>
            Max {csBalance?.toFixed(5)} csDEFI
          </StyledMaxButton>
        )}
      </SyledButtonContainer>

      <StyledContainerSpacer />

      <StyledCurrencyContainer>
        <StyledCurrencyLabelWrapper>
          <StyledCurrencyLabel>Amount</StyledCurrencyLabel>
        </StyledCurrencyLabelWrapper>

        <StyledCurrencySelectWrapper>
          <StyledInputField
            value={amount}
            onChange={onChangeAmount}
            type='number'
            min='0'
            step='0.01'
            placeholder='0'
          />
        </StyledCurrencySelectWrapper>
      </StyledCurrencyContainer>
    </StyledIssueRedeemContainer>
  )
}

const StyledIssueRedeemContainer = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`

const SyledButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`

const StyledContainerSpacer = styled.div`
  width: 10%;
  height: 100%;
`

const StyledMaxButton = styled.span`
  width: 100%;
  height: 100%;
  margin-top: 10px;
  text-align: center;
  color: ${(props) => props.theme.colors.primary.light};
  cursor: pointer;
`

const StyledInsufficientBalance = styled.span`
  width: 100%;
  margin-top: 10px;
  text-align: center;
  color: ${(props) => props.theme.colors.red};
  cursor: pointer;
`

interface StyledCurrencyContainerProps {
  isActive?: boolean
}

const StyledCurrencyContainer = styled.div<StyledCurrencyContainerProps>`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 20px;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.transparentColors.grey};
  border-radius: ${(props) => props.theme.borderRadius}px;

  ${(props) =>
    props.isActive &&
    css`
      background-color: transparent;
      border: 1px solid ${props.theme.colors.transparentColors.grey};
    `}
`

const StyledCurrencyLabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: -5px;
`

const StyledCurrencyLabel = styled.div`
  font-size: 14px;
  margin-bottom: 5px;
`

const StyledCurrencySelectWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StyledInputField = styled.input`
  font-size: 20px;
  width: 70%;
  cursor: pointer;
  color: ${(props) => props.theme.textColor};
  padding: 0px;
  border-radius: 4px;
  background: none;
  border: none;
  &:focus {
    outline: none;
  }
`

export default IssueRedeemButton
