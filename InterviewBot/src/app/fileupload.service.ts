import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileuploadService {



  uploadResume(file: File , flag : string) {
  const formData = new FormData();
  formData.append('resume', file);
  formData.append('flag' , flag)

  return this.http.post('http://localhost:3000/upload', formData);
}



  constructor(private http : HttpClient) { }
}
