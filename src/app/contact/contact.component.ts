import { Component, OnInit } from '@angular/core';
import { faPhone, faEnvelope, faBuilding } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ContactService } from '../appServices/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  faPhone = faPhone;
  faEnvelope = faEnvelope;
  faBuilding = faBuilding;
  faInstagram = faInstagram;
  faFacebook = faFacebook;
  FormData: FormGroup;

  constructor(private builder: FormBuilder, private contact: ContactService) { }

  onSubmit(FormData) {
    console.log(FormData)
    this.contact.PostMessage(FormData)
      .subscribe(response => {
        location.href = 'https://mailthis.to/confirm'
        console.log(response)
      }, error => {
        console.warn(error.responseText)
        console.log({ error })
      })
  }

  ngOnInit() {
    this.FormData = this.builder.group({
      Fullname: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.compose([Validators.required, Validators.email])]),
      ContactNo: new FormControl('', [Validators.required]),
      Message: new FormControl('', [Validators.required])
    })
  }

}
