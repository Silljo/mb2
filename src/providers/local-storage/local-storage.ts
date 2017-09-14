import { Injectable } from '@angular/core';


@Injectable()
export class LocalStorageProvider {

  static save_user(uid, email, photo, username)
  {

    localStorage.removeItem('uid');
    localStorage.removeItem('email');
    localStorage.removeItem('photo');
    localStorage.removeItem('username');

    localStorage.setItem('uid', uid);
    localStorage.setItem('email', email);
    localStorage.setItem('photo', photo);
    localStorage.setItem('username', username);
  }

  static getItem(itemName:string):any {
      return JSON.parse(localStorage.getItem(itemName));
  }



}
