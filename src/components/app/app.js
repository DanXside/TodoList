import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {
    
    maxId = 100;

    state = {
        items: [
            this.createTodoItem('Drink coffee'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Have a lunch')
        ],
        term: '',
        filter: 'all'
    };

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        };
    };

    deleteItem = (id) => {
        this.setState(({ items }) => {
            const idx = items.findIndex((el) => el.id === id);
            
            const before = items.slice(0, idx);
            const after = items.slice(idx + 1);

            const newArray = [...before, ...after];

            return {
                items: newArray
            };
        });
    };

    addItem = (text) => {
        const newItem = this.createTodoItem(text);
        
        this.setState(({ items }) => {
            const newArr = [
                ...items,
                newItem
            ];
            return {
                items: newArr
            };
        });
    };

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id);

        const oldItem = arr[idx];

        const newItem = {...oldItem, [propName]: !oldItem[propName]};

        return [ 
            ...arr.slice(0, idx), 
            newItem,
            ...arr.slice(idx + 1)
        ];
    };

    onToggleImportant = (id) => {
        this.setState( ({ items }) => {
            return {
                items: this.toggleProperty(items, id, 'important')
            };
        });
    };

    onToggleDone = (id) => {
        this.setState( ({ items }) => {
            return {
                items: this.toggleProperty(items, id, 'done')
            };
        });
    };

    onSearchChange = (term) => {
        this.setState({ term })
    };

    onFilterChange = (filter) => {
        this.setState({ filter })
    };

    search(items, term) {
        if (term.length === 0) {
            return items
        };

        return items.filter((item) => {
            return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
        });
    };

    filter(items, filter) {
        switch(filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.done);
            case 'done':
                return items.filter((item) => item.done);
            default:
                return items;
        }
    }

    render() {
        const { items, term, filter } = this.state;

        const doneCount = items.filter((el) => el.done).length;
        const todoCount = items.length - doneCount;
        const visibleItems = this.filter(this.search(items, term), filter);
        return (
            <div>
               <AppHeader toDo={todoCount} done={doneCount} />
               <div className="top-panel d-flex justify-content-sm-between">
                <SearchPanel
                onSearchChange={ this.onSearchChange } />
                <ItemStatusFilter filter={filter}
                onFilterChange={this.onFilterChange} />
                </div>
               <TodoList 
               items={visibleItems} 
               onDeleted={ this.deleteItem }
               onToggleImportant={this.onToggleImportant}
               onToggleDone={this.onToggleDone} />
               <ItemAddForm onItemAdded={this.addItem} />
            </div> 
        );
    } 
};