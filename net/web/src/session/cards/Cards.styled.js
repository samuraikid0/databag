import styled from 'styled-components';
import { DarkColors, LightColors } from 'constants/Colors';

export const CardsWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  @media (prefers-color-scheme: light) {
    background-color: ${LightColors.formFocus};
    color: ${LightColors.text};
  }
  @media (prefers-color-scheme: dark) {
    background-color: ${DarkColors.formFocus};
    color: ${DarkColors.text};
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
      color: ${LightColors.grey};
      height: 100%;
    }
  }
  
  .search {
    display: flex;
    flex-direction: row;
    height: 48px;
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 8px;
    padding-bottom: 8px;
    @media (prefers-color-scheme: light) {
      border-bottom: 1px solid ${LightColors.divider};
    }
    @media (prefers-color-scheme: dark) {
      border-bottom: 1px solid ${DarkColors.divider};
    }

    .sorted {
      font-size: 18px;
      padding-right: 8px;
      display: flex;
      align-items: center;
      cursor: pointer;
      @media (prefers-color-scheme: light) {
        color: ${LightColors.enabled};
      }
      @media (prefers-color-scheme: dark) {
        color: ${DarkColors.enabled};
      }
    }

    .unsorted {
      font-size: 18px;
      padding-right: 8px;
      display: flex;
      align-items: center;
      cursor: pointer;
      @media (prefers-color-scheme: light) {
        color: ${LightColors.disabled};
      }
      @media (prefers-color-scheme: dark) {
        color: ${DarkColors.disabled};
      }
    }


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

      .add {
        display: flex;
        flex-direction: row;
        color: ${LightColors.white};
        background-color: ${LightColors.primary};
        align-items: center;
        justify-content: center;
        padding-left: 16px;
        padding-right: 16px;
        border-radius: 4px;
        font-size: 14px;
        cursor: pointer;
        height: 100%;
        flex-shrink: 0;

        .label {
          padding-left: 8px;
        }
      }
    }

    .dismiss {
      font-size: 18px;
      color: ${LightColors.text};
      cursor: pointer;
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
    padding-bottom: 12px;
    padding-top: 12px;
    position: relative;
    @media (prefers-color-scheme: light) {
      background-color: ${LightColors.formBackground};
      border-top: 1px solid ${LightColors.divider};
    }
    @media (prefers-color-scheme: dark) {
      background-color: ${DarkColors.formBackground};
      border-top: 1px solid ${DarkColors.divider};
    }

    .add {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      padding-left: 16px;
      padding-right: 16px;
      border-radius: 4px;
      font-size: 14px;
      cursor: pointer;
      height: 100%;
      flex-shrink: 0;
      @media (prefers-color-scheme: light) {
        color: ${LightColors.link};
      }
      @media (prefers-color-scheme: dark) {
        color: ${DarkColors.link};
      }


      .label {
        padding-left: 8px;
      }
    }
  }
`;
