import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HeroService } from '../../Services/hero.service';

@Component({
  selector: 'ngbd-modal-content',
  template: `
  <div class="modal-header">
    <h4 class="modal-title">{{title}}</h4>
    <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p> {{name}} has a previous assingnement if you continue it will override previous operations!</p>
  </div>
  <div class="modal-footer">
    
    <div *ngIf="type==0">
    <button type="button" class="btn btn-outline-primary" (click)="ok()">OK</button>
    </div>

    <div *ngIf="type==1">
    <button type="button" class="btn btn-outline-dark" (click)="ok()">Cancel</button>&nbsp;
    <button type="button" class="btn btn-outline-danger" (click)="okAssign()">OK ONE </button>
    </div>
  </div>
`
})

export class NgbdModalContent {
  
  @Input() name;
  @Input() title;
  @Input() type;
  
  constructor(public activeModal: NgbActiveModal) {}

  ok(){
    this.activeModal.close('Close click');
  }
  okAssign(){

    this.activeModal.close('Close click');
  }
}

@Component({
  selector: 'ngbd-modal-component',
  templateUrl: './modal.component.html'
})
export class NgbdModalComponent {
  constructor(private modalService: NgbModal,private heroservice:HeroService) {}

  @Input() title;
  @Input() type;

  
  @Input() buttonName: string;
  open() {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = this.heroservice.selectedHero.name;
    modalRef.componentInstance.title = this.title;
    modalRef.componentInstance.type = this.type;
  }
}
