import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SelectedParentCategoryService {
  /*
  Initialize data
  Corresponds to the slug of the parent category
  by default, the parent category is set to all to diplay all
  */
  private selectedParentCategory: string = 'all';

  private _selectedParentCategory: BehaviorSubject<string> =
    new BehaviorSubject(this.selectedParentCategory);

  get selectedParentCategory$(): Observable<string> {
    return this._selectedParentCategory.asObservable();
  }

  constructor() {}

  setSelectedParentCategory(selectedParentCategory: string) {
    // console.log(selectedParentCategory);
    // TODO validate that the parent category exists in ParentCategoryObject
    this.selectedParentCategory = selectedParentCategory;
    this._selectedParentCategory.next(this.selectedParentCategory);
  }
}
