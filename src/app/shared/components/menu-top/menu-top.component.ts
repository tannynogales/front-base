import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ParentCategory } from '@core/models';

@Component({
  selector: 'app-menu-top',
  templateUrl: './menu-top.component.html',
  styleUrls: ['./menu-top.component.scss'],
})
export class MenuTopComponent implements AfterViewInit, OnDestroy {
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
    // console.log(this.selected);
    const element = document.getElementById(this.selected);
    if (element)
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
  }

  moveScroll() {
    const currentScrollPosition = this.scrollContainer.nativeElement.scrollLeft;
    const newScrollPosition = currentScrollPosition + 70;

    this.scrollContainer.nativeElement.scrollLeft = newScrollPosition;
  }

  constructor() {
    console.log('constructor ' + this.selected);
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy ' + this.selected);
  }
}
