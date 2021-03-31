import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { MenuContext } from './Menu';
import { MenuItemProps } from './MenuItem';
import Icon from '../Icon/Icon';

export interface SubMenuProps {
  index?: string;
  title: string;
  className?: string;
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const context = useContext(MenuContext);
  const { index, title, className, children} = props;
  const openSubMenus = context.defaultOpenSubMenus as Array<string>;
  const isOpend = (index && context.mode === 'vertical')? openSubMenus.includes(index): false;
  const [menuOpen, setMenuOpen] = useState(isOpend);
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index,
    'is-opened': menuOpen,
    'is-vertical': context.mode === 'vertical'
  });

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(!menuOpen);
  }

  let timer: any;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(()=>{
      setMenuOpen(toggle);
    }, 300);
  }

  const clickEvents = context.mode === 'vertical'? { 
    onClick: handleClick
  }: {};

  const hoverEvents = context.mode !== 'vertical'? {
    onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true) },
    onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false) }
  }: {}
   
    

  const renderChildren = () => {
    const subMenuClasses = classNames('nv-submenu', {
      'menu-opened': menuOpen
    });
    const childrenComponent = React.Children.map(children, (child, i)=> {
      const childrenElement = child as React.FunctionComponentElement<MenuItemProps>;
      if(childrenElement.type.displayName === 'MenuItem'){
        return React.cloneElement(childrenElement, { index: `${index}-${i}`});
      }else{
        console.error('');
      }
    });
    return (<ul className={subMenuClasses}>
      {childrenComponent}
    </ul>);
  }
  return (
    <li key={ index } className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title} 
        <Icon icon="angle-down" className="arrow-icon"/>
      </div>
      {renderChildren()}
    </li>
  );
}

SubMenu.displayName = 'SubMenu';
export default SubMenu;