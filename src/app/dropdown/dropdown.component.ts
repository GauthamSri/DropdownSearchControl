import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DropdownItem } from './dropdown-item';

require('./dropdown.component.scss');

@Component({
    selector: 'dropdown',
    templateUrl: './dropdown.component.html',
})
export class DropdownComponent implements OnInit {
    private _item: DropdownItem;
    get item(): DropdownItem {
       return this._item;
     }
    @Input()
    set item(itemFromParent :DropdownItem) {
      this._item = itemFromParent;
      this.itemValue = itemFromParent? itemFromParent.value: "";
     } 

    private _listOfItems: Array<DropdownItem>;
    get listOfItems(): Array<DropdownItem> {
      return this._listOfItems;
    }
    @Input()
    set listOfItems(items :Array<DropdownItem>) {
      this._listOfItems = items;
      this.dropdownItems = items? Array.from(items):[] ;
    }

    dropdownItems: Array<DropdownItem>;
    itemValue: string;
    open: boolean = false;
    @Output() getSelectedItem = new EventEmitter();

    constructor() {
    }

    ngOnInit() {

    }

    onChange() {
        this.open = true;  
        if(this.itemValue)
        {
            let results = this.filterItems(this.itemValue);
            this.dropdownItems=results.length>1? results : this._listOfItems;
        } 
        else
        {
            this.dropdownItems = this._listOfItems;
        }    
        
    }

    onBlur(){
        this.itemValue = this.isItemValueValid()? this.itemValue:" ";
         setTimeout(() => {  
            this.dropdownItems = this._listOfItems;
            }, 400);

    }

    isItemValueValid(): boolean {
        for (var i=0; i < this._listOfItems.length; i++) {
           if (this._listOfItems[i].value === this.itemValue) {
            return true;
          }
      }
      return false;
    }

    onItemSelected(selectedItem: DropdownItem) {
        this.itemValue = selectedItem.value;
        this._item = selectedItem;
        this.getSelectedItem.emit(this._item);
    }

    filterItems(query : string) {
    return this.dropdownItems.filter(function(el) {
     return el.value.toLowerCase().indexOf(query.toLowerCase()) > -1;
    })
  } 


}
