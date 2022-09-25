import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
  selector: '[appDropdown]'
})

export class DropdownDirective {

  @HostBinding('class.open') ifOpen = false;

  @HostListener('click') toggleOpen(){
    this.ifOpen = !this.ifOpen;
  }
}
