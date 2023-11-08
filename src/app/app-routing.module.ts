import { Injectable, NgModule } from '@angular/core';
import {
  RouterModule,
  RouterStateSnapshot,
  Routes,
  TitleStrategy,
} from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { LayoutShopComponent } from '@layout/layout-shop/layout/layout-shop.component';
import { LayoutAdminComponent } from '@layout/layout-admin/layout/admin-layout/layout-admin.component';
import { Title } from '@angular/platform-browser';
import { SessionGuard } from '@core/guards';

const routes: Routes = [
  //   {
  //     path: '',
  //     pathMatch: 'full',
  //     redirectTo: '/dashboard',
  // },
  {
    path: 'admin',
    component: LayoutAdminComponent,
    loadChildren: () =>
      import('./layout/layout-admin/layout-admin.module').then(
        (m) => m.LayoutAdminModule
      ),
    canActivate: [SessionGuard],
  },
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
