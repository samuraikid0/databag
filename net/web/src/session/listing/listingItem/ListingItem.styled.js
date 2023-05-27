import styled from 'styled-components';
import { DarkColors, LightColors } from 'constants/Colors';

export const ListingItemWrapper = styled.div`
  height: 48px;
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
  @media (prefers-color-scheme: light) {
    border-bottom: 1px solid ${LightColors.itemDivider};
    color: ${LightColors.text};
  }
  @media (prefers-color-scheme: dark) {
    border-bottom: 1px solid ${DarkColors.itemDivider};
    color: ${DarkColors.text};
  }

  &:hover {
    cursor: pointer;
    @media (prefers-color-scheme: light) {
      background-color: ${LightColors.formHover};
    }
    @media (prefers-color-scheme: dark) {
      background-color: ${DarkColors.formHover};
    }
  }

  .details {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding-left: 16px;
    justify-content: center;
    min-width: 0;

    .name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 15px;
    }

    .handle {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 12px;
    }
  }
`

