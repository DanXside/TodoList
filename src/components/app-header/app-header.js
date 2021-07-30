import React from 'react';

import './todo-header.css';

const AppHeader = ( {toDo, done} ) => {
    return (
    <div className="header-wrapper">
        <h1 className="todo-header">Todo List</h1>
        <h2 className="todo-subtitle">{toDo} more to do, {done} done</h2>
    </div>
    );
};

export default AppHeader;