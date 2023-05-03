import { Component } from '@angular/core';
import {MenuConditionService} from "../menu-condition.service";
import {category, Category} from "../models";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  categories: Category[] = category

  title = '"Quantum dots from Sber - OLED TV 65" for 55K with an assistant and installation .apk. That good?'
  chanel = "Wylsacom"

  constructor(private menuConditionService: MenuConditionService) { }

  getMenuCondition() {
    return this.menuConditionService.getMenuCondition()
  }

  chooseNav(e: any) {
    for(let element of e.composedPath()[1].querySelectorAll("p")) {
      element.classList.remove("active")
    } e.composedPath()[0].classList.add("active")
  }

}
