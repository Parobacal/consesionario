import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  template: `<ejs-uploader #defaultupload  [autoUpload]='false'></ejs-uploader>`
})
export class AppComponent {
  title = 'ph-app';
}
