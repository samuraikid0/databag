import styled from 'styled-components';
import { LightColors, DarkColors } from 'constants/Colors';

export const CardSelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  .empty {
    display: flex;
    align-items: center;
    justify-content: center;
    font-style: italic;
    @media (prefers-color-scheme: light) {
      color: ${LightColors.dimText};
    }
    @media (prefers-color-scheme: dark) {
      color: ${DarkColors.dimText};
    }
    padding-top: 16px;
  }

  .unknown {
    height: 48px;
    width: 100%;
    padding-left: 8px;
    padding-right: 8px;
    display: flex;
    align-items: center;

    .message {
      padding-left: 16px;
    }
  }
`;
