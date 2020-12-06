import { Component, OnInit } from '@angular/core';
import { UtilService } from './../util.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  // 存放所有日期
  firstDatarows:number[] = []
  secondDatarows:number[] = []
  threeDatarows:number[] = []
  fourDatarows:number[] = []
  fiveDatarows:number[] = []
  sixDatarows:number[] = []
  allDateRows:number[] = [];
  // 当前日期
  today: any;
  finalday:any;
  // 当前月
  month: any;
  // 当前年
  date:any;
  year: any;
  slectYear:any;

  dateArr:Date[] =[];
  targetHoliday:number[] =[];
  targetDateArr:Date[] =[new Date('2020/12/01'),new Date('2020/12/06'),new Date('2020/12/13')];
  weekday = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  constructor(
    private dateService: UtilService
  ) { }

  ngOnInit() {
    this.month = this.dateService.getData().get().getMonth();
    this.finalday = this.month;
    this.year = this.dateService.getData().get().getFullYear();
    this.slectYear = this.year;
    this.date = this.dateService.getData().get().getDate();
    this.today = `${this.year}年${(this.month + 1 > 9) ? this.month + 1 : `0${this.month + 1}`}月`;
    this.dateTableList();
  }

 /**
   * 上个月
   */
  behindMonth() {
    this.month--;
    if (this.month < 0) {
      this.month = 11;
      this.today = `${--this.year}年${(this.month + 1 > 9) ? this.month + 1 : `0${this.month + 1}`}月`;
      this.changeDateTable(this.year, this.month);
    } else {
      this.today = `${this.year}年${(this.month + 1 > 9) ? this.month + 1 : `0${this.month + 1}`}月`;
      this.changeDateTable(this.year, this.month);
    }
  }
  /**
   * 上一年
   */
  behindyear() {
    this.year--;
    this.today = `${this.year}年${(this.month + 1 > 9) ? this.month + 1 : `0${this.month + 1}`}月`;
    this.changeDateTable(this.year, this.month);
  }
  /**
   * 改变日期表格
   */
  changeDateTable(year:any, month:any) {
    const firstday = new Date(year, month, 1);
    const finallday = new Date(year, month + 1, 0);
    const beforeday = new Date(year, month, 0);
    let daycount = beforeday.getDate();
    for (let i:number = 1; i <= finallday.getDate(); i++) {
      this.allDateRows.push(i);
    }
    this.firstDatarows = this.allDateRows.splice(0, 7 - firstday.getDay());
    for (let i = 0; i < firstday.getDay(); i++) {
      this.firstDatarows.unshift(0);
      daycount--;
    }
    this.secondDatarows = this.allDateRows.splice(0, 7);
    this.threeDatarows = this.allDateRows.splice(0, 7);
    this.fourDatarows = this.allDateRows.splice(0, 7);
    this.fiveDatarows = this.allDateRows.splice(0, 7);
    this.sixDatarows = this.allDateRows.splice(0);

  }
  /**
   * 表格列表
   */

  dateTableList() {
    const mydate = this.dateService.getData().get();
    const firstday = new Date(mydate.getFullYear(), mydate.getMonth(), 1);
    const finallday = new Date(mydate.getFullYear(), mydate.getMonth() + 1, 0);
    const beforeday = new Date(mydate.getFullYear(), mydate.getMonth(), 0);
    let daycount = beforeday.getDate();
    for (let i = 1; i <= finallday.getDate(); i++) {
      this.allDateRows.push(i);
      let date = new Date();
      date.setFullYear(mydate.getFullYear());
      date.setMonth(mydate.getMonth());
      date.setDate(i);
      this.dateArr.push(date);
    }
    for (let i = 0; i < firstday.getDay(); i++) {
      this.allDateRows.unshift(0);
      daycount--;
    }
    this.firstDatarows = this.allDateRows.splice(0, 7);
    this.secondDatarows = this.allDateRows.splice(0, 7);
    this.threeDatarows = this.allDateRows.splice(0, 7);
    this.fourDatarows = this.allDateRows.splice(0, 7);
    this.fiveDatarows = this.allDateRows.splice(0, 7);
    this.sixDatarows = this.allDateRows.splice(0, 7);

    
    for(let j=0;j < this.dateArr.length; j++){
      console.log('1111111111111111')
      console.log(this.dateArr[j])
      console.log(this.dateArr[j].getDate())
      for(let k=0;k < this.targetDateArr.length; k++){
        console.log('22222222222222')
        console.log(this.targetDateArr[k].getDate())
        if(
          (this.targetDateArr[k].getFullYear() == this.dateArr[j].getFullYear()) &&
          (this.targetDateArr[k].getMonth() == this.dateArr[j].getMonth()) &&
          (this.targetDateArr[k].getDate() == this.dateArr[j].getDate())
        ){
          this.targetHoliday.push(j+1);
          continue;
        }
      }
    }

    console.log(this.targetHoliday)
  }
  /**
   * 下一年
   */
  nextyear() {
    this.year++;
    this.today = `${this.year}年${(this.month + 1 > 9) ? this.month + 1 : `0${this.month + 1}`}月`;
    this.changeDateTable(this.year, this.month);
  }
  /**
   * 下个月
   */
 nextMonth() {
    this.month++;
    if (this.month > 11) {
      this.month = 0;
      this.today = `${++this.year}年${(this.month + 1 > 9) ? this.month + 1 : `0${this.month + 1}`}月`;
      this.changeDateTable(this.year, this.month);
    } else {
      this.today = `${this.year}年${(this.month + 1 > 9) ? this.month + 1 : `0${this.month + 1}`}月`;
      this.changeDateTable(this.year, this.month);
    }
  }

  clickDay(date:any) {
    console.log(date)
  }
}
