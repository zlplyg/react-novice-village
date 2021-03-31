import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

export type themeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark';

export interface IconProps extends FontAwesomeIconProps {
  theme?: themeProps
}

const Icon: React.FC<IconProps> = (props) => {
  const { className, theme, ...resetProps } = props;
  const classes = classNames('nv-icon', className, {
    [`icon-${theme}`]: theme
  });
  return (<FontAwesomeIcon className={classes} {...resetProps}/>);
}

export default Icon;