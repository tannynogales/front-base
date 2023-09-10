import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';
import { Category } from '@core/models';

@Component({
  selector: 'app-menu-top',
  templateUrl: './menu-top.component.html',
  styleUrls: ['./menu-top.component.scss'],
})
export class MenuTopComponent implements AfterViewInit {
  @Input() selected: string = '';
  @Input() items: Category[] = [
    {
      id: 1,
      name: 'Home',
      slug: 'home',
      parent_categories: [],
    },
  ];

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  @ViewChild('rightArrow') rightArrow!: ElementRef;

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
    // Detect scroll evento on scrollContainer
    // this.scrollContainer.nativeElement.addEventListener('scroll', () => {});
  }

  moveScroll() {
    const currentScrollPosition = this.scrollContainer.nativeElement.scrollLeft;
    const newScrollPosition = currentScrollPosition + 70;

    this.scrollContainer.nativeElement.scrollLeft = newScrollPosition;
  }
}
