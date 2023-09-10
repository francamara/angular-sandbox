import { Component } from '@angular/core';
import {SnackBarService} from '../snack-bar.service';

@Component({
  selector: 'app-fizz-buzz',
  templateUrl: './fizz-buzz.component.html',
  styleUrls: ['./fizz-buzz.component.css'],

})
export class FizzBuzzComponent {
  constructor(private snackBService:SnackBarService){}

  userInput: number = 0

  fizzBuzzResult: {result: string | number, value: number}[] = []

  displayedColumns: string[] = ['result', 'value']

  private numbers = new RegExp(/^[0-9]+$/)

  calculateFizzBuzz(): void {
    this.fizzBuzzResult = []
    for (let i = 1; i <= this.userInput; i++) {
      if(i % 3 === 0 && i % 5 === 0) {
        this.fizzBuzzResult.push({result: 'FizzBuzz', value: i})
      } else if(i % 5 === 0) {
        this.fizzBuzzResult.push({result: 'Buzz', value: i})
      } else if(i % 3 === 0) {
        this.fizzBuzzResult.push({result: 'Fizz', value: i})
      } else {
        this.fizzBuzzResult.push({result: i, value: i})
      }
    }
    this.userInput = 0
  }

  checkValue($event: any): void {
    if($event.key === 'Enter') {
      this.calculateFizzBuzz()
    }
    if(!this.numbers.test($event.key) && $event.key !== 'Backspace' && $event.key !== 'Tab' && $event.key !== 'Enter') {
        this.snackBService.openSnackBar('Only Numbers Allowed', 'Close');
    }
  }
}
