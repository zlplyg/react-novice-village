import React from 'react';
import classNames from 'classnames';

export enum ButtomSize {
  Large = 'lg',
  Small = 'sm',
  Default  = 'default'
}

export enum ButtomType {
  Primary = 'primary',
  Defalut = 'default',
  Danger = 'danger',
  Link = 'link'
}

interface IButtonProps {
  className?: string;
  disabled?: boolean;
  size?: string;
  btnType?: string;
  href?: string;
  children: React.ReactNode;
}

type NativeButtonProps = IButtonProps & React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = IButtonProps & React.AnchorHTMLAttributes<HTMLElement>;

export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

const Button: React.FC<ButtonProps> = (props) => {
  const { className, btnType, disabled, size, children, href, ...restProps } = props;

  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    'disabled': (btnType === ButtomType.Link) && disabled
  });  

  if(btnType === ButtomType.Link && href){
    return (
      <a 
        className={ classes }
        href={ href }
        {...restProps}
      >
        { children }
      </a>
    );
  } else {
    return (
      <button
        className={ classes }
        disabled={ disabled }
        {...restProps}
      >
        { children }
      </button>
    );
  }

}

Button.defaultProps = {
  disabled: false,
  btnType: ButtomType.Defalut
}

export default Button;