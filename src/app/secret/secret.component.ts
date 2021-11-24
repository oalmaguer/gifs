import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-secret',
  templateUrl: './secret.component.html',
  styleUrls: ['./secret.component.css']
})
export class SecretComponent implements OnInit {
  secretForm: FormGroup;
  showSecret: boolean = false;
  constructor() { }

  ngOnInit(): void {
    this.secretForm = new FormGroup({
      "secretValue": new FormControl("")
    })
  }

  secret() {
    if (this.secretForm.get('secretValue').value == "siyoman") {
      this.showSecret = true;
    }
  }

}
