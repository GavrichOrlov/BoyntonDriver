import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  weekDays: any;
  clicked: any;
  userCard: any = [];
  selected: any;
  origin: any;
  destination: any;
  user: any;
  rides: any;
  did: any;
  constructor() {
    this.weekDays = [
      {
        day: 'Sun',
        date: '01',
        selected: true
      },
      {
        day: 'Mon',
        date: '02',
        selected: true
      },
      {
        day: 'Tue',
        date: '03',
        selected: true
      },
      {
        day: 'Wed',
        date: '04',
        selected: true
      },
      {
        day: 'Thu',
        date: '05',
        selected: true
      },
      {
        day: ' Fri',
        date: '06',
        selected: true
      },
      {
        day: 'Sat',
        date: '07',
        selected: true
      },
      {
        day: 'Sun',
        date: '08',
        selected: true
      },
      {
        day: 'Mon',
        date: '09',
        selected: true
      },
      {
        day: 'Tue',
        date: '10',
        selected: true
      },
      {
        day: 'Wed',
        date: '11',
        selected: true
      },
      {
        day: 'Thu',
        date: '12',
        selected: true
      },
      {
        day: ' Fri',
        date: '13',
        selected: true
      },
      {
        day: 'Sat',
        date: '14',
        selected: true
      },
      {
        day: 'Sun',
        date: '15',
        selected: true
      },
      {
        day: 'Mon',
        date: '16',
        selected: true
      },
      {
        day: 'Tue',
        date: '17',
        selected: true
      },
      {
        day: 'Wed',
        date: '18',
        selected: true
      },
      {
        day: 'Thu',
        date: '19',
        selected: true
      },
      {
        day: ' Fri',
        date: '20',
        selected: true
      },
      {
        day: 'Sat',
        date: '21',
        selected: true
      },
      {
        day: 'Sun',
        date: '22',
        selected: true
      },
      {
        day: 'Mon',
        date: '23',
        selected: true
      },
      {
        day: 'Tue',
        date: '24',
        selected: true
      },
      {
        day: 'Wed',
        date: '25',
        selected: true
      },
      {
        day: 'Thu',
        date: '26',
        selected: true
      },
      {
        day: ' Fri',
        date: '27',
        selected: true
      },
      {
        day: 'Sat',
        date: '28',
        selected: true
      },
      {
        day: 'Sun',
        date: '29',
        selected: true
      },
      {
        day: 'Mon',
        date: '30',
        selected: true
      }
    ];
    this.userCard = [
      {
        name: 'Elva Barnet',
        amount: '$22.50',
        image: '../../assets/img/user1.jpeg',
        button1: 'ApplePay',
        button2: 'Discount',
        km: '7.2km',
        pickup: '7958 Swift Village',
        drop: '105 William St,Chicago,US'
      },
      {
        name: 'Andre Clark',
        amount: '$28.50',
        image: '../../assets/img/user2.jpeg',
        button1: 'ApplePay',
        km: '4.2km',
        pickup: '7958 Swift Village',
        drop: '105 William St,Chicago,US'
      },
      {
        name: 'Elva Barnet',
        amount: '$28.50',
        image: '../../assets/img/user3.jpeg',
        button1: 'ApplePay',
        km: '1.2km',
        pickup: '7958 Swift Village',
        drop: '105 William St,Chicago,US'
      },
      {
        name: 'Elva Barnet',
        amount: '$25.50',
        image: '../../assets/img/user1.jpeg',
        button1: 'ApplePay',
        button2: 'Discount',
        km: '2.2km',
        pickup: '7958 Swift Village',
        drop: '105 William St,Chicago,US'
      },
      {
        name: 'Elva Barnet',
        amount: '$20.50',
        image: '../../assets/img/user2.jpeg',
        button1: 'ApplePay',
        km: '6.2km',
        pickup: '7958 Swift Village',
        drop: '105 William St,Chicago,US'
      },
      {
        name: 'Andre Clark',
        amount: '$21.50',
        image: '../../assets/img/user3.jpeg',
        button1: 'ApplePay',
        button2: 'Discount',
        km: '1.2km',
        pickup: '7958 Swift Village',
        drop: '105 William St,Chicago,US'
      }
    ];
   }

  ngOnInit() {
  }
  weekChecked(i) {
    console.log('i', i);
    this.selected = i;
  }
}
