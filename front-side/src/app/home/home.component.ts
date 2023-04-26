import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  title = '"Quantum dots from Sber - OLED TV 65" for 55K with an assistant and installation .apk. That good?'
  chanel = "Wylsacom"

  private static menuCondition = localStorage.getItem("menu")

  public getMenuCondition() {
    return HomeComponent.menuCondition
  }
  public static setMenuCondition(condition: string) {
    this.menuCondition = condition
  }

  chooseNav(e: any) {
    for(let element of e.composedPath()[1].querySelectorAll("p")) {
      element.classList.remove("active")
    } e.composedPath()[0].classList.add("active")
  }

}
