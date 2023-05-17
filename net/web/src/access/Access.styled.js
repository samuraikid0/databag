import styled from 'styled-components';
import { LightColors, DarkColors } from 'constants/Colors';

export const AccessWrapper = styled.div`
  height: 100%;

  .full-layout {
    width: 100%;
    height: 100%;
    padding: 8px;
    
    .center {
      width: 100%;
      height: 100%;
      border-radius: 4px;
      background: ${LightColors.formBackground};
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .split-layout {
    display: flex;
    flex-direction: row;
    height: 100%;

    .left {
      width: 50%;
      height: 100%;
      padding: 32px;
      @media (prefers-color-scheme: light) {
        background-color: ${LightColors.background};
      }
      @media (prefers-color-scheme: dark) {
        background-color: ${DarkColors.background};
      }

      .lightsplash {
        width: 100%;
        height: 100%;
        object-fit: contain;
        @media (prefers-color-scheme: light) {
          display: block;
        }
        @media (prefers-color-scheme: dark) {
          display: none;
        }
      }

      .darksplash {
        width: 100%;
        height: 100%;
        object-fit: contain;
        @media (prefers-color-scheme: light) {
          display: none;
        }
        @media (prefers-color-scheme: dark) {
          display: block;
        }
      }
    }

    .right {
      width: 50%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      @media (prefers-color-scheme: light) {
        background-color: ${LightColors.background};
      }
      @media (prefers-color-scheme: dark) {
        background-color: ${DarkColors.background};
      }
    }
  }
`;
