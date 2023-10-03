import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

/*
El objetivo de este servicio es gestionar las rutas privadas que se ponen en el navegador
Las rutas privadas se setean en el session guard y luego se leen en el componenete token-expiration
con el objeto de hacer logout() solo si el usuario no esta logueado y si la ruta es privada
*/

@Injectable({
  providedIn: 'root',
})
export class PrivatePagesService {
  // default private pages
  pages: string[] = [];

  /*
  BehaviorSubject (a diferencia de Subject) tiene la tiene posibilidad de guardar
  el valor del último elemento enviado y maneja un objeto default
  */
  private privatePagesObservable$: BehaviorSubject<string[]> =
    new BehaviorSubject<string[]>(this.pages);

  get privatePagesObservable() {
    return this.privatePagesObservable$.asObservable();
  }

  get isThisPagePrivate(): boolean {
    let currentPage = '/' + this.router.url.split('/')[1];
    return this.pages.indexOf(currentPage) !== -1;
  }

  set privatePagesObservableData(newUrl: string) {
    if (this.pages.indexOf(newUrl) === -1) {
      this.pages.push(newUrl);
      this.privatePagesObservable$.next(this.pages);
    }
    // console.log('this.pages', this.pages);
    // this.privatePagesObservable$.next([...this.pages, newUrl]);
  }

  constructor(private router: Router) {
    // TODO: no se para que se usa esta suscripcion
    // this.privatePagesObservable.subscribe(
    //   (newUrl: string[]) => (this.pages = newUrl)
    // );
  }
}
