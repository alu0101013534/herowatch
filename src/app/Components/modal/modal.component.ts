import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HeroService } from '../../Services/hero.service';

@Component({
  selector: 'ngbd-modal-content',
  templateUrl: './modalcontent.html',
  styleUrls: ['./modalcontent.css']
})

export class NgbdModalContent {
  
  @Input() name;
  @Input() title;
  @Input() type;
  @Input() body ="has a previous assingnement if you continue it will override previous operations!";
  
  constructor(public activeModal: NgbActiveModal,private modalService: NgbModal, private heroService: HeroService) {}

  ok(){
    this.activeModal.close('Close click'); 
  }
  okAssign(){

    this.heroService.assignHeroesPets();
    this.heroService.checkLeagueComplete();
    this.sendAlert("Success","Heroes now have new pets partners and everyone have new non repeatable superpowers");

  }

  okDeleteAll(){

    this.heroService.deleteAll();
    this.heroService.checkLeagueComplete();
    this.sendAlert("Success","Heroes now are free without partners and without superpowers GOD HELP US!");

  }


  okNewAssignPower() {
    this.heroService.newAssignPower();
    
    this.heroService.checkLeagueComplete();
    this.sendAlert("Success",'<span class="hero">'+this.heroService.selectedHero.name+"</span> has "+ this.heroService.selectedSuperPower.name);
  }
  okRemovePower() {
    this.heroService.removePower();
    this.heroService.checkLeagueComplete();
    this.sendAlert("Success",this.heroService.selectedHero.name+" no longer has "+ this.heroService.selectedSuperPower.name);
  }
  

  okAssignPartner() {
      
    if(this.heroService.selectedPet!=null && this.heroService.selectedHero!=null){

    
    this.heroService.assignPartner();
    
    this.heroService.checkLeagueComplete();
    this.sendAlert("Success",this.heroService.selectedHero.name+" has "+ this.heroService.selectedPet.name+" as partner");
  }
}

okRemovePartner() {
  this.heroService.removePartner();
  this.heroService.checkLeagueComplete();
  
  this.sendAlert("Success",this.heroService.selectedHero.name+" no longer has "+ this.heroService.selectedPet.name+" as partner");
}
  sendAlert(tittle,body ){
    this.activeModal.close('Close click');
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = "";
    modalRef.componentInstance.body = body;
    modalRef.componentInstance.title = tittle;
    modalRef.componentInstance.type = 0;

  }
}

@Component({
  selector: 'ngbd-modal-component',
  templateUrl: './modal.component.html',
  styleUrls: ['./modalcontent.css']
})
export class NgbdModalComponent  {
  constructor(private modalService: NgbModal,private heroservice:HeroService) {
  let that=this;
      this.heroservice.componentMethodCalled$.subscribe(
        () => {
          that.leagueCompleted();
        }
      );
    
  }

  @Input() title;
  @Input() type;

  @Input() name="";
  @Input() body;
  
  @Input() buttonName: string;
  open() {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = this.name;
    modalRef.componentInstance.title = this.title;
    modalRef.componentInstance.type = this.type;
    
    modalRef.componentInstance.body = this.body;
   
  }

  leagueCompleted(){
    if( this.type==1 && this.heroservice.completed){
    
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = "";
    modalRef.componentInstance.title = "Success";
    modalRef.componentInstance.type = 0;
    
    modalRef.componentInstance.body = "Congratulations the RightsEnforcer Legion has been created";
     }
  }

  
}
