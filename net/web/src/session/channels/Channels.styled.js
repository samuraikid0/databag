import styled from 'styled-components';
import { LightColors, DarkColors } from 'constants/Colors';

export const ChannelsWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  @media (prefers-color-scheme: light) {
    background-color: ${LightColors.formFocus};
  }
  @media (prefers-color-scheme: dark) {
    background-color: ${DarkColors.formFocus};
  }

  .view {
    min-height: 0;
    overflow: auto;
    flex-grow: 1;

    .empty {
      display: flex;
      align-items: center;
      justify-content: center;
      font-style: italic;
      height: 100%;
      @media (prefers-color-scheme: light) {
        color: ${LightColors.dimText};
      }
      @media (prefers-color-scheme: dark) {
        color: ${DarkColors.dimText};
      }
    }
  }
 
  .search {
    padding-top: 8px;
    padding-bottom: 8px;
    padding-left: 16px;
    padding-right: 16px;
    @media (prefers-color-scheme: light) {
      border-bottom: 1px solid ${LightColors.divider};
    }
    @media (prefers-color-scheme: dark) {
      border-bottom: 1px solid ${DarkColors.divider};
    }
    display: flex;
    flex-direction: row;
    height: 48px;

    .filter {
      @media (prefers-color-scheme: light) {
        color: ${LightColors.text};
        background-color: ${LightColors.inputBackground};
      }
      @media (prefers-color-scheme: dark) {
        color: ${DarkColors.text};
        background-color: ${DarkColors.inputBackground};
      }
      border-radius: 8px;
      flex-grow: 1;

      .ant-input-prefix {
        @media (prefers-color-scheme: light) {
          color: ${LightColors.text};
        }
        @media (prefers-color-scheme: dark) {
          color: ${DarkColors.text};
        }
      }

      .ant-input {
        @media (prefers-color-scheme: light) {
          color: ${LightColors.text};
        }
        @media (prefers-color-scheme: dark) {
          color: ${DarkColors.text};
        }

        ::placeholder {
          @media (prefers-color-scheme: light) {
            color: ${LightColors.dimText};
          }
          @media (prefers-color-scheme: dark) {
            color: ${DarkColors.dimText};
          }
        }
      }
    }

    .inline {
      padding-left: 8px;
      display: flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
  }

  .bar {
    height: 48px;
    width: 100%;
    display: flex;
    flex-shrink: 0;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    @media (prefers-color-scheme: light) {
      background-color: ${LightColors.formBackground};
      border-top: 1px solid ${LightColors.divider};
    }
    @media (prefers-color-scheme: dark) {
      background-color: ${DarkColors.formBackground};
      border-top: 1px solid ${DarkColors.divider};
    }
    padding-bottom: 10px;
    padding-top: 10px;
    position: relative;
  }

  .add {
    display: flex;
    flex-direction: row;
    background-color: ${LightColors.primary};
    color: ${LightColors.white};
    align-items: center;
    justify-content: center;
    padding-left: 16px;
    padding-right: 16px;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    height: 100%;

    .label {
      padding-left: 8px;
    }
  }
`;

