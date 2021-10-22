import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LoadingService {

  loading: boolean = false

  constructor() { }

  /**
   * Change the loading state
   * @param state boolean true/false
   */
  setLoading(state: boolean): void {
    this.loading = state
  }
}
