import {Injectable, Injector} from '@angular/core';
import {ConstantService} from "./constant.service";
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class AjaxCallService {
  remoteServer: string = "";

  constructor(private constantService: ConstantService,
              private injector: Injector) { }

  // @ts-ignore
  read(url) {
    return axios.get(this.constantService.getRemoteServer() + "/" + url,
      { headers: {} });
  }

  // @ts-ignore
  post(url, obj) {
    return this.save(url, obj);
  }

  // @ts-ignore
  save(url, obj) {
    return axios.post(this.constantService.getRemoteServer() + "/" + url,
      obj,
      { headers: {"content-type": "application/json"} });
  }

  // @ts-ignore
  update(url, obj) {
    return axios.put(this.constantService.getRemoteServer() + "/" + url,
      obj,
      { headers: {"content-type": "application/json"} });
  }

  // @ts-ignore
  delete(url, id) {
    return axios.delete(this.constantService.getRemoteServer() + "/" + url + "/" + id,
      { headers: {"content-type": "application/json"} });
  }

  // @ts-ignore
  async readAsync(url) {
    return await axios.get(this.constantService.getRemoteServer() + "/" + url,
      { headers: {} });
  }

  // @ts-ignore
  async saveAsync(url, obj) {
    return await axios.post(this.constantService.getRemoteServer() + "/" + url,
      obj,
      { headers: {"content-type": "application/json"} });
  }

  // @ts-ignore
  async updateAsync(url, obj) {
    return await axios.put(this.constantService.getRemoteServer() + "/" + url,
      obj,
      { headers: {"content-type": "application/json"} });
  }

  // @ts-ignore
  async deleteAsync(url, id) {
    return await axios.delete(this.constantService.getRemoteServer() + "/" + url + "/" + id,
      { headers: {"content-type": "application/json"} });
  }
}
