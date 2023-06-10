import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastrService {

  constructor(private toastrService: NbToastrService) { }
  showToast(status: NbComponentStatus, title, message) {
    this.toastrService.show(message, title, { status: status }
    );
  }
  showToastSuccess(message){
    this.showToast('success', 'SUCCESSED', message)
  }
  showToastFail(message){
    this.showToast('danger', 'FAILED', message)
  }
  showToastWarning(message){
    this.showToast('warning', 'WARNING', message)
  }
}
