import { Modal, Dropdown, Menu, Tooltip } from 'antd';
import { Logo } from 'logo/Logo';
import { useState, useEffect } from 'react'; 
import { IdentityWrapper, MenuItem, ErrorNotice, InfoNotice } from './Identity.styled';
import { useIdentity } from './useIdentity.hook';
import { LogoutOutlined, InfoCircleOutlined, ExclamationCircleOutlined, DownOutlined } from '@ant-design/icons';
import { DarkColors, LightColors } from 'constants/Colors';

export function Identity({ openAccount, openCards, cardUpdated }) {

  const [modal, modalContext] = Modal.useModal();
  const { state, actions } = useIdentity();
  const [menuStyle, setMenuStyle] = useState({});

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setMenuStyle({ backgroundColor: DarkColors.menuBackground, color: DarkColors.text });
    }
    else {
      setMenuStyle({ backgroundColor: LightColors.menuBackground, color: LightColors.text });
    }
  }, []);

  const logout = () => {
    modal.confirm({
      title: <div style={menuStyle}>Are you sure you want to logout?</div>,
      icon: <LogoutOutlined />,
      bodyStyle: { padding: 16, ...menuStyle },
      onOk() {
        actions.logout();
      },
      onCancel() {},
    });
  }

  const menu = (
    <Menu style={menuStyle}>
      <Menu.Item key="0">
        <MenuItem onClick={openAccount}>Account</MenuItem>
      </Menu.Item>
      <Menu.Item key="1">
        <MenuItem onClick={openCards}>Contacts</MenuItem>
      </Menu.Item>
      <Menu.Item key="2">
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} overlayStyle={{ minWidth: 0 }} trigger={['click']} placement="bottomRight">
      <IdentityWrapper>
        { modalContext }
        { state.init && (
          <Logo url={state.url} width={40} height={40} radius={4} />
        )}
        <div className="label">
          <div className="name">{state.name}</div>
          <div className="handle">
            <div className="notice">
              { state.status !== 'connected' && ( 
                <Tooltip placement="right" title="disconnected from server">
                  <ErrorNotice>
                    <ExclamationCircleOutlined />
                  </ErrorNotice>
                </Tooltip>
              )}
            </div>
            <div>{state.handle}</div>
            <div className="notice">
              { cardUpdated && (
                <Tooltip placement="right" title="contacts have updated">
                  <InfoNotice>
                    <InfoCircleOutlined />
                  </InfoNotice>
                </Tooltip>
              )}
            </div>
          </div>
        </div>
        <div className="drop">
          <DownOutlined clasName="dropIcon" />
        </div>
      </IdentityWrapper>
    </Dropdown>
  );
}


