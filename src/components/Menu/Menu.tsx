import React, { useState, createContext } from 'react';
import { MenuItemProps } from './MenuItem';
import classNames from 'classnames';

type MenuMode = 'horizontal' | 'vertical';
type SelectCallBack = (selectIndex: string) => void;

export interface MenuProps {
  defaultIndex?: string;
  className?: string;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
  style?: React.CSSProperties;
  onSelect?: SelectCallBack;
}

interface IMenuContext {
  index?: string;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
  onSelect?: SelectCallBack;
}

export const MenuContext = createContext<IMenuContext>({index: '0'});
const Menu: React.FC<MenuProps> = (props) => {
  const { className, defaultIndex, mode, style, children, defaultOpenSubMenus, onSelect }  = props;
  const [currentActive, setCurrentActive] = useState(defaultIndex);
  const classes = classNames('nv-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical',
  });

  const handleClick = (index: string) => {
    setCurrentActive(index);
    if(onSelect){
      onSelect(index);
    }
  }

  const passMenuContext: IMenuContext = {
    index: currentActive? currentActive: '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus,
  }

  const renderChildren = () => {
    return React.Children.map(children, (child, index)=> {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, { index: index.toString() });
      }else{
        console.error('Menu Child 不是 MenuItem');
      }
    });
  }

  return (
    <ul className={ classes } style={ style } data-testid="test-menu">
      <MenuContext.Provider value={passMenuContext}>
        { renderChildren() }
      </MenuContext.Provider>
    </ul>
  );
}

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: []
}

export default Menu;