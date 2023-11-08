import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { NoteService } from 'src/app/core/services/note.service';
import { ToastrService } from 'ngx-toastr';
import {MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-note-data',
  templateUrl: './note-data.component.html',
  styleUrls: ['./note-data.component.scss']
})
  export class NoteDataComponent {

    constructor(private _FormBuilder:FormBuilder , private _NoteService:NoteService , private _AuthService:AuthService , private toastr: ToastrService , private MatDialogRef:MatDialogRef<NoteDataComponent> , @Inject(MAT_DIALOG_DATA) public data:any){
    }

    citizenID!:string
    token!:string
    DataForm!:FormGroup

    ngOnInit(): void {
      this.citizenID = this._AuthService.userdata.getValue()._id
      this.token = localStorage.getItem('uToken')!
      this.createForm()
      //console.log(this.data);

    }

    createForm(){
    this.DataForm =  this._FormBuilder.group({
      title:[this.data == null ? '':this.data?.note.title , [Validators.required]],
      content:[this.data == null ? '':this.data?.note.content , [Validators.required]],
      token:[this.token],
      })
    }


    sendData(){
      // console.log(this.DataForm.value);
      if (this.DataForm.valid) {
        if (this.data === null) {
          this.addNote()
        }else{
          this.updateNote()
        }
      }
    }


    addNote(){
      const data = {
        ...this.DataForm.value,
        'citizenID': this.citizenID
      }
      this._NoteService.addNote(data).subscribe({
        next:res=>{
          console.log(res);
          if (res.msg == 'done') {
            this.toastr.success('Note Added successfully', 'success');
            this.MatDialogRef.close('done')
          }
        },
        error:err=>{
          console.log(err);
        }
      })

    }


    updateNote(){

      const data = {
        ...this.DataForm.value,
        'NoteID': this.data.note._id
      }
      let id = this.data.note._id
      this._NoteService.updateNote(data , id ).subscribe({
        next:res=>{
          console.log(res);
          if (res.msg == 'done') {
            this.toastr.success('Note Updated successfully', 'success');
            this.MatDialogRef.close('update')
          }
        },
        error:err=>{
          console.log(err);
        }
      })

    }
}
