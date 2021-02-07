import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
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
  userInfo= {};
  qkProps:{setGlobalState?:any,getGlobalState?:any };

  constructor(private router:Router) {}

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
      this.userInfo = { name: "sub-angular"};
      this.qkProps.setGlobalState({ userInfo: { name: "sub-angular" } });
  }

  goToAboutPage():void{
    this.router.navigate(["about"])
  }

  goToSubReactApp():void{
    window.location.href = "/react"
  }
  printData():void{}
}
