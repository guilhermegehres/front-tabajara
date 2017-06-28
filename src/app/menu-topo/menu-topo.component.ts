import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UtilService } from "./../service/util.service";
@Component({
  selector: 'app-menu-topo',
  templateUrl: './menu-topo.component.html',
  styleUrls: ['./menu-topo.component.css']
})
export class MenuTopoComponent implements OnInit {

  private user : any;
  constructor(
    private router : Router,
    private util : UtilService
  ) {
  }

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem("user"));
  }

  logout(){
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("tipo");
    this.util.userToEdit = null;
    this.router.navigateByUrl("login");
  }

}
