import { Component } from '@angular/core';
import { FileuploadService } from '../fileupload.service';

@Component({
  selector: 'app-file-upload',
  imports: [],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})


export class FileUploadComponent {


  summary : string = ""

  flag : string = ""

  showSpinner : boolean = false


  constructor (private fileUploadService : FileuploadService) {}

  uploadedFile: File | null = null;

  handleFileUpload(event: Event): void {
    
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.uploadedFile = input.files[0];
      this.summary = ""
    }
  }

  removeFile(): void {
    this.uploadedFile = null;
    const input = document.getElementById('resumeUpload') as HTMLInputElement;
    if (input) {
      input.value = '';
    }
  }

  uploadToLLM(flag:string): void {
    
    this.flag = flag
    this.summary = ""
    if (!this.uploadedFile) {
    alert('Please upload a file first.' + flag);
    return;
  }



  this.showSpinner = true
  this.fileUploadService.uploadResume(this.uploadedFile, flag).subscribe({
    next: (response) => {
      
       this.summary = (response as { text: string }).text;

        
      this.showSpinner = false
      // You can call your LLM service here or trigger follow-up actions
    },
    error: (error) => {
      console.error('❌ Upload to LLM failed:', error);
    }
  });
}


}