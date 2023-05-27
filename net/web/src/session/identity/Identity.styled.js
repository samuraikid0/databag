import styled from 'styled-components';
import { LightColors, DarkColors } from 'constants/Colors';

export const IdentityWrapper = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
  @media (prefers-color-scheme: light) {
    border-bottom: 1px solid ${LightColors.divider};
    background-color: ${LightColors.formBackground};
  }
  @media (prefers-color-scheme: dark) {
    border-bottom: 1px solid ${DarkColors.divider};
    background-color: ${DarkColors.formBackground};
  }
  flex-shrink: 0;

  &:hover {
    cursor: pointer;
    @media (prefers-color-scheme: light) {
      background-color: ${LightColors.formFocus};
    }
    @media (prefers-color-scheme: dark) {
      background-color: ${DarkColors.formFocus};
    }

    .drop {
      font-weight: bold;
    }
  }

  .drop {
    padding-left: 4px;
    padding-right: 4px;
    border-radius: 8px;
    @media (prefers-color-scheme: light) {
      color: ${LightColors.text};
    }
    @media (prefers-color-scheme: dark) {
      color: ${DarkColors.text};
    }
  }

  .label {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    line-height: 16px;
    @media (prefers-color-scheme: light) {
      color: ${LightColors.text};
    }
    @media (prefers-color-scheme: dark) {
      color: ${DarkColors.text};
    }
    min-width: 0;

    .name {
      font-size: 14px;
    }

    .handle {
      font-size: 12px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      font-weight: bold;

      .notice {
        width: 32px;
        display: flex;
        flex-direction: row;
        justify-content: center;
      }
    }
  }
`;

export const ErrorNotice = styled.div`
  @media (prefers-color-scheme: light) {
    color: ${LightColors.alert};
  }
  @media (prefers-color-scheme: dark) {
    color: ${DarkColors.alert};
  }
`

export const InfoNotice = styled.div`
  @media (prefers-color-scheme: light) {
    color: ${LightColors.primary};
  }
  @media (prefers-color-scheme: dark) {
    color: ${DarkColors.primary};
  }
`

export const MenuItem = styled.div`
  @media (prefers-color-scheme: light) {
    color: ${LightColors.text};
  }
  @media (prefers-color-scheme: dark) {
    color: ${DarkColors.text};
  }
`

