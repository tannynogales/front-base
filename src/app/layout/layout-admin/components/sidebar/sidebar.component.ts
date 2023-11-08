import {
  Component,
  ElementRef,
  // OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @ViewChild('sidebar')
  public sidebar!: ElementRef<HTMLElement>;

  @ViewChild('sidebarBackground')
  public sidebarBackground!: ElementRef<HTMLElement>;

  constructor(private renderer: Renderer2) {}

  // ngOnInit(): void {
  // }

  closeSidebar() {
    console.log('close sidebar');
    const el = this.sidebar.nativeElement;
    this.renderer.removeClass(el, 'active');
  }

  toggleSideBar() {
    const activeB =
      this.sidebarBackground.nativeElement.classList.contains('active');
    this.renderer[activeB ? 'removeClass' : 'addClass'](
      this.sidebarBackground.nativeElement,
      'active'
    );

    const activeS = this.sidebar.nativeElement.classList.contains('active');
    this.renderer[activeS ? 'removeClass' : 'addClass'](
      this.sidebar.nativeElement,
      'active'
    );
  }
}
