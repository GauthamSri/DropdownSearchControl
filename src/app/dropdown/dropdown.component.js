"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
require('./dropdown.component.scss');
var DropdownComponent = (function () {
    function DropdownComponent() {
        this.open = false;
        this.getSelectedItem = new core_1.EventEmitter();
    }
    Object.defineProperty(DropdownComponent.prototype, "item", {
        get: function () {
            return this._item;
        },
        set: function (itemFromParent) {
            this._item = itemFromParent;
            this.itemValue = itemFromParent ? itemFromParent.value : "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropdownComponent.prototype, "listOfItems", {
        get: function () {
            return this._listOfItems;
        },
        set: function (items) {
            this._listOfItems = items;
            this.dropdownItems = items ? Array.from(items) : [];
        },
        enumerable: true,
        configurable: true
    });
    DropdownComponent.prototype.ngOnInit = function () {
    };
    DropdownComponent.prototype.onChange = function () {
        this.open = true;
        if (this.itemValue) {
            var results = this.filterItems(this.itemValue);
            this.dropdownItems = results.length > 1 ? results : this._listOfItems;
        }
        else {
            this.dropdownItems = this._listOfItems;
        }
    };
    DropdownComponent.prototype.onBlur = function () {
        var _this = this;
        this.itemValue = this.isItemValueValid() ? this.itemValue : " ";
        setTimeout(function () {
            _this.dropdownItems = _this._listOfItems;
        }, 400);
    };
    DropdownComponent.prototype.isItemValueValid = function () {
        for (var i = 0; i < this._listOfItems.length; i++) {
            if (this._listOfItems[i].value === this.itemValue) {
                return true;
            }
        }
        return false;
    };
    DropdownComponent.prototype.onItemSelected = function (selectedItem) {
        this.itemValue = selectedItem.value;
        this._item = selectedItem;
        this.getSelectedItem.emit(this._item);
    };
    DropdownComponent.prototype.filterItems = function (query) {
        return this.dropdownItems.filter(function (el) {
            return el.value.toLowerCase().indexOf(query.toLowerCase()) > -1;
        });
    };
    return DropdownComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DropdownComponent.prototype, "item", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], DropdownComponent.prototype, "listOfItems", null);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], DropdownComponent.prototype, "getSelectedItem", void 0);
DropdownComponent = __decorate([
    core_1.Component({
        selector: 'dropdown',
        templateUrl: './dropdown.component.html',
    }),
    __metadata("design:paramtypes", [])
], DropdownComponent);
exports.DropdownComponent = DropdownComponent;
//# sourceMappingURL=dropdown.component.js.map