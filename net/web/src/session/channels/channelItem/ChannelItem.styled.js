import styled from 'styled-components';
import { LightColors, DarkColors } from 'constants/Colors';

export const ChannelItemWrapper = styled.div`
  height: 48px;
  width: 100%;
  display: flex;
  align-items: center;
  line-height: 16px;
  cursor: pointer;
  overflow: hidden;
  @media (prefers-color-scheme: light) {
    border-bottom: 1px solid ${LightColors.itemDivider};
    color: ${LightColors.text};
  }
  @media (prefers-color-scheme: dark) {
    border-bottom: 1px solid ${DarkColors.itemDivider};
    color: ${DarkColors.text};
  }

  &:hover {
    @media (prefers-color-scheme: light) {
      background-color: ${LightColors.formHover};
    }
    @media (prefers-color-scheme: dark) {
      background-color: ${DarkColors.formHover};
    }
  }

  .active {
    @media (prefers-color-scheme: light) {
      background-color: ${LightColors.selected};
    }
    @media (prefers-color-scheme: dark) {
      background-color: ${DarkColors.selected};
    }
    width: 100%;
    height: 100%;
    display: flex;
    align-item: center;
  }

  .idle {
    width: 100%;
  }

  .item {
    display: flex;
    flex-direction: row;
    align-items: center;
    min-width: 0;
    padding-left: 16px;
    padding-right: 16px;

    .avatar{
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      font-size: 18px;
      flex-shrink: 0;
    }

    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      @media (prefers-color-scheme: light) {
        border: 1px solid ${LightColors.faded};
      }
      @media (prefers-color-scheme: dark) {
        border: 1px solid ${DarkColors.faded};
      }
      width: 32px;
      height: 32px;
      border-radius: 4px;
      font-size: 18px;
      flex-shrink: 0;
    }

    .details {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      padding-left: 16px;
      justify-content: center;
      min-width: 0;

      .subject {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .message {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        @media (prefers-color-scheme: light) {
          color: ${LightColors.dimText};
        }
        @media (prefers-color-scheme: dark) {
          color: ${DarkColors.dimText};
        }
      }
    }
  }
`

export const Markup = styled.div`
  position: absolute;
  right: 0;
  border-radius: 8px;
  background-color: ${LightColors.background};
  width: 8px;
  height: 8px;
  margin-right: 8px;
`;
