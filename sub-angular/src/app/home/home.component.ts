import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Store } from '@ngrx/store';
import {Observable} from 'rxjs';

import { Subscription } from 'rxjs';
import {
  singleSpaPropsSubject,
} from 'src/single-spa/single-spa-props';

@Component({
  selector: 'sub-angular-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  globalData$:Observable<object>;
  subscription: Subscription; 
  userInfo= {name:"ALRIGHT"};
  qkProps:{setGlobalState?:any,getGlobalState?:any };

  constructor(private router:Router,private store: Store<any>) {
    this.globalData$ = store.select("globalData");
  }

  ngOnInit(): void {
    this.subscription = singleSpaPropsSubject.subscribe(
      props => {
        this.qkProps = props;
        let globalData = props.getGlobalState();
        if(globalData.userInfo && Object.keys(globalData.userInfo).length>0){
          this.userInfo = globalData.userInfo
        }
      },
    );
  }

 ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  changeUserInfo(){
      this.userInfo = { name: "长い间"};
      this.qkProps.setGlobalState({ userInfo: { name: "长い间" } });
  }

  goToAboutPage():void{
    this.router.navigate(["about"])
  }
  printData():void{}
}
