import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  animations: [
    trigger('dialog', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(100%)' }),
        animate(500)
      ]),
      transition('* => void', [
        animate(500, style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class ModalComponent implements OnInit, OnChanges {
  @Input() closable = true;
  @Input() mVisible: boolean = false;
  @Input() mTitle: string = "";
  @Input() mSize: string = "md";
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {}

  ngOnChanges(_changes: SimpleChanges): void {
    for(const _propName in _changes) {
      if(_changes.hasOwnProperty(_propName)){
        switch (_propName){
          case "mVisible":
            if(_changes.mVisible.currentValue) {
              if(!document.body.classList.contains('m-modal-open')) {
                document.body.classList.add('m-modal-open');
              }
            } else {
              setTimeout(() => {
                if(document.querySelectorAll('.app-modal').length == 0) {
                  document.body.classList.remove('m-modal-open')
                }
              }, 600);
            }
            break;
        }
      }
    }
  }

  closeModal() {
    this.mVisible = false;
    this.close.emit();
  }

}
