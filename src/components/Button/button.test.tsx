import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button, { ButtonProps, ButtomType, ButtomSize  } from './index';

const defaultProps = {
  onClick: jest.fn()
}

const testProps: ButtonProps = {
  btnType: ButtomType.Primary,
  size: ButtomSize.Large,
  className: 'test21'
}

const testDisabledProp: ButtonProps = {
  disabled: true,
  onClick: jest.fn()
}

describe('测试 button 组件', () => {
  test('测试 默认 样式', ()=>{
    const wrapper = render(<Button { ...defaultProps }>Nice</Button>);
    const element = wrapper.getByText('Nice') as HTMLButtonElement;
    expect(element.tagName).toEqual('BUTTON');
    expect(element.disabled).toBeFalsy();
    expect(element).toHaveClass('btn btn-default');
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled();
  })

  test('button 各种属性测试', ()=> {
    const wrapper = render(<Button { ...testProps }>Nice</Button>);
    const element = wrapper.getByText('Nice');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('btn-primary btn-lg test21');
  });

  test('button Link 组件测试', () => {
    const wrapper = render(<Button btnType={ButtomType.Link} href="http://www.baidu.com">Link</Button>);
    const element = wrapper.getByText('Link');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('A');
  });

  test('button disabled 测试', () => {
    const wrapper = render(<Button { ...testDisabledProp }>Nice</Button>);
    const element = wrapper.getByText('Nice') as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.disabled).toBeTruthy();
    fireEvent.click(element);
    expect(testDisabledProp.onClick).not.toHaveBeenCalled();
  });

});