import styled from 'styled-components';
import { DarkColors, LightColors } from 'constants/Colors';

export const ListingWrapper = styled.div`
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
    @media (prefers-color-scheme: light) {
      border-bottom: 1px solid ${LightColors.divider};
    }
    @media (prefers-color-scheme: dark) {
      border-bottom: 1px solid ${DarkColors.divider};
    }
    display: flex;
    flex-direction: row;
    min-height: 48px;
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 8px;
    padding-bottom: 8px;
    flex-shrink: 0;

    .showfilter {
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

    .hidefilter {
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

    .params {
      flex-grow: 1;
    }

    .username {
      margin-top: 4px;
    }

    .node {
      border-radius: 8px;
      @media (prefers-color-scheme: light) {
        color: ${LightColors.text};
        background-color: ${LightColors.inputBackground};
      }
      @media (prefers-color-scheme: dark) {
        color: ${DarkColors.text};
        background-color: ${DarkColors.inputBackground};
      }

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
      padding-left: 4px;
      display: flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }

    .control {
      @media (prefers-color-scheme: light) {
        color: ${LightColors.text};
      }
      @media (prefers-color-scheme: dark) {
        color: ${DarkColors.text};
      }
    }
  }
`;
