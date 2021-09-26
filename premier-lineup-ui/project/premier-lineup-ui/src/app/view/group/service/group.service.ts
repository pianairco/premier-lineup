import {Injectable} from '@angular/core';

import axios from "axios";
import {ConstantService} from "@lineup-app/core/service/constant.service";
import {Observable} from "rxjs";

@Injectable()
export class GroupService {

  constructor(private constantService: ConstantService) { }

  async create(name): Promise<string> {
    try {
      let res = await axios.post(
        this.constantService.getRemoteServer() + '/api/modules/lineup/group/save',
        { name: name},
        { headers: { 'Content-Type': 'APPLICATION/JSON; charset=utf-8' } });
      if(res['data']['code'] === 0) {
        let sharedLink = (this.constantService.getRemoteServer() ?
          this.constantService.getRemoteServer() : "https://piana.ir") +
          '/api/modules/lineup/group/join/' + res['data']['data']['uuid'];
        console.log(sharedLink)
        return sharedLink;
      } else {
        return null;
      }
    } catch (err) {
      return null;
    }
  }

  async setImage(imageBase64: string, groupId, rotate: number) {
    try {
      let headers = {
        'image_upload_group': 'group-image',
        'image-upload-rotation': rotate,
        'group_id': groupId,
        'Content-Type': 'application/json'
      };

      let res = await axios.post(
        this.constantService.getRemoteServer() + 'api/upload-manager/serve',
        {file: imageBase64}, {
        headers: headers
      });

      if (res['status'] == 200 && res['data']['code'] == 0) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  async getAdminGroups() {
    try {
      let headers = {
        'Content-Type': 'application/json'
      };

      let res = await axios.get(
        this.constantService.getRemoteServer() + 'api/modules/lineup/group/admin-groups',
        { headers: headers });

      if (res['status'] == 200 && res['data']['code'] == 0) {
        return res['data']['data'];
      } else {
        return [];
      }
    } catch (err) {
      return [];
    }
  }

  async getMemberGroups() {
    try {
      let headers = {
        'Content-Type': 'application/json'
      };

      let res = await axios.get(
        this.constantService.getRemoteServer() + 'api/modules/lineup/member-groups',
        { headers: headers });

      if (res['status'] == 200 && res['data']['code'] == 0) {
        return res['data']['data'];
      } else {
        return [];
      }
    } catch (err) {
      return [];
    }
  }
}
