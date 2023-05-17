import { WelcomeWrapper } from './Welcome.styled';
import { RightOutlined } from '@ant-design/icons';
import { Space } from 'antd';

import session from 'images/session.png';
import darken from 'images/darken.png';

export function Welcome() {
  return (
    <WelcomeWrapper>
      <div className="title">
        <div className="header">Databag</div>
        <div>Communication for the decentralized web</div>
      </div>
      <img className="session" src={session} alt="Session Background" />
      <img className="darken" src={darken} alt="Session Background" />
      <div className="message">
        <Space>
          <div>Setup your profile</div>
          <RightOutlined />
          <div>Connect with people</div>
          <RightOutlined />
          <div>Start a conversation</div>
        </Space>
      </div>
    </WelcomeWrapper>
  );
}


