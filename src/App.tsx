import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Button from './components/Button';
import Menu from './components/Menu/Menu';
import MenuItem from './components/Menu/MenuItem';
import SubMenu from './components/Menu/SubMenu';
import Icon from './components/Icon/Icon';


library.add(fas);

function App() {

  return (
    <div className="App">
      <Button onClick={()=>{console.log('c')}} >Default</Button>
      <Button className="test" size='lg' btnType="primary" > Primary </Button>
      <Button size='sm' disabled> $blue-9 </Button>
      <Button btnType='danger' size='sm' > danger </Button>
      <Button btnType="link" href="http://www.baidu.com" target="_blank">link href</Button>
      <Button btnType="link" href="http://www.baidu.com" disabled>link href</Button>


      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <Icon icon="arrow-down" size='10x' theme="danger" />

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Menu mode="vertical" onSelect={(index)=>{console.log(index);}} defaultOpenSubMenus={['3']}>
        <MenuItem >
          菜单一
        </MenuItem>
        <MenuItem disabled>
        菜单二
        </MenuItem>
        <MenuItem>
        菜单三
        </MenuItem>
        <SubMenu title="菜单四">
          <MenuItem>
            四三而已
          </MenuItem>
          <MenuItem>
            二级导航
          </MenuItem>
        </SubMenu>
      </Menu>

    </div>
  );
}

export default App;
