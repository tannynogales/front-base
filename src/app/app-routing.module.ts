import { Injectable, NgModule } from '@angular/core';
import {
  RouterModule,
  RouterStateSnapshot,
  Routes,
  TitleStrategy,
} from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { LayoutShopComponent } from '@layout/layout-shop/layout/layout-shop.component';
import { AdminLayoutComponent } from '@layout/admin-layout/layout/admin-layout/admin-layout.component';
import { Title } from '@angular/platform-browser';

const routes: Routes = [
  //   {
  //     path: '',
  //     pathMatch: 'full',
  //     redirectTo: '/dashboard',
  // },
  {
    path: 'test',
    component: ErrorComponent,
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: LayoutShopComponent,
    loadChildren: () =>
      import('@layout/layout-shop/layout-shop.module').then(
        (m) => m.LayoutShopModule
      ),
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    loadChildren: () =>
      import('./layout/admin-layout/admin-layout.module').then(
        (m) => m.AdminLayoutModule
      ),
  },
  // TODO 404 page
];

@Injectable({ providedIn: 'root' })
export class TemplatePageTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      this.title.setTitle(`Roble | ${title}`);
    }
  }
}

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top', // Habilitar la restauración de posición de desplazamiento
      anchorScrolling: 'enabled', // Habilitar el desplazamiento a anclajes en la página
    }),
  ],
  exports: [RouterModule],
  providers: [{ provide: TitleStrategy, useClass: TemplatePageTitleStrategy }],
})
export class AppRoutingModule {}
