import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ParentCategory } from '@core/models';

@Component({
  selector: 'app-menu-top',
  templateUrl: './menu-top.component.html',
  styleUrls: ['./menu-top.component.scss'],
})
export class MenuTopComponent
  implements AfterViewInit, OnChanges, AfterViewInit
{
  @Input() selected: string = '';
  @Input() items: ParentCategory[] = [
    {
      id: 1,
      name: 'Home',
      slug: 'home',
      //parent_categories: [],
    },
  ];

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  @ViewChild('rightArrow') rightArrow!: ElementRef;

  // @ViewChildren('items') actions: QueryList<CustomCardAction>;

  // TODO: documentar por qué hago esto
  @HostListener('window:resize', ['$event'])
  onResize() {
    if (
      this.scrollContainer.nativeElement.scrollWidth >
      this.scrollContainer.nativeElement.clientWidth
    ) {
      this.rightArrow.nativeElement.classList.add('scrollActive');
    } else {
      this.rightArrow.nativeElement.classList.remove('scrollActive');
    }
  }

  ngAfterViewInit() {
    this.onResize();
    // Detect scroll event on scrollContainer
    // this.scrollContainer.nativeElement.addEventListener('scroll', () => {});
    this.goToElement(this.selected);
  }

  moveScroll() {
    const currentScrollPosition = this.scrollContainer.nativeElement.scrollLeft;
    const newScrollPosition = currentScrollPosition + 70;

    this.scrollContainer.nativeElement.scrollLeft = newScrollPosition;
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes);
    if (changes['selected']) {
      // console.log(
      //   'El valor de inputText ha cambiado:',
      //   changes['selected'].currentValue
      // );
      this.goToElement(this.selected);
    }
  }

  goToElement(id: string) {
    const menuItem = document.getElementById(id);
    // const rect = menuItem?.getBoundingClientRect();

    setTimeout(function () {
      if (menuItem) {
        menuItem.scrollIntoView({
          behavior: 'auto',
          block: 'nearest',
          inline: 'start',
        });
      }
    }, 1);
  }
}
