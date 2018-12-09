import React from 'react';
import classes from './Toolbar.css';
import ListImg from '../../assets/icon-menu.png';
import GridImg from '../../assets/icon-grid.png';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div>
            <span className={classes.Grid} onClick={props.gridClicked} >
                <img src={GridImg} alt="Grid" height="18px" /> 
            </span>
            <span className={classes.Menu} onClick={props.listClicked} >
                <img src={ListImg} alt="List" />    
            </span>
        </div>
    </header>
)

export default toolbar;