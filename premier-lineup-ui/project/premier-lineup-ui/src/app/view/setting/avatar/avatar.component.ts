import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatMenuTrigger} from "@angular/material/menu";
import {MatExpansionPanel} from "@angular/material/expansion";
import {BehaviorSubject} from "rxjs";
import axios from "axios";
import {ConstantService} from "@lineup-app/core/service/constant.service";

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit {

  @ViewChild('uploadControl') uploadControl: ElementRef;
  uploadFileName = '';
  filePath: string = null;
  imgBase64Path = null;

  constructor(private constantService: ConstantService) {
  }

  onFileChange(e: any) {

    if (e.target.files && e.target.files[0]) {

      this.uploadFileName = '';
      Array.from(e.target.files).forEach((file: File) => {
        this.uploadFileName += file.name + ',';
      });

      const fileReader = new FileReader();
      fileReader.onload = (e: any) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = res => {
          this.filePath = fileReader.result as string;

          this.imgBase64Path = e.target.result;
        };
      };
      fileReader.readAsDataURL(e.target.files[0]);

      this.uploadControl.nativeElement.value = "";
    } else {
    }
  }

  clearImage() {
    this.filePath = null;
  }

  rotate = 0;

  upload() {
    let formData = new FormData();
    formData.append('file', this.imgBase64Path);
    let headers = {
      'image_upload_group': 'avatar',
      'image-upload-rotation': this.rotate,
      'Content-Type': 'multipart/form-data'
    };

    axios.post(this.constantService.getRemoteServer() + 'api/upload-manager/serve', formData, {
      headers: headers
    }).then((res) => {
      console.log(res['data']['code'], res['data']['data']);
    }).catch((e) => {
      console.log(e.response);
    });
  }

  ngOnInit(): void {
  }
}
