import styled from 'styled-components';
import { LightColors, DarkColors } from 'constants/Colors';

export const SelectItemWrapper = styled.div`
  @media (prefers-color-scheme: light) {
    color: ${LightColors.text};
    border-bottom: 1px solid ${LightColors.itemDivider};
  }
  @media (prefers-color-scheme: dark) {
    color: ${DarkColors.text};
    border-bottom: 1px solid ${DarkColors.itemDivider};
  }

  .active {
    cursor: pointer;
    height: 48px;
    width: 100%;
    padding-left: 16px;
    padding-right: 8px;
    display: flex;
    align-items: center;

    &:hover {
      @media (prefers-color-scheme: light) {
        background-color: ${LightColors.selectHover};
      }
      @media (prefers-color-scheme: dark) {
        background-color: ${DarkColors.selectHover};
      }
    }
  }

  .passive {
    height: 48px;
    width: 100%;
    padding-left: 16px;
    padding-right: 8px;
    display: flex;
    align-items: center;
    padding-left: 16px;
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

  .switch {
    flex-shrink: 0;
  }
`

export const Markup = styled.div`
  background-color: ${LightColors.connected};
  border-radius: 8px;
  width: 8px;
  height: 8px;
  margin-right: 8px;
`;

