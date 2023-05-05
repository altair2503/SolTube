import {Component, OnInit} from '@angular/core';
import {MenuConditionService} from "../services/menu-condition.service";
import {CategoryService} from "../services/category.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  categories: any = []

  title = '"Quantum dots from Sber - OLED TV 65" for 55K with an assistant and installation .apk. That good?'
  chanel = "Wylsacom"

  ngOnInit() {
    this.getCategories()
  }

  constructor(private menuConditionService: MenuConditionService, private categoryService: CategoryService) { }

  getCategories(){
    this.categoryService.getCategories().subscribe((categories)=>{
      this.categories = categories
    })
  }

  getMenuCondition() {
    return this.menuConditionService.getMenuCondition()
  }

  chooseNav(e: any) {
    for(let element of e.composedPath()[1].querySelectorAll("p")) {
      element.classList.remove("active")
    } e.composedPath()[0].classList.add("active")
  }


}
