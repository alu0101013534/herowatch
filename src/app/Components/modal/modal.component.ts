import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-content',
  template: `
  <div class="modal-header">
    <h4 class="modal-title">Warning!</h4>
    <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p> {{name}} has a previous assingnement if you continue it will override previous operations!</p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-dark" (click)="cancelAssign()">Cancel</button>
    <button type="button" class="btn btn-outline-danger" (click)="okAssign()">OK</button>
  </div>
`
})

export class NgbdModalContent {
  
  @Input() name;

  constructor(public activeModal: NgbActiveModal) {}

  cancelAssign(){
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
  constructor(private modalService: NgbModal) {}

  open() {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = 'World';
  }
}
