import React from 'react';
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react';
import Menu, { MenuProps } from './Menu';
import MenuItem from './MenuItem';

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test'
}

const testVerProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical'
}

// : React.FC<MenuProps>
const testMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
    <MenuItem>
      active
    </MenuItem>
    <MenuItem disabled>
      disabled
    </MenuItem>
    <MenuItem >
    菜单三
    </MenuItem>
    {/* <li>22</li> */}
  </Menu>
  )
}

let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledEelment: HTMLElement;

describe('测试 Menu 和 MenuItem 组件', () => {
  beforeEach(()=> {
    wrapper = render(testMenu(testProps));
    menuElement = wrapper.getByTestId('test-menu');
    activeElement = wrapper.getByText('active');
    disabledEelment = wrapper.getByText('disabled')
  });
  test('测试 Menu 和 MenuItem 默认样式', () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass('nv-menu test');
    expect(menuElement.getElementsByTagName('li').length).toEqual(3);
    expect(activeElement).toHaveClass('menu-item is-active');
    expect(disabledEelment).toHaveClass('menu-item is-disabled');
  });
  test('测试 点击 item 是否正常切换、disabled是否能选中 、 回调函数是否正常调用', () => {
    const thindItem = wrapper.getByText('菜单三');
    fireEvent.click(thindItem);
    expect(thindItem).toHaveClass('is-active');
    expect(activeElement).not.toHaveClass('is-active');
    expect(testProps.onSelect).toHaveBeenCalledWith(2);
    fireEvent.click(disabledEelment);
    expect(disabledEelment).not.toHaveClass('is-active');
    expect(testProps.onSelect).not.toHaveBeenCalledWith(1);
  });
  it('测试 vertical 模式是否正常', () => {
    cleanup();
    const wrapper = render(testMenu(testVerProps));
    const menuElement = wrapper.getByTestId('test-menu');
    expect(menuElement).toHaveClass('menu-vertical');
  });

});